  passport = require('passport');
  LocalStrategy = require('passport-local').Strategy;
  mongoose = require('mongoose'),
      Utils = require('../config/utils'),
      User = mongoose.model('User');

// Define the strategy to be used by PassportJS
//passport.use(new LocalStrategy(
//    function(username, password, done) {
//        if (username === "admin" && password === "admin") // stupid example
//            return done(null, {name: "admin"});
//
//        return done(null, false, { message: 'Incorrect username.' });
//    }
//));
  passport.use(User.createStrategy());
// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

module.exports =function (app) {
    app.use(passport.initialize()); // Add passport initialization
    app.use(passport.session());    // Add passport initialization

}
  exports.Auth = auth;
