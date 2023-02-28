import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import passport from 'passport';
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import cors from "cors";


import { authRouter } from "./routes/auth.route.js";
import { usersRouter } from "./routes/user.route.js";
import { productsRouter } from "./routes/product.route.js";
import { cartsRouter } from "./routes/cart.route.js";
import { messagesRouter } from "./routes/message.route.js";
import { viewsRouter } from "./routes/views.route.js";
import { passportLocalRouter } from "./routes/passportLocal.route.js";
import { passportGithubRouter } from "./routes/passportGithub.route.js";

import "./config/db.config.js";
import { config } from "./config/config.js";

/* Express setup */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Handlebars setup */
app.use(express.static("src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

/* Sessions setup */
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


/* Cookies setup */
app.use(cookie());

/* Coors setup */
app.use(cors());

/* Passport setup */
app.use(passport.initialize());
app.use(passport.session());

/* Routes setup */
app.use("/api/auth", authRouter);
app.use("/api/passportLocal", passportLocalRouter);
app.use("/api/github", passportGithubRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter);

/* Http server */
const PORT = config.port;
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
