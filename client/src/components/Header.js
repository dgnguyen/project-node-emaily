import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Payments from './Payments'

class Header extends Component {
  renderContent() {
    const { auth } = this.props
    switch (auth) {
      case null:
        return
      case false:
        return (<li><a href="/auth/google">Login with google</a></li>)
      default:
        return ([
          <li key="payment"><Payments /></li>,
          <li key="credits" style={{ margin: '0 10px' }}>Credits : {auth.credits}</li>,
          <li key="logout"><a href="/api/logout">Log out</a></li>
        ])
    }
  }
  render() {
    const { auth } = this.props
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="left brand-logo" to={auth ? '/surveys' : '/'}>Emaily</Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}



export default connect(state => ({
  auth: state.auth
}))(Header)