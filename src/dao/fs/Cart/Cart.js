import { nanoid } from 'nanoid';
import { ProductManager } from '../Product/ProductManager.js';

export class Cart {
    constructor(products = [], id = nanoid(6)) {
        this.id = id;
        this.products = products;
    }

    // Method to get the product data from the products file
    async #getProductDataFromProducts(productId) {
        const product = await new ProductManager().getProductById(productId);
        return product;
    }

    // Funcion to know if the product is in the products file (in case an id of an inexistent product were passed)
    async #productExistsInProducts(productId) {
        const product = await this.#getProductDataFromProducts(productId);
        return product ? true : false;
    }

    async addProduct(productId, quantity) {
        const productExists = await this.#productExistsInProducts(productId);
        if (!productExists) throw new Error(`El producto de id ${productId} no existe.`);

        const product = this.products.find(product => product.productId === productId)

        if (product) {
            product.quantity += quantity;
        } else {
            this.products.push({
                productId,
                quantity
            });
        }

        return product;
    }

    getProduct(productId) {
        const product = this.products.find(product => product.productId === productId);
        if (product) return product;
        throw new Error(`No existe el producto de ID: ${productId} en este carrito.`);
    }

    async getProductData(productId) {
        const { quantity } = this.getProduct(productId);
        const productData = await this.#getProductDataFromProducts(productId);
        return {
            product: productData,
            quantity
        };
    }

    isInCart(productId) {
        const product = this.getProduct(productId);
        return product ? true : false;
    }

    updateQuantity(productId, newQuantity) {
        const product = this.getProduct(productId);
        product.quantity = newQuantity;

        return product;
    }

    removeProduct(productId) {
        const product = this.getProduct(productId);
        this.products = this.products.filter(product => product.productId !== productId);

        return product; // Return the product in case of need to use it
    }
}