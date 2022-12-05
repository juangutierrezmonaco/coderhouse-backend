import { ProductManager } from './js/ProductManager.js';

/* --------------------------------- TESTING -------------------------------- */
const manager = new ProductManager('./products.json');

// Initial state
try {
    console.log('PRODUCTOS EN ESTADO INICIAL');
    const products = await manager.getProducts();
    console.log(products, '\n');
} catch (error) {
    console.log(`${error}\n`)
}

// Add products
try {
    console.log('AGREGO 3 PRODUCTOS');
    await manager.addProduct('producto1', 'descripcion1', 1, 'imagen1', 'a1b1', 10);
    await manager.addProduct('producto2', 'descripcion2', 2, 'imagen2', 'a2b2', 20);
    await manager.addProduct('producto3', 'descripcion3', 3, 'imagen3', 'a3b3', 30);
    const products = await manager.getProducts();
    console.log(products, '\n');
} catch (error) {
    console.log(`${error}\n`)
}

// Add existing product
try {
    console.log('INTENTO AGREGAR UN PRODUCTO REPETIDO');
    await manager.addProduct('producto1', 'descripcion1', 1, 'imagen1', 'a1b1', 10);
} catch (error) {
    console.log(`${error}\n`)
}

// Get product by id
try {
    console.log('OBTENGO UN PRODUCTO DESDE UN ID EXISTENTE');
    const product = await manager.getProductById(0);
    console.log(product, '\n');
} catch (error) {
    console.log(`${error}\n`)
}

// Get unexisting product
try {
    console.log('OBTENGO UN PRODUCTO DESDE UN ID QUE NO EXISTE');
    await manager.getProductById(10);
} catch (error) {
    console.log(`${error}\n`)
}

// Update product
try {
    console.log('MODIFICO UN PRODUCTO');
    await manager.updateProduct(0, { title: 'producto1 modificado', description: 'descripcion1 modificada', stock: 100 });
    const products = await manager.getProducts();
    console.log(products, '\n');
} catch (error) {
    console.log(`${error}\n`)
}

// Remove a product
try {
    console.log('ELIMINO UN PRODUCTO');
    await manager.removeProduct(1);
    const products = await manager.getProducts();
    console.log(products, '\n');
} catch (error) {
    console.log(`${error}\n`)
}
