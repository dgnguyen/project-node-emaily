const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
//check if user log in
const requireCredits = require('../middlewares/requireCredits')
//check if user have enough credits

const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Mailer = require('../services/Mailer')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body)
    res.send({})
  })


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
    try {
      await mailer.send()
      //save in database after send mail
      await survey.save()
      // credited user
      req.user.credits -= 1
      const user = await req.user.save()
      //sendback user with credit updated
      res.send(user)
    }
    //Send back error if something wrong
    catch (err) {
      res.status(422)
    }
  })
}