import React, { Component } from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import * as actions from '../actions'

class Payments extends Component {
  render() {
    return (<StripeCheckout
      name="Emaily"
      amount={500}
      token={(token) => this.props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      description="5$ for 5 emails"
    >
      <button className="btn">Add credit</button>
    </StripeCheckout>)
  }
}

export default connect(null, actions)(Payments)