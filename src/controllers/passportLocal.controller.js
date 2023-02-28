import { STATUS } from "../constants/constants.js";

export async function fail(req, res) {
  console.log("Fail");
  res.status(400).json({
    data: null,
    status: STATUS.FAIL,
    error: "Failed on passport",
  });
}

export async function signup(req, res) {
  res.status(200).json({
    data: req.user,
    status: STATUS.SUCCESS,
    error: "",
  });
}

export async function login(req, res) {
  try {
    req.session.userId = req.user._id;
    res.status(200).json({
      data: "User logged in successfully.",
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    console.log("ERROR SALTEADO EN PASSPORT");
  }
}
