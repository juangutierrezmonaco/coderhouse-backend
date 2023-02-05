const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");

loginForm && loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  // Send a request to the backend to post a login
  axios({
    method: "post",
    url: "/api/auth/login",
    data: { email, password },    
  })
  .then(() => {
    toast("Ingreso correcto", "success");
    window.location.href = "/products";
  })
  .catch((err) => {
    const {error} = err.response.data;
    toast("Hubo un error: ", "error", error);
  })
});

signupForm && signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const age = e.target.age.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  // Send a request to the backend to post a login
  axios({
    method: "post",
    url: "/api/auth/login",
    data: { firstName, lastName, age, email, password },    
  })
  .then((res) => {
    console.log(res)
    toast("Ingreso correcto", "success");
  })
  .catch((err) => {
    const {error} = err.response.data;
    console.log(err)
    toast("Hubo un error: ", "error", error);
  })
});
