const logoutButton = document.querySelector('.logoutButton');

logoutButton && logoutButton.addEventListener('click', () => {
  axios({
    method: "get",
    url: "/api/auth/logout",  
  })
  .then(() => {
    console.log("Todo bien")
    window.location.href = "/";
  })
  .catch((err) => {
    console.log(err)
    const {error} = err.response.data;
    toast("Hubo un error: ", "error", error);
  })
});