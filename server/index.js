const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const dotenv = require('dotenv').config({path: './.env'})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
// if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  app.use(express.static(process.env.STATIC_DIR))

  // body parsing middleware
  app.use(
    express.json({
      // We need the raw body to verify webhook signatures.
      // Let's compute it only when hitting the Stripe webhook endpoint.
      verify: function (req, res, buf) {
        if (req.originalUrl.startsWith('/webhook')) {
          req.rawBody = buf.toString()
        }
      },
    })
  )
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/config', (req, res) => {
    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      basePrice: process.env.BASE_PRICE,
      currency: process.env.CURRENCY,
    })
  })

  // Fetch the Checkout Session to display the JSON result on the success page
  app.get('/checkout-session', async (req, res) => {
    console.log(req.que)
    const {sessionId} = req.query
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
    console.log(sessionId)
    res.send(session)
  })

  app.post('/create-checkout-session', async (req, res) => {
    const domainURL = process.env.DOMAIN

    const {quantity, locale} = req.body
    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [payment_intent_data] - lets capture the payment later
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: process.env.PAYMENT_METHODS.split(', '),
      locale: locale,
      line_items: [
        {
          name: 'Pasha photo',
          images: ['https://picsum.photos/300/300?random=4'],
          quantity: quantity,
          currency: process.env.CURRENCY,
          amount: process.env.BASE_PRICE, // Keep the amount on the server to prevent customers from manipulating on client
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
    })

    res.send({
      sessionId: session.id,
    })
  })

  // Webhook handler for asynchronous events.
  app.post('/webhook', async (req, res) => {
    let data
    let eventType
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event
      let signature = req.headers['stripe-signature']

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        )
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`)
        return res.sendStatus(400)
      }
      // Extract the object from the event.
      data = event.data
      eventType = event.type
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data
      eventType = req.body.type
    }

    if (eventType === 'checkout.session.completed') {
      console.log(`🔔  Payment received!`)
    }

    res.sendStatus(200)
  })

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
