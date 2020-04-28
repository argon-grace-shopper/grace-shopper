const router = require('express').Router()
module.exports = router
const dotenv = require('dotenv').config({path: './.env'})
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')('sk_test_Lx6lFDJ0K9JllTCduCiLy9ol00Zue884Go')

router.post('/create-checkout-session', async (req, res) => {
  const domainURL =
    'http://localhost:8080' || 'https://grace-shopper-argon.herokuapp.com/'
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body,
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success`,
    cancel_url: `${domainURL}/canceled`,
  })
  console.log(session)
  res.send(session.id)
})
