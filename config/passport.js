const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/user");
//Require your User Model here!^


// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function (accessToken, refreshToken, profile, cb) {
    // <- verify callback function, this function is called
    // whenever the user has been logged in using the oAuth
    console.log(profile, "<----- Profile"); // <--- Is going to be the users that just logged information from google

    // Search you database and see if the user exists
    // User.findOne({'googleId': profile.id})
    User.findOne({ googleId: profile.id }, function (err, userDoc) {
      if (err) return cb(err); // if there is an error use the callback to proceed to the next line in middleware

      if (userDoc) {
        // if the user exists (truthy statement)
        // callback signature is - cb(errorMessage, theDataThatIsSuccessful)

        return cb(null, userDoc); // send the user doc to the next a middleware function in passport
        // cb is verify callback that will pass  our information to passport.serializeUser at the bottom of the file
        // cb(error, SuccessWhichIsYourUserDocument)
      } else {
        // Create the user in the db
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser); // success, pass that student doc to the next place in the middleware chain,p
        });

        // The above is equivelant to
        // Student.create(
        //   {
        //     name: profile.displayName,
        //     email: profile.emails[0].value, // THis object should match the keys and values in our schema, be sure to include the
        //     // googleId
        //     googleId: profile.id,
        //   },
        //   function (err, newStudentDoc) {
        //     if (err) return cb(err);
        //     return cb(null, newStudent);
        //   }
        // );
      }
    });
  }
)
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {// On every request when the user is logged in this function will be called
  // The id is coming from our session cookie, its the id from line 73 
  User.findById(id, function (err, userDoc) { // search our databases for the user, with the id from the session
    done(err, userDoc); // when we call done here pass in the studentDoc,  This is where req.user = studentDoc
  });
});


