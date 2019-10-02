const keys = require("../config/key");
const stripe = require('stripe')(
  keys.stripeSecretKey
)

const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id, // obtained with Stripe.js
      description: "$5 for 5 credits"
    });
    req.user.credits += 5 //add 5 ccredits to current user
    const user = await req.user.save() //save to db
    res.send(user) //send back user updated to browser
  })
}