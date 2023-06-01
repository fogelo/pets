const http = require("http");


const server = http.createServer((request, response) => {
  response.write("response anton");
  response.end();
});

server.listen(3003);
