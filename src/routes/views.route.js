import handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import { Router } from "express";

import * as UserService from "../services/user.service.js";
import * as ProductService from '../services/product.service.js';
import * as CartService from '../services/cart.service.js';
import * as MessageService from '../services/message.service.js';
import { auth } from "../middlewares/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
  try {
    res.render('login', {
      style: 'style.css'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

viewsRouter.get('/signup', async (req, res) => {
  try {
    res.render('signup', {
      style: 'style.css'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

viewsRouter.get('/products', auth, async (req, res) => {
  try {
    // set the helpers
    helpers.comparison({
      handlebars: handlebars
    });
    
    const user = await UserService.getUserById(req.session.userId);

    const data = await ProductService.getProducts(req.query);
    const { docs, prevPage, nextPage, page, totalPages } = data;

    // current url without the page query
    let currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    currentUrl = !currentUrl.includes('?') ? `${currentUrl}?` : currentUrl;
    currentUrl = currentUrl.split('&').filter(q => !q.includes("page")).join('&');

    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push({
        link: `${currentUrl}&page=${i}`,
        page: i
      })
    }
    const prevLink = prevPage ? `${currentUrl}&page=${prevPage}` : null;
    const nextLink = nextPage ? `${currentUrl}&page=${nextPage}` : null;

    res.render('products', {
      style: 'style.css',
      notAuth: true,
      user,
      products: docs,
      page,
      links,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

viewsRouter.get('/realtimeproducts', auth, async (req, res) => {
  try {
    const productsResponse = await ProductService.getProducts(req.query);
    const products = productsResponse.docs;

    res.render('realTimeProducts', {
      style: 'style.css',
      notAuth: true,
      products
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

viewsRouter.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  // set the helpers
  helpers.comparison({
    handlebars: handlebars
  });

  try {
    const cart = await CartService.getCart(cid);
    const products = cart.products.map(p => p.toObject());
    
    res.render('cart', {
      style: 'style.css',
      notAuth: true,
      products, 
      cid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

viewsRouter.get('/chat', async (req, res) => {
  try {
    const messagesResponse = await MessageService.getMessages();

    // This is because handlebars for safety reasons won't allow to access directly to the response
    const messages = messagesResponse.map(item => item.toObject());

    res.render('chat', {
      style: 'style.css',
      messages
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { viewsRouter };