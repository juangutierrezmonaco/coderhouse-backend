import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";

import { authRouter } from "./routes/auth.route.js";
import { usersRouter } from "./routes/user.route.js";
import { productsRouter } from "./routes/product.route.js";
import { cartsRouter } from "./routes/cart.route.js";
import { messagesRouter } from "./routes/message.route.js";
import { viewsRouter } from "./routes/views.route.js";
import "./config/db.js";

/* For using env variables */
dotenv.config();

/* Express setup */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Handlebars setup */
app.use(express.static("src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

/* Coockies/Sessions setup */
app.use(cookie());
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.MONGODB_URI,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

/* Routes setup */
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter);

/* Http server */
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
httpServer.on("error", (err) => console.log(err));

/* WebSocket server */
const io = new Server(httpServer);
app.set("websocket", io);
io.on("connection", (socket) => {
  console.log("Cliente conectado.");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on("newUser", (email) => {
    socket.broadcast.emit("newUser", email);
  });
});
