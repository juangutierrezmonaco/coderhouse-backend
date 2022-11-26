export class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const alreadyExists = this.products.some(product => product.code === code);

        if (!alreadyExists) {
            const id = this.products.length;
            this.products.push({ title, description, price, thumbnail, code, stock, id })
        } else {
            console.log("That product already exists.");
        }
    }

    getProducts() {
        return [...this.products];
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        
        if (product) return product;
        console.log("Not found.")
    }
}