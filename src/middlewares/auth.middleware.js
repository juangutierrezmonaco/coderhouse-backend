import { STATUS } from "../constants/constants.js";

export function auth(req, res, next) {
  if (req.session.logged) {
    req.session.touch();
    next();
  } else {
    res.status(401).json({
      data: null,
      status: STATUS.FAIL,
      error: "User not authenticated.",
    });
  }
}
