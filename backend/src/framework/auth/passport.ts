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
      // User.findOne won't fire unless data is sent back
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

      // find a user whose email is the same as the forms email
      // User.findOne({ "local.email": email }, function (err, user) {
      //   if (err) return done(err);

      //   if (user) {
      //     return done(
      //       null,
      //       false,
      //       req.flash("signupMessage", "That email is already taken.")
      //     );
      //   } else {
      //     // if there is no user with that email -create the user
      //     const newUser = new User();
      //     // set the user's local credentials
      //     newUser.local.email = email;
      //     newUser.local.password = newUser.generateHash(password);
      //     // save the user
      //     newUser.save(function (err) {
      //       if (err) throw err;
      //       return done(null, newUser);
      //     });
      //   }
      // });
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
