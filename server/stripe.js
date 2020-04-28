const router = require('express').Router()
module.exports = router
const dotenv = require('dotenv').config({path: './.env'})
const stripe = require('stripe')('sk_test_Lx6lFDJ0K9JllTCduCiLy9ol00Zue884Go')

router.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body,
    success_url: `${domainURL}/success`,
    cancel_url: `${domainURL}/canceled`,
  })
  console.log(session)
  res.send(session.id)
})
