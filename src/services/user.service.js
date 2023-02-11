import { UserModel } from "../models/user.model.js";
import { createHash } from "../utils/auth.util.js";

export async function getUsers() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(email) {
  try {
    const user = await UserModel.findOne({ email }).lean();

    if (!user)
      throw new Error(`The user with the email:${email} doesn't exist.`);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserById(uid) {
  try {
    const user = await UserModel.findById(uid).lean();

    if (!user) throw new Error(`The user with the id:${uid} doesn't exist.`);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createUser(userData) {
  const { email } = userData;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      throw new Error(`The user with the email:${email} already exists.`);

    // Check if is admin
    const [username, domain] = email.split("@");
    if (username.includes("adminCoder") && domain.includes("coder.com")) {
      userData.role = "admin";
    }

    // Hash password
    userData.password = createHash(userData.password);

    const user = await UserModel.create(userData);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(email, userData) {
  try {
    // in case of trying to update password
    userData.password = undefined;

    const user = await UserModel.findOneAndUpdate({ email }, userData, {
      new: true,
    }).lean();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
/* if (!updatePassword) {
  userData.password = undefined;
} else {
  userData.password = createHash(userData.password);
} */

export async function updatePassword(email, userData) {
  try {
    // eventually i have to verify the password (it's long enough, it's secure, it's not empty, etc)
    userData.password = createHash(userData.password);

    const user = await UserModel.findOneAndUpdate({ email }, userData, {
      new: true,
    }).lean();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(uid) {
  try {
    const { modifiedCount } = await UserModel.delete({ _id: uid });

    if (!modifiedCount)
      throw new Error(`The user with the id:${uid} doesn't exist.`);
  } catch (error) {
    throw new Error(error.message);
  }
}
