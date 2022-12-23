import { Router } from "express";
import { ProductManager } from "../classes/Product/ProductManager.js";

const viewsRouter = Router();
const productsManager = new ProductManager();

viewsRouter.get('/', async (req, res) => {    
    const products = await productsManager.getProducts();
    res.render('home', {
        style: 'style.css',
        products
    });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productsManager.getProducts();
    res.render('realTimeProducts', {
        style: 'style.css',
        products
    });
});

export { viewsRouter };