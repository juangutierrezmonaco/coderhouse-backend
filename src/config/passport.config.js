import passport from "passport";
import passportLocal from "passport-local";
import passportGithub from "passport-github2";
import { UserModel } from "../models/user.model.js";
import * as UserService from "../services/user.service.js";
import * as AuthService from "../services/auth.service.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser(function (user, done) {
  console.log("Serializing");
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  console.log("Deserializing");
  UserModel.findById(_id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "signup",
  new passportLocal.Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const userExists = await UserModel.findOne({ email: username });
        if (userExists) {
          return done("User already exists", false);
        } else {
          const newUser = await UserService.createUser(req.body);
          return done(null, newUser);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

passport.use(
  "login",
  new passportLocal.Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const userId = await AuthService.login(username, password);
        if (userId) {
          const user = await UserModel.findById(userId);
          return done(null, user);
        } else {
          return done("login error", false);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

passport.use(
  "githubLogin",
  new passportGithub.Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/github/callback"
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userData = {
          first_name: profile._json.name,
          last_name: profile._json.name,
          age: 18,
          email: profile._json.email,
          password: process.env.SECRET,
          avatar_url: profile._json.avatar_url
        };

        console.log(userData)

        // if the email or data is not public 
        if (userData.email === null){
          return done("your email or some of your data is private", false);
        }

        // If the user already exists, verify if it's created with form or github. If it's Github, password should be
        // the SECRET variable in env.secret. If not, user have to be authenticated through the form
        const userExists = await UserModel.findOne({ email: userData.username });

        if (userExists) {
          const userId = await AuthService.login(userData.email, userData.password);        
          const user = await UserModel.findById(userId);
          return done(null, user);
        } else {
          const newUser = await UserService.createUser(userData);
          return done(null, newUser);
        }       
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

export { passport };
