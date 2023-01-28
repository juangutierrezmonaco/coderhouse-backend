const addToCartForms = document.querySelectorAll('#addToCartForm');
for (const addToCartForm of addToCartForms) {
  addToCartForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pid = e.target.parentElement.id;
    const cid = e.target['cart-id'].value;
    const quantity = e.target['quantity'].value;

    axios({
      method: 'post',
      url: `/api/carts/${cid}/products/${pid}`,
      data: quantity
    })
    .then(() => {
      toast(`Tu producto se agregó correctamente!`, 'success');
      e.target.reset();
    })
    .catch(err => {
      // There's no then because the back sends the emit to websocket 
      toast(`Hubo un error: ${err.message}`, 'error');
      console.log(err);
    })
  })
}