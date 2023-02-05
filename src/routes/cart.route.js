import { Router } from "express";
import * as CartController from '../controllers/cart.controller.js';
import { auth } from "../middlewares/auth.middleware.js";

const cartsRouter = Router();

cartsRouter.get('/', auth, CartController.getCarts);
cartsRouter.get('/:cid', auth, CartController.getCart);
cartsRouter.post('/', auth, CartController.createCart);
cartsRouter.put('/:cid', auth, CartController.updateCart);
cartsRouter.delete('/:cid', auth, CartController.deleteCart);
cartsRouter.post('/:cid/products/:pid', auth, CartController.addProduct);
cartsRouter.put('/:cid/products/:pid', auth, CartController.updateProduct);
cartsRouter.delete('/:cid/products/:pid', auth, CartController.deleteProduct);

export { cartsRouter };