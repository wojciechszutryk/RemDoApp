import { getUserCollection } from "dbSchemas/user.schema";
import {
  URL_GOOGLE,
  URL_REDIRECT,
  URL_USERS,
} from "linked-models/user/user.urls";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const GoogleStrategy = Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
      callbackURL: `http://localhost:3001${URL_USERS}${URL_GOOGLE}${URL_REDIRECT}`,
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",

      // skipUserProfile: true,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
    // async (accessToken, refreshToken, profile, done) => {
    //   const user = await getUserCollection().findOne({
    //     authId: profile.id,
    //   });

    //   // If user doesn't exist creates a new user. (similar to sign up)
    //   if (!user) {
    //     const newUser = await getUserCollection().create({
    //       authId: profile.id,
    //       name: profile.displayName,
    //       email: profile.emails?.[0].value,
    //       whenCreated: new Date(),
    //       displayName: profile.displayName,
    //     });

    //     if (newUser) {
    //       done(null, profile);
    //     }
    //   } else {
    //     done(null, profile);
    //   }
    // }
  )
);

passport.serializeUser((user, done) => {

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

  const user = await getUserCollection().find({
    authId: id,
  });
  done(null, user);
});
