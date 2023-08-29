const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 5002;

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const users = [];
const connections = [];

io.on("connection", (socket) => {
  console.log("пользователь подключился");

  connections.push(socket);

  socket.on("send mess", (data) => {
    console.log(data);
    io.sockets.emit("add mess", { msg: data });
  });

  socket.on("disconnect", (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("пользователь отключился");
  });
});
