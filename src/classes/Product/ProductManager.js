import fs from 'fs';
import { resolve } from 'path';

import { Product } from './Product.js';

export class ProductManager {
    constructor(fileName = './products.json') {
        this.products = [];
        this.path = resolve('src/database', fileName);
        this.#createFile(); // create the file if it doesn't exist
    }

    async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
        // Get data from file
        await this.#readProducts();

        const alreadyExists = this.products.some(product => product.code === code);
        if (!alreadyExists) {
            // Add to local array
            const newProduct = new Product({ title, description, code, price, status, stock, category, thumbnails });
            this.products.push(newProduct);

            // Save to file
            await this.#writeProducts();

            // Return the product added
            return this.products.at(-1);
        } else {
            throw new Error(`El producto de código ${code} ya existe.`);
        }
    }

    async getProductById(id) {
        if (id === undefined) throw new Error(`Debe ingresar un id para buscar un producto.`);

        // Get data from file
        await this.#readProducts();
        const product = this.products.find(product => product.id === id);

        if (product) return product;
        throw new Error(`No existe el producto de ID: ${id}.`);
    }

    async updateProduct(id, modifiedFields) {
        const product = await this.getProductById(id);

        // Modified those fields that are in product except for id
        for (const key in product) {
            if (Object.hasOwnProperty.call(modifiedFields, key) && key !== 'id' && modifiedFields[key] !== undefined) {
                product[key] = modifiedFields[key];
            }
        }

        // Save to file
        await this.#writeProducts();

        return product;
    }

    async removeProduct(id) {
        const product = await this.getProductById(id);

        this.products = this.products.filter(product => product.id !== id); // Modify the array

        await this.#writeProducts();    // Save to file

        return product; // Return the product in case of need to use it
    }

    async getProducts() {
        await this.#readProducts();
        return [...this.products];
    }

    #createFile() {
        try {
            // If the file doesn't exist, create it
            !fs.existsSync(this.path) && fs.writeFileSync(this.path, '[]');
        } catch (error) {
            throw new Error(error);
        }
    }

    async #readProducts() {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } catch (error) {
            throw new Error(error);
        }
    }

    async #writeProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8");
        } catch (error) {
            throw new Error(error);
        }
    }
}