const socket = io();

const productsContainer = document.querySelector('#products-container');

socket.on('addProduct', (newProduct) => {
    productsContainer.appendChild(productToHtml(newProduct));
});

socket.on('removeProduct', (deletedProduct) => {
    console.log(deletedProduct);
    const productNode = document.getElementById(deletedProduct.id);
    productsContainer.removeChild(productNode);
});

const productToHtml = (product) => {
    const productHtml = document.createElement('li');
    productHtml.id = product.id;
    productHtml.innerHTML = `
        <div>Título: ${product.title}</div>
        <div>Descripción: ${product.description}</div>
        <div>Código: ${product.code}</div>
        <div>Precio: ${product.price}</div>
        <div>Stock: ${product.stock}</div>
        <div>Categoría: ${product.category}</div>
        <div>ID: ${product.id}</div>
        <div>Estado: ${product.status ? "Activo" : "Inactivo"}</div>
        <hr>
    `
    return productHtml;
}
