var passport = require("passport");
var LocalStrategy = require("passport-local");

var db = require("../models");

//make passport use a Local Strategy (login with a username and password)

passport.use(
  new LocalStrategy(
    {
      emailField: "email"
    },
    function(email, password, done) {
      //Find User in database
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        //if no user
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email or email not found"
          });
        }
        // if wrong password
        else if (!dbUser.validatePassword(password)) {
          return done(null, false, {
            message: "Incorrect password"
          });
        }
        //if correct user and password
        return done(null, dbUser);
      });
    }
  )
);

//Keep the authentication state across all http requests
//using serialize to create a cookie
//and deserialize to remove the cookie

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
