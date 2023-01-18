import { Router } from "express";
import * as CartController from '../controllers/cart.controller.js'

const cartsRouter = Router();

cartsRouter.get('/', CartController.getCarts);
cartsRouter.get('/:cid', CartController.getCart);
cartsRouter.post('/', CartController.createCart);
cartsRouter.delete('/:cid', CartController.deleteCart);
cartsRouter.post('/:cid/product/:pid', CartController.addProduct);
cartsRouter.post('/:cid/product/:pid', CartController.updateProduct);
cartsRouter.delete('/:cid/product/:pid', CartController.deleteProduct);

export { cartsRouter };