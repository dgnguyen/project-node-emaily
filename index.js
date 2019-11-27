const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/key");
const bodyParser = require("body-parser")
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

//Init body parser, everytime a post/put/patch request come in, bodyParser will catch it in req.body before it send to request handle
app.use(bodyParser.json())

//Tell express to use cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//Tell passport to use cookie to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

//Only in prod
if (process.env.NODE_ENV === 'production') {
  // express will serve up production access 
  // like main.js file main.css file
  app.use(express.static('client/build'))

  // express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
