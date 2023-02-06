import * as UserService from './user.service.js';

export async function login(email, password) {
  try {
    // Note: The service throws an error in case of inexistent user
    const user = await UserService.getUser(email);    
    return user.password === password ? user._id.toString() : null;
  } catch (error) {
    throw new Error(error.message);
  }
}