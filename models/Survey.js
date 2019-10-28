const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

const suveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: number, default: 0 },
  no: { type: number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

mongoose.model('suveys', suveySchema)