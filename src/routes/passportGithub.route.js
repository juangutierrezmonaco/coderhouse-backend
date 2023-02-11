import { Router } from "express";
import { STATUS_CODES } from "http";
import { passport } from "../config/passport.config.js";

const passportGithubRouter = Router();

passportGithubRouter.get("/fail", (req, res) => {
  console.log("Fail");
  res.status(400).json({
    data: null,
    status: STATUS_CODES.FAIL,
    error: "Failed on passport",
  });
});

passportGithubRouter.get(
  "/callback",
  passport.authenticate("githubLogin", {
    failureRedirect: "/api/github/fail",
  })
);

passportGithubRouter.get(
  "/login",
  passport.authenticate("githubLogin", { scope: ["user:email"] })
);

export { passportGithubRouter };
