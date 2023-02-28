import { passport } from "../config/passport.config.js";
import { errorResponse } from "../utils/response.util.js";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json(errorResponse(info.messages ?? info.toString()));
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
