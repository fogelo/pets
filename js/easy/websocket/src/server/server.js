import fastify from "fastify";
import { fastifyWebsocket } from "@fastify/websocket";

const server = fastify({ logger: true });
await server.register(fastifyWebsocket); // регистрация websocket. Для работы с websocket.

// http запросы
server.get("/", (req, res) => {
  res.send("Hello World");
});

// websocket запросы
fastify.register(async function (fastify) {
  fastify.get("/ws", { websocket: true }, (socket, req) => {
    socket.on("message", (message) => {
      socket.send("hi from server");
    });
  });
});

// запуск сервера
server.listen({ port: 3001 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running on ${address}`);
  });