import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import { productsRouter } from './routes/product.route.js';
import { cartsRouter } from './routes/cart.route.js';
import { messagesRouter } from './routes/message.route.js';
import { viewsRouter } from './routes/views.route.js';

import './config/db.js'

/* For using env variables */
dotenv.config();

/* Express setup */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Handlebars setup */
app.use(express.static('src/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

/* Routes setup */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/', viewsRouter);

/* Http server */
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`));
httpServer.on('error', (err) => console.log(err));

/* WebSocket server */
const io = new Server(httpServer);
app.set('websocket', io);
io.on('connection', (socket) => {
  console.log("Cliente conectado.");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on("newUser", (email) => {
    socket.broadcast.emit("newUser", email);
  });
});