const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

//Mailer.js in capital because it will be export as module
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super()
    //Sendgrid setup
    this.from_email = new helper.Email('no-reply@emaily.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = new helper.formatAddresses(recipients)
  }
}

module.exports = Mailer