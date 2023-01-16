import { Router } from "express";
import * as ProductController from '../controllers/product.controller.js'

const productsRouter = Router();

productsRouter.get('/?', ProductController.getProducts);
productsRouter.get('/:pid', ProductController.getProduct);
productsRouter.post('/', ProductController.createProduct);
productsRouter.put('/:pid', ProductController.updateProduct);
productsRouter.delete('/:pid', ProductController.deleteProduct);

export { productsRouter };