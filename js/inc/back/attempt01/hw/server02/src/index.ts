// Импортируем dotenv для загрузки переменных окружения
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import { blogRouter } from "./routes/blog-router";
import { postRouter } from "./routes/post-router";
import { testRouter } from "./routes/test-router";

dotenv.config();
const app = express();
const portHTTP = process.env.SERVER_PORT_HTTP || 3001;
const portHTTPS = process.env.SERVER_PORT_HTTPS || 3001;
const ip = process.env.SERVER_IP || "127.0.0.1";

console.log("portHTTP", portHTTP);
console.log("portHTTPS", portHTTPS);
console.log("ip", ip);

// middlewares
app.use(express.json());

//routers
app.use("/blogs", blogRouter);
app.use("/posts", postRouter);
app.use("/testing", testRouter);

if (process.env.NODE_ENV === "production") {
  // Загрузите сертификат и ключ
  const options = {
    key: fs.readFileSync(process.env.SERVER_SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SERVER_SSL_CERT_PATH),
    // ca: fs.readFileSync('./certs/ca-bundle.crt') // Укажите цепочку сертификатов, если есть
  };
  https.createServer(options, app).listen(portHTTPS, () => {
    console.log(`HTTPS Server running at https://${ip}:${portHTTPS}`);
  });
} else {
  // В разработке запускаем только HTTP сервер
  http.createServer(app).listen(portHTTP, () => {
    console.log(`Development Server running at http://${ip}:${portHTTP}`);
  });
}