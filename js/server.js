const http = require("http");

const server = http.createServer((request, response) => {
  response.write("ответ по url anton");
  response.end();
});

server.listen(3003);
