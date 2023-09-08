const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const { User } = require("../models");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_GOOGLE_ID,
      clientSecret: process.env.CLIENT_GOOGLE_SECRET,
      callbackURL: process.env.CALLBACK_GOOGLE_URL,
    },
    async (accessToken,refreshToken, profile, done) => {
      const email = profile.emails[0].value || null;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          email,
          password: "fake_password_123_123",
          isVerified: profile.emails[0].verified,
          name: profile.displayName,
          verifiedDate: new Date(),
        });
        return done(null, newUser);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.CLIENT_FACEBOOK_ID,
//       clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
//       callbackURL: process.env.CALLBACK_FACEBOOK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const email = profile.emails[0].value || null;
//       const user = await User.findOne({ where: { email } });
//       if (user) {
//         return done(null, user);
//       } else {
//         const newUser = await User.create({
//           email,
//           password: "123123",
//           isVerified: profile.emails[0].verified,
//           name: profile.displayName,
//           verifiedDate: new Date(),
//         });
//         return done(null, newUser);
//       }
//     }
//   )
// );

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_FACEBOOK_ID,
      clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
      callbackURL: process.env.CALLBACK_FACEBOOK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      const email = profile.emails[0].value || null;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          email,
          password: "123123",
          isVerified: profile.emails[0].verified,
          name: profile.displayName,
          verifiedDate: new Date(),
        });
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
