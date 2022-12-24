import fs from 'fs';
import { resolve } from 'path';

import { Cart } from './Cart.js';

export class CartsManager {
    constructor(fileName = './carts.json') {
        this.carts = [];
        this.path = resolve('src/database', fileName);
        this.#createFile(); // create the file if it doesn't exist
    }

    /*  --- Carts modifications --- */

    async addCart() {
        // Get data from file
        await this.#readCarts();

        // Add to local array
        const newCart = new Cart();
        this.carts.push(newCart);

        // Save to file
        await this.#writeCarts();

        // Return the product added
        return this.carts.at(-1);
    }

    async getCartById(id) {
        if (id === undefined) throw new Error(`Debe ingresar un id para buscar un carrito.`);

        // Get data from file
        await this.#readCarts();
        const cart = this.carts.find(cart => cart.id === id);

        if (cart) return cart;
        throw new Error(`No se ha encontrado el carrito de ID: ${id}.`);
    }

    async removeCart(id) {
        const cart = await this.getCartById(id);

        this.carts = this.carts.filter(cart => cart.id !== id); // Modify the array

        await this.#writeCarts();    // Save to file

        return cart; // Return the product in case of need to use it
    }

    async getCarts() {
        await this.#readCarts();
        return [...this.carts];
    }

    /*  --- Products in cart modifications --- */

    async getProductsOfCart(id, fullInfo = false) {
        const cart = await this.getCartById(id);
        if (fullInfo) {
            const products = [];
            for (const product of cart.products) {
                const productData = await cart.getProductData(product.productId);
                products.push(productData);
            }
            
            return products;
        } else {
            return cart.products;
        }
        
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        if (productId === undefined) throw new Error(`Debe ingresar un id de producto para agregar un producto.`);

        // Get cart and add the product to it
        const cart = await this.getCartById(cartId);
        const product = await cart.addProduct(productId, quantity);

        // Save to file
        await this.#writeCarts();

        // Return the product added
        return product;
    }

    async updateQuantityInProduct(cartId, productId, newQuantity) {
        if (productId === undefined) throw new Error(`Debe ingresar un id de producto para agregar un producto.`);

        // Get cart and add the product to it
        const cart = await this.getCartById(cartId);
        const product = cart.updateQuantity(productId, newQuantity);

        // Save to file
        await this.#writeCarts();

        // Return the product added
        return product;
    }

    async removeProductFromCart(cartId, productId) {
        if (productId === undefined) throw new Error(`Debe ingresar un id de producto para agregar un producto.`);

        // Get cart and add the product to it
        const cart = await this.getCartById(cartId);
        const product = cart.removeProduct(productId);

        // Save to file
        await this.#writeCarts();

        return product; // Return the product in case of need to use the removed product        
    }

    #createFile() {
        try {
            // If the file doesn't exist, create it
            !fs.existsSync(this.path) && fs.writeFileSync(this.path, '[]');
        } catch (error) {
            throw new Error(error);
        }
    }

    async #readCarts() {
        try {
            this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            // I need to make instances of cart to access to its methods
            this.carts = this.carts.map(cart => new Cart(cart.products, cart.id));
        } catch (error) {
            throw new Error(error);
        }
    }

    async #writeCarts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts), "utf-8");
        } catch (error) {
            throw new Error(error);
        }
    }
}