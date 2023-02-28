import { Router } from "express";
import { passport } from "../config/passport.config.js";
import * as PassportLocalController from "../controllers/passportLocal.controller.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const passportLocalRouter = Router();

passportLocalRouter.get("/fail", PassportLocalController.fail);

passportLocalRouter.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/api/passportLocal/fail",
  }),
  PassportLocalController.signup
);

passportLocalRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/passportLocal/fail",
  }),
  PassportLocalController.login
);

passportLocalRouter.get('/current', passportCall('login'), (req, res) => {
  res.send(req.user)
})

export { passportLocalRouter };
