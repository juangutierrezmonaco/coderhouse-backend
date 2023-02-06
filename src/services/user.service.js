import { UserModel } from "../models/user.model.js";

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
    const user = await UserModel.findById(uid);

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
    const [username, domain] = email.split('@');
    if (username.includes("adminCoder") && domain.includes("coder.com")) {
      userData.role = 'admin';
    }

    const user = await UserModel.create(userData);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(uid, userData) {
  try {
    const user = await UserModel.findByIdAndUpdate(uid, userData, {
      new: true,
    });
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
