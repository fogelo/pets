const http = require("http");
const fs = require("fs");
const path = require("path");

let requestCount = 0;
let coursesRequestCount = 0;
let postsRequestCount = 0;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8"); // Установка кодировки,чтобы была кирилица,а не кракозябры

  if (req.url === "/") {
    requestCount++;
  } else if (req.url === "/posts") {
    postsRequestCount++;
  } else if (req.url === "/courses") {
    coursesRequestCount++;
  } else if (req.url === "/favicon.ico") {

    const faviconPath = path.join(__dirname, "./favicon.ico");
    const favicon = fs.readFileSync(faviconPath);

    // Установка заголовка для иконки
    res.setHeader("Content-Type", "image/x-icon");
    res.end(favicon);
    return;
  }
  res.write(
    `Было сделано запросов на главной: ${requestCount}. Запрошены посты ${postsRequestCount}. Запрошены курсы: ${coursesRequestCount}`
  );
  res.end();
  return;
});

server.listen(3003);

/* 
?Комментарий по поводу того,что счетчик увеличивается на 2.
Это происходит поскольку браузер делает 2 запроса "/" и "/favicon.ico". Второй отправляется автоматически на получение фавиконки
*/
