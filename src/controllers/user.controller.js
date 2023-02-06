import * as UserService from "../services/user.service.js";
import { STATUS } from "../constants/constants.js";

export async function getUsers(req, res) {
  try {
    const users = (await UserService.getUsers()).map(user => {
      user.password = undefined;
      return user;
    });
    
    res.status(200).json({
      data: users,
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}

export async function getUser(req, res) {
  const { email } = req.params;

  try {
    const user = await UserService.getUser(email);
    user.password = undefined;

    res.status(200).json({
      data: user,
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}

export async function getUserById(req, res) {
  const { uid } = req.params;

  try {
    const user = await UserService.getUserById(uid);
    user.password = undefined;

    res.status(200).json({
      data: user,
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}

export async function createUser(req, res) {
  try {
    const { body } = req;
    const newUser = await UserService.createUser(body);
    delete newUser.password;

    res.status(201).json({
      data: newUser,
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}

export async function updateUser(req, res) {
  const { uid } = req.params;

  try {
    const { body } = req;
    const user = await UserService.updateUser(uid, body);
    user.password = undefined;

    res.status(200).json({
      data: user,
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  const { uid } = req.params;

  try {
    await UserService.deleteUser(uid);

    res.status(200).json({
      data: null,
      status: STATUS.SUCCESS,
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message,
    });
  }
}
