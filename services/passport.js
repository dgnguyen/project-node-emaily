const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/key')
const mongoose = require('mongoose')

const User = mongoose.model('users')

//serialize id user after loging and set it to cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//everytime user make request, take cookie send to db and deserialize and compare
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback",
  proxy: true,
}, async (accessToken, refreshToken, profile, done) => {
  // Check if this user exist in db
  const existingUser = await User.findOne({ googleId: profile.id })

  if (existingUser) {
    return done(null, existingUser)
  }
  const user = await new User({
    googleId: profile.id
  }).save()
  return done(null, user)
})
)

