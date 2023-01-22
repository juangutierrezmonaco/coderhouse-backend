import { MessageModel } from '../models/message.model.js';

export async function getMessages() {
  try {
    const messages = await MessageModel.find();
    return messages;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMessage(mid) {
  try {
    const message = await MessageModel.findById(mid);
    if (!message) throw new Error(`The message with the id: ${mid} doesn't exist.`);

    return message;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createMessage(messageData) {
  try {
    const message = await MessageModel.create(messageData);
    return message;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateMessage(mid, messageData) {
  try {
    const message = await MessageModel.findByIdAndUpdate(mid, messageData, { new: true });
    if (!message) throw new Error(`The message with the id: ${mid} doesn't exist.`);

    return message;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteMessage(mid) {
  try {
    const message = await MessageModel.findByIdAndDelete(mid);
    if (!message) throw new Error(`The message with the id: ${mid} doesn't exist.`);
  } catch (error) {
    throw new Error(error.message);
  }
}