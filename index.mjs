// Testing
import { ProductManager } from './ProductManager.mjs';

const manager = new ProductManager();
console.log(manager.getProducts());

manager.addProduct("producto de prueba", "Este es un producto prueba.", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProducts());

manager.addProduct("producto de prueba", "Este es un producto prueba.", 200, "Sin imagen", "abc123", 25);

manager.getProductById(0);
console.log(manager.getProductById(0))