import { compare } from "bcrypt";
import {
  getUserCollection,
  mapUserToAttachedUser,
} from "dbSchemas/user.schema";
import { UserLoginStrategy } from "linked-models/user/user.enum";
import {
  URL_GOOGLE,
  URL_REDIRECT,
  URL_USERS,
} from "linked-models/user/user.urls";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      if (!email || !password)
        done({ message: "Username or password is empty" }, false);
      const foundUser = await getUserCollection().findOne({ email });

      if (!foundUser) return done("Email or password is incorrect", false);

      const isPasswordCorrect = await compare(password, foundUser.password);

      if (!isPasswordCorrect) {
        return done("Email or password is incorrect", false);
      }

      return done(null, mapUserToAttachedUser(foundUser));
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
      callbackURL: `http://localhost:3001${URL_USERS}${URL_GOOGLE}${URL_REDIRECT}`,
    },
    async function (_, __, profile, done) {
      const foundUser = await getUserCollection().findOne({
        authId: profile.id,
      });

      if (foundUser) done(null, mapUserToAttachedUser(foundUser));
      else {
        const newUser = await getUserCollection().create({
          authId: profile.id,
          loginStrategy: UserLoginStrategy.Google,
          displayName: profile.displayName,
          email: profile.emails![0].value,
          whenCreated: new Date(),
        });
        done(null, mapUserToAttachedUser(newUser));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.authId);
});

passport.deserializeUser(async (authId, done) => {
  const user = await getUserCollection().findOne({ authId });
  if (!user) return done("User not found", null);

  done(null, mapUserToAttachedUser(user));
});
