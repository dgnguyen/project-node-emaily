const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
//check if user log in
const requireCredits = require('../middlewares/requireCredits')
//check if user have enough credits

const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Mailer = require('../services/Mailer')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    //Save survey in mongoose
    const { body, title, subject, recipients } = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSend: Date.now(),
    })

    // Prepare template and send survey to sendgrid
    const mailer = new Mailer(survey, surveyTemplate(survey))
    mailer.send()
  })
}