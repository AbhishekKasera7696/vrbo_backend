const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"938161023310-1p0hs3apabh2fdpm8e00n0elorn4ihgt.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:2000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        //     console.log("accessToken", accessToken)
        //     console.log("refreshToken", refreshToken)
             console.log("profileData", profile)
            return done(null, profile);
    }
))

module.exports = passport;