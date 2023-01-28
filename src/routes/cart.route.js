import { Router } from "express";
import * as CartController from '../controllers/cart.controller.js'

const cartsRouter = Router();

cartsRouter.get('/', CartController.getCarts);
cartsRouter.get('/:cid', CartController.getCart);
cartsRouter.post('/', CartController.createCart);
cartsRouter.put('/:cid', CartController.updateCart);
cartsRouter.delete('/:cid', CartController.deleteCart);
cartsRouter.post('/:cid/products/:pid', CartController.addProduct);
cartsRouter.put('/:cid/products/:pid', CartController.updateProduct);
cartsRouter.delete('/:cid/products/:pid', CartController.deleteProduct);

export { cartsRouter };