const socket = io();

/* Messages */
const chatContainer = document.querySelector('#chat-container');
const messageForm = document.querySelector('#message-form');
const emailNode = document.querySelector('#email');
const messageNode = document.querySelector('#message');

socket.on('addMessage', (newMessage) => {
  const messageHtml = messageToHtml(newMessage);
  chatContainer.appendChild(messageHtml);
  scrollTo(messageHtml);
  toast(`¡Nuevo mensaje de ${newMessage.user_email}!`, 'success');
});

socket.on('updateMessage', (modifiedMessage) => {
  const messageHtml = document.getElementById(modifiedMessage._id);
  scrollTo(messageHtml);
  chatContainer.replaceChild(messageToHtml(modifiedMessage), messageHtml);
  toast('Modificaste un mensaje exitosamente!', 'success');
});

socket.on('removeMessage', (deletedMessageId) => {
  const messageHtml = document.getElementById(deletedMessageId);
  scrollTo(messageHtml);
  chatContainer.removeChild(messageHtml);
  toast('Eliminaste un mensaje exitosamente!', 'success');
});

const messageToHtml = (message) => {
  const messageHtml = document.createElement('li');
  messageHtml.id = message._id;
  messageHtml.classList.add("alert", "alert-warning");
  messageHtml.innerHTML = `
        <div>Usuario: ${message.user_email}</div>
        <div>Mensaje: ${message.text}</div>       
        
        <button
          class="badge text-bg-danger mt-2 deleteMessageButton"
        >Eliminar</button>
    `

  const deleteButton = messageHtml.querySelector('.deleteMessageButton');
  deleteButton.addEventListener('click', () => {
    axios({
      method: 'delete',
      url: `/api/messages/${message._id}`
    }).catch(err => {
      // There's no then because the back sends the emit to websocket 
      toast('Hubo un error en el envío de tu mensaje', 'error');
      console.log(err);
    })
  })

  return messageHtml;
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newMessage = {
    user_email: emailNode.value,
    text: messageNode.value
  }

  // Send a request to the backend to save the message in the database
  axios({
    method: 'post',
    url: '/api/messages',
    data: newMessage
  }).catch(err => {
    // There's no then because the back sends the emit to websocket 
    toast('Hubo un error en el envío de tu mensaje', 'error');
    console.log(err);
  })
});

const deleteMessageButtons = document.querySelectorAll(".deleteMessageButton");
for (const deleteButton of deleteMessageButtons) {
  deleteButton.addEventListener('click', (e) => {
    const id = e.target.parentElement.id;
    axios({
      method: 'delete',
      url: `/api/messages/${id}`
    }).catch(err => {
      // There's no then because the back sends the emit to websocket 
      toast('Hubo un error en el envío de tu mensaje', 'error');
      console.log(err);
    })
  })
}

/* Users */
Swal.fire({
  title: "Ingresa tu email",
  input: "email",
  text: "Email",
  allowOutsideClick: false,
  inputValidator: (value) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !regexEmail.test(value) && "Necesitas escribir un email válido";
  },
}).then((newUser) => {
  emailNode.value = newUser.value;
  socket.emit("newUser", newUser.value);
});

socket.on("newUser", (email) => {
  Swal.fire({
    text: `${email} conectado`,
    toast: true,
    position: "top-right",
  });
});