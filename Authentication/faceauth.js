require("dotenv").config();
const express = require("express");
const passport = require("passport");
const FacebookModel = require("../model/userSchema");
const FacebookStrategy = require("passport-facebook").Strategy;
// const cors = require("cors");
const auth = express.Router();

// auth.use(cors());
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_SECRET_ID,
			callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
			profileFields: ["id", "displayName", "photos", "email"],
		},

		function (accessToken, refreshToken, profile, done) {
            console.log(profile)
			let avatar = profile.photos[0].value;
			const newfacebookUser = new FacebookModel({
                            facebook_id: profile.id,
							fullName: profile.displayName,
							email: "user@facebook.com",
							profile_pic: avatar,
            })
            .save().then((user)=>{
                done(null,user)
            })
		}
	)
);

auth.get("/facebook", passport.authenticate("facebook"));

auth.get(
	"/facebook/callback",
	passport.authenticate("facebook", { failureRedirect: "/login" }),
	function (req, res) {
		// Successful authentication, redirect home.
		// res.redirect(`${process.env.FRONTEND_URL}/`);
        res.send("login succesfully")
	}
);
module.exports = auth;