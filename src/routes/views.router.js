import { Router } from "express";
import { ProductManager } from "../classes/Product/ProductManager.js";

const viewsRouter = Router();
const productsManager = new ProductManager();

viewsRouter.get('/', async (req, res) => {    
    try {
        const products = await productsManager.getProducts();
        res.render('home', {
            style: 'style.css',
            products
        });
    } catch (error) {        
        res.status(400).json({ error: error.message });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.render('realTimeProducts', {
            style: 'style.css',
            products
        });
    } catch (error) {        
        res.status(400).json({ error: error.message });
    }
});

export { viewsRouter };