import { Router } from "express";
import * as MessageController from '../controllers/message.controller.js'

const messagesRouter = Router();

messagesRouter.get('/', MessageController.getMessages);
messagesRouter.get('/:mid', MessageController.getMessage);
messagesRouter.post('/', MessageController.createMessage);
messagesRouter.put('/:mid', MessageController.updateMessage);
messagesRouter.delete('/:mid', MessageController.deleteMessage);

export { messagesRouter };