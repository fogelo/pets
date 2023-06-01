const http = require("http");
const fs = require("fs");

const delay = (ms) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
      console.log(ms);
    }, ms);
  });
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const server = http.createServer(async (request, response) => {
  switch (request.url) {
    case "/home": {
      try {
        // await delay(5000);
        const data = await readFile("./pages/home.html");
        response.write(data);
        response.end();
      } catch {
        response.write("something wrong");
        response.end();
      }
      break;
    }
    case "/about": {
      const data = fs.readFileSync("./pages/about.html");
      response.write(data);
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
