const http = require("http");

const server = http.createServer((request, response) => {
  switch (request.url) {
    case "/home": {
      const start = new Date();
      while (new Date() - start < 5000) {
        console.log(new Date() - start < 5000);
      }
      response.write("home page");
      response.end();
      break;
    }
    case "/about": {
      response.write("about page");
      response.end();
      break;
    }
    default: {
      response.write("404 not found");
      response.end();
    }
  }
});

server.listen(3003);
