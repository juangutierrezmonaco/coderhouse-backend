import fs from 'fs';

export class ProductManager {
    constructor(path = './file.json') {
        this.products = [];
        this.path = path;
        this.#createFile(); // create the file if it doesn't exist
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        // Get data from file
        await this.#readProducts();

        const alreadyExists = this.products.some(product => product.code === code);
        if (!alreadyExists) {
            const id = this.products.length;
            // Add to local array
            this.products.push({ title, description, price, thumbnail, code, stock, id });
            // Save to file
            await this.#writeProducts();
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
        throw new Error(`No se ha encontrado el producto de ID: ${id}.`);
    }

    async updateProduct(id, modifiedFields) {
        if (id === undefined) throw new Error(`Debe ingresar un id para modificar un producto.`);

        const product = await this.getProductById(id);
        const modifiedProduct = {
            ...product,         // Get all attributes from the original product
            ...modifiedFields,  // Modified the attributes updated
            id: product.id      // In case the id were passed modified, ignores it and leaves the original one
        }

        // In case some attributes were passed modifiedFields that doesn't exist in the product, removes them
        for (const key in modifiedProduct) {
            if (!Object.hasOwnProperty.call(product, key)) {
                delete modifiedProduct[key];
            }
        }

        // Update the product
        Object.assign(product, modifiedProduct);

        // Save to file
        await this.#writeProducts();
    }

    async removeProduct(id) {
        // Search the product with getProductById to throw the excepctions in case of error
        const product = await this.getProductById(id);

        this.products = this.products.filter(product => product.id !== id); // Modify the array

        await this.#writeProducts();    // Save to file

        return product; // Return the product in case of need to use the removed product
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