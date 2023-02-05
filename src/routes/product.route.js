import { Router } from "express";
import * as ProductController from '../controllers/product.controller.js';
import { auth } from "../middlewares/auth.middleware.js";

const productsRouter = new Router();

productsRouter.get('/?', auth, ProductController.getProducts);
productsRouter.get('/:pid', auth, ProductController.getProduct);
productsRouter.post('/', auth, ProductController.createProduct);
productsRouter.put('/:pid', auth, ProductController.updateProduct);
productsRouter.delete('/:pid', auth, ProductController.deleteProduct);

export { productsRouter };