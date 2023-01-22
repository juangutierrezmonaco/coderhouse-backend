import * as MessageService from '../services/message.service.js';
import { STATUS } from '../constants/constants.js';

export async function getMessages(req, res) {
  try {
    const messages = await MessageService.getMessages();
    res.status(200).json({
      data: messages,
      status: STATUS.SUCCESS,
      error: ''
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    })
  }
}

export async function getMessage(req, res) {
  const { mid } = req.params;

  try {
    const message = await MessageService.getMessage(mid);
    res.status(200).json({
      data: message,
      status: STATUS.SUCCESS,
      error: ''
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    })
  }
}
export async function createMessage(req, res) {
  try {
    const { body } = req;
    const newMessage = await MessageService.createMessage(body)

    const io = req.app.get('websocket');    // To emit to websocket
    io.emit('addMessage', newMessage);

    res.status(201).json({
      data: newMessage,
      status: STATUS.SUCCESS,
      error: ''
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    });
  }
}

export async function updateMessage(req, res) {
  const { mid } = req.params;
  const { body } = req;

  try {
    const modifiedMessage = await MessageService.updateMessage(mid, body);
    
    const io = req.app.get('websocket');    // To emit to websocket
    io.emit('updateMessage', modifiedMessage);

    res.status(200).json({
      data: modifiedMessage,
      status: STATUS.SUCCESS,
      error: ''
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    });
  }
}

export async function deleteMessage(req, res) {
  const { mid } = req.params;
  
  try {
    await MessageService.deleteMessage(mid);

    const io = req.app.get('websocket');    // To emit to websocket
    io.emit('removeMessage', mid);

    res.status(200).json({
      data: null,
      status: STATUS.SUCCESS,
      error: ''
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: STATUS.FAIL,
      error: error.message
    });
  }
}