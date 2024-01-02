const http = require("http");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
    case "/home": {
      //искусственная задержка
      {
        const start = new Date().getTime();
        while (new Date().getTime() - start < 5000) {
          console.log(new Date().getTime() - start);
        }
      }

      res.write("hello anton");
      res.end();
      break;
    }
    default: {
      res.write("page not found");
      res.end();
      break;
    }
  }
});

server.listen(3003);
