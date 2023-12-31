import { compare, hash } from "bcrypt";
import { getAccessLinkCollection } from "dbSchemas/accessLink.schema";
import {
  getUserCollection,
  mapUserToAttachedUser,
} from "dbSchemas/user.schema";
import { ACCESS_LINK_HEADER } from "linked-models/accessLink/accessLink.url";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { IUserAttached, IUserPreferences } from "linked-models/user/user.model";
import {
  URL_GOOGLE,
  URL_REDIRECT,
  URL_USERS,
  USER_PARAM,
} from "linked-models/user/user.urls";
import passport from "passport";
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { UniqueTokenStrategy } from "passport-unique-token";
import { decodeHash } from "services/accessLink/accessLink.helpers";
import { v4 as uuidv4 } from "uuid";
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
      const { displayName, email, password, language } = req.body;

      if (!(email && password && displayName)) {
        return done(
          { message: "No email or password or displayName provided" },
          false
        );
      }

      const existingUser = await getUserCollection().findOne({ email });

      if (existingUser) {
        return done({ message: "That email is already taken." }, false);
      }

      const encryptedPassword = await hash(password, 10);

      const user = await getUserCollection().create({
        displayName,
        email: email.toLowerCase(),
        password: encryptedPassword,
        whenCreated: new Date(),
        preferences: {
          emailUnsubscribeToken: uuidv4(),
          language,
        },
        authId: "",
      });
      await getUserCollection().findByIdAndUpdate(user._id, {
        authId: user._id,
      });

      if (!user) return done({ message: "Registration failed" }, false);
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

      if (!foundUser)
        return done({ message: "Email or password is incorrect" }, false);

      if (!foundUser.password)
        return done(
          {
            message:
              "User was registered with third party service and can't be logged in with password. Please use third party service to log in.",
          },
          false
        );

      const isPasswordCorrect = await compare(password, foundUser.password);

      if (!isPasswordCorrect) {
        return done({ message: "Email or password is incorrect" }, false);
      }

      return done(null, mapUserToAttachedUser(foundUser));
    }
  )
);

passport.use(
  new UniqueTokenStrategy(
    {
      tokenHeader: ACCESS_LINK_HEADER,
      failOnMissing: false,
      session: false,
    },
    async (token, done) => {
      const accessLinkId = decodeHash(token).split(".")[0];
      if (!accessLinkId)
        return done(new Error("Access link not found"), undefined);

      let accessToken;
      try {
        accessToken = await getAccessLinkCollection().findOne({
          _id: accessLinkId,
        });
      } catch (error) {
        return done(new Error("Access link not found"), undefined);
      }

      if (
        !accessToken ||
        (accessToken?.expiryDate && accessToken.expiryDate < new Date())
      )
        return done(new Error("Access link expired"), undefined);

      const tempUser: IUserAttached = {
        id: accessToken[USER_PARAM] || accessLinkId,
        authId: accessToken[USER_PARAM] || accessLinkId,
        password: "",
        integratedWithGoogle: false,
        displayName: "Temporary user",
        email: "Temporary user",
        accessScopes: {
          [USER_PARAM]: accessToken[USER_PARAM],
          [TODO_LIST_PARAM]: accessToken[TODO_LIST_PARAM],
        },
        isTemporary: true,
        whenCreated: new Date(),
        preferences: {} as IUserPreferences,
      };

      return done(null, tempUser);
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
        "https://www.googleapis.com/auth/calendar.events.owned",
      ],
    },
    async function (
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: Profile,
      done: VerifyCallback
    ) {
      const foundUser = await getUserCollection().findOneAndUpdate(
        {
          $or: [
            { authId: profile.id },
            { email: { $in: profile.emails?.map((e) => e.value) } },
          ],
        },
        {
          googleAccessToken: accessToken,
          googleRefreshToken: refreshToken,
          googleTokenExpiryDate:
            new Date().getTime() + params.expires_in * 1000,
          integratedWithGoogle: true,
        },
        {
          new: true,
        }
      );

      if (foundUser) done(null, mapUserToAttachedUser(foundUser));
      else {
        const email = profile.emails && profile.emails[0].value;
        if (!email) return done("Email not provided", undefined);
        const newUser = await getUserCollection().create({
          authId: profile.id,
          displayName: profile.displayName,
          email,
          preferences: {
            emailUnsubscribeToken: uuidv4(),
            language: profile._json.locale,
          },
          integratedWithGoogle: true,
          avatarUrl: profile.photos ? profile.photos[0].value : null,
          googleAccessToken: accessToken,
          googleRefreshToken: refreshToken,
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
