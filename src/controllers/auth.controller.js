import * as AuthService from "../services/auth.service.js";
import { STATUS } from "../constants/constants.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userId = await AuthService.login(email, password);
    if (userId) {
      req.session.userId = userId;

      res.json({
        data: "User logged in successfully.",
        status: STATUS.SUCCESS,
        error: "",
      });
    } else {
      res.status(401).json({
        data: null,
        status: STATUS.FAIL,
        error: "Wrong password. Please try again.",
      });
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) throw err;

      res.json({
        data: "User logged out successfully",
        status: STATUS.SUCCESS,
        error: "",
      });
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}
