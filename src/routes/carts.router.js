import { Router } from "express";

import { CartsManager } from "../classes/Cart/CartsManager.js";

const manager = new CartsManager();
const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {  // Get all carts
    try {
        const carts = await manager.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

cartsRouter.post('/', async (req, res) => {  // Create a new cart with products or empty
    const { products } = req.body;

    try {
        const newCart = await manager.addCart(products);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
});

cartsRouter.get('/:cid', async (req, res) => {  // Get the products of a specific cart
    const { cid } = req.params;

    try {
        const products = await manager.getProductsOfCart(cid);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

cartsRouter.delete('/:cid', async (req, res) => {  // Remove a cart
    const { cid } = req.params;

    try {
        const cart = await manager.removeCart(cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {  // Add a product to a specific cart
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const newProduct = await manager.addProductToCart(cid, pid, quantity);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
});

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {  // Delete a product from a specific cart
    const { cid, pid } = req.params;

    try {
        const deletedProduct = await manager.removeProductFromCart(cid, pid);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const modifiedProduct = await manager.updateQuantityInProduct(cid, pid, quantity);
        res.status(200).json(modifiedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const deletedProduct = await manager.removeProductFromCart(cid, pid);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export { cartsRouter };