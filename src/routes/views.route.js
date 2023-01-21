import { Router } from "express";
import * as ProductService from '../services/product.service.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
  try {
    const productsResponse = await ProductService.getProducts();

    // This is because handlebars for safety reasons won't allow to access directly to the response
    const products = productsResponse.map(item => item.toObject());

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
    const productsResponse = await ProductService.getProducts();

    // This is because handlebars for safety reasons won't allow to access directly to the response
    const products = productsResponse.map(item => item.toObject());
    
    res.render('realTimeProducts', {
      style: 'style.css',
      products
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { viewsRouter };