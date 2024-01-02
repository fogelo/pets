const http = require("http");
const fs = require("fs");

// Синхронно читает файл,
const server1 = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
    case "/home": {
      const data = fs.readFileSync("./pages/home.html");
      res.write(data);
      break;
    }
    default: {
      res.write("page not found");
    }
  }

  res.end();
});

// server1.listen(3003);

// Используем асинхронный код и промисификацию
const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject("Ошибка при чтении файла");
      else resolve(data);
    });
  });
};

const server2 = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  switch (req.url) {

    
    case "/":
    case "/home": {
      //Можно использовать колбеки. Колбэк переданный в readFile вызовется после чтения файла
      fs.readFile("./pages/home.html", (err, data) => {
        if (err) {
          res.write("Ошибка при чтении файла");
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    }


    case "/posts": {
      // можно обернуть в промис
      try {
        const data = await readFile("./pags/posts.html");
        res.write(data);
        res.end();
      } catch (err) {
        console.log(err);
        res.write(err);
        res.end();
      }
      break;
    }


    case "/about": {
      await wait(3000);
      res.write("about page");
      res.end();
      break;
    }


    default: {
      res.write("page not found");
    }
  }
});

server2.listen(3003);
