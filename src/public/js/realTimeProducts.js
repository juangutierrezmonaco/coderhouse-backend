const socket = io();

const productsContainer = document.querySelector('#products-container');

socket.on('addProduct', (newProduct) => {
  const productNode = productToHtml(newProduct);
  productsContainer.appendChild(productNode);
  scrollTo(productNode);
  toast('¡Agregaste un producto exitosamente!', 'success');
});

socket.on('updateProduct', (modifiedProduct) => {
  const productNode = document.getElementById(modifiedProduct.id);
  scrollTo(productNode);
  productsContainer.replaceChild(productToHtml(modifiedProduct), productNode);
  toast('Modificaste un producto exitosamente!', 'success');
});

socket.on('removeProduct', (deletedProductId) => {
  const productNode = document.getElementById(deletedProductId);
  scrollTo(productNode);
  productsContainer.removeChild(productNode);
  toast('Eliminaste un producto exitosamente!', 'success');
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