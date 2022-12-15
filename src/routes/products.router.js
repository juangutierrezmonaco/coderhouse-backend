import { Router } from "express";

import { ProductManager } from '../classes/Product/ProductManager.js';

const manager = new ProductManager();
const productsRouter = Router();

productsRouter.get('/?', async (req, res) => {
    const { limit } = req.query;

    try {
        const products = await manager.getProducts();
        res.status(200).json(
            // If limit its not a number or empty, return all products (that case includes undefined)
            isNaN(limit) || !limit ? products : products.slice(0, limit)
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await manager.getProductById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // If any of the parameters are nullish
    if (!title || !description || !code || !price || !stock || !category) {
        res.status(400).json({ error: 'La sintaxis es incorrecta.' });
    }

    try {
        const newProduct = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    try {
        const modifiedProduct = await manager.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails });
        res.status(200).json(modifiedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const deletedProduct = await manager.removeProduct(pid);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export { productsRouter };