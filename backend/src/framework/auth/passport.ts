import { compare, hash } from "bcrypt";
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
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, _, __, done) {
      const { displayName, email, password } = req.body;

      if (!(email && password && displayName)) {
        return done("No email or password or displayName provided", false);
      }

      const existingUser = await getUserCollection().findOne({ email });

      if (existingUser) {
        return done("That email is already taken.", false);
      }

      const encryptedPassword = await hash(password, 10);

      const user = await getUserCollection().create({
        displayName,
        email: email.toLowerCase(),
        password: encryptedPassword,
        whenCreated: new Date(),
        loginStrategy: UserLoginStrategy.Local,
        authId: "",
      });
      await getUserCollection().findByIdAndUpdate(user._id, {
        authId: user._id,
      });

      if (!user) return done("Registration failed", false);
      const attachedUser = mapUserToAttachedUser(user);
      done(null, { ...attachedUser, authId: attachedUser.id });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      if (!email || !password)
        done({ message: "Email or password is empty" }, false);
      const foundUser = await getUserCollection().findOne({ email });

      if (!foundUser) return done("Email or password is incorrect", false);

      if (!foundUser.password)
        return done(
          "User was registered with third party service and can't be logged in with password. Please use third party service to log in.",
          false
        );

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
      callbackURL: `${process.env.SERVER_URL}${URL_USERS}${URL_GOOGLE}${URL_REDIRECT}`,
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    },
    async function (accessToken, refreshToken, profile, done) {
      const [encryptedAccessToken, encryptedRefreshToken] = await Promise.all([ 
        hash(accessToken, 10),
        refreshToken ? hash(refreshToken, 10) : null,
      ]);

      const foundUser = await getUserCollection().findOneAndUpdate(
        {
          authId: profile.id,
        },
        {
          googleAccessToken: encryptedAccessToken,
          googleRefreshToken: encryptedRefreshToken,
        },
        {
          new: true,
        }
      );

      if (foundUser) done(null, mapUserToAttachedUser(foundUser));
      else {
        const email = profile.emails ? profile.emails[0].value : "email"; //TODO: fetch email from google api
        const newUser = await getUserCollection().create({
          authId: profile.id,
          loginStrategy: UserLoginStrategy.Google,
          displayName: profile.displayName,
          email,
          avatarUrl: profile.photos ? profile.photos[0].value : null,
          googleAccessToken: encryptedAccessToken,
          googleRefreshToken: encryptedRefreshToken,
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
