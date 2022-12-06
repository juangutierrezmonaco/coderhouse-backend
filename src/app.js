import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager('./src/products.json');

/* -------------------------------- Endpoints ------------------------------- */

app.get('/products?', async (req, res) => {
    const { limit } = req.query;

    try {
        const products = await manager.getProducts();
        res.status(200).json(
            // If limit its not a number or empty, return all products (that case includes undefined)
            isNaN(limit) || !limit ? products : products.slice(0, limit)
        );
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await manager.getProductById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

/* -------------------------------- Endpoints ------------------------------- */

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
server.on('error', (err) => {
    console.log(err);
})