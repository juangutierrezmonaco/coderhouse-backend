import { Router } from "express";
import * as UserController from '../controllers/user.controller.js';
import { auth } from "../middlewares/auth.middleware.js";

const usersRouter = new Router();

usersRouter.get('/', auth, UserController.getUsers);
usersRouter.get('/:email', auth, UserController.getUser);
usersRouter.get('/id/:uid', auth, UserController.getUserById);
usersRouter.post('/', UserController.createUser);
usersRouter.put('/:uid', auth, UserController.updateUser);
usersRouter.delete('/:uid', auth, UserController.deleteUser);

export { usersRouter };
