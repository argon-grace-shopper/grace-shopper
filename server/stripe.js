const router = require('express').Router()
module.exports = router
const dotenv = require('dotenv').config({path: './.env'})
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')('sk_test_Lx6lFDJ0K9JllTCduCiLy9ol00Zue884Go')

router.post('/create-checkout-session', async (req, res) => {
  const domainURL = 'http://localhost:8080'
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [payment_intent_data] - lets capture the payment later
  // [customer_email] - lets you prefill the email input in the form
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body,
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
  })
  console.log(session.id)

  res.send(session.id)
})
