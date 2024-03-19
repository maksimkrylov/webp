const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { Server } = require("socket.io");
const { createServer } = require('node:http');

const server = createServer(app)
const io = new Server(server, {
  cookie: true,
  withCredentials: true,
  cors: {
    origin: "http://localhost:3000"
  }
});


const indexRouter = require('./routes/index.routes');
const { verifyAccessToken } = require('./middleware/verifyJWT');

const handleSocketConnection = require('./socketHandlers');

app.use(cookieParser());
app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(verifyAccessToken);

app.use('/', indexRouter);

handleSocketConnection(io);

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
