import http from "http";
import fs from "fs";
import path from "path";

//console.log("cwd:", process.cwd());
//console.log("__dirname:", __dirname);

const readFile = (path: string) => {
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

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/":
    case "/home": {
      const pathSegments = [__dirname, "pages", "home.html"];
      const filePath = path.join(...pathSegments);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.write("something wrong, 500");
        } else {
          res.write(data);
        }
        res.end();
      });
      break;
    }
    case "/home_promise":
      const pathSegments = [__dirname, "pages", "home.html"];
      const filePath = path.join(...pathSegments);
      try {
        const data = await readFile(filePath);
        res.write(data);
        res.end();
      } catch (err) {
        res.write("something wrong, 500");
        res.end();
      }
      break;
    case "/about":
      res.write("about");
      res.end();
      break;
    default:
      res.write("not found");
      res.end();
      break;
  }
});

server.listen(3003);
