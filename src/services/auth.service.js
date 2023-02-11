import * as UserService from './user.service.js';
import { isPasswordValid } from '../utils/auth.util.js';

export async function login(email, password) {
  try {
    // Note: The service throws an error in case of inexistent user
    const user = await UserService.getUser(email);    
    return isPasswordValid(password, user.password) ? user._id.toString() : null;
  } catch (error) {
    throw new Error(error.message);
  }
}