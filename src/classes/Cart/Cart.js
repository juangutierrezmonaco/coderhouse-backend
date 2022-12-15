import { nanoid } from 'nanoid';

export class Cart {
    constructor(products = [], id = nanoid(6)) {
        this.id = id;
        this.products = products;
    }

    addProduct(productId, quantity) {
        const product = this.getProduct(productId);

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
        return product;
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