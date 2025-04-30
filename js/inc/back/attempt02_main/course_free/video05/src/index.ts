import http from "http";

let requestCount = 0;

const server = http.createServer((req, res) => {
console.log(requestCount);

  switch (req.url) {
    case "/students":
      res.write("students");
      requestCount++;
      break;
    case "/":
    case "/courses":
      res.write("courses");
      requestCount++;
      break;
    default:
      res.write("not found");
  }
  res.write(": " + requestCount);
  res.end();
});

server.listen(3003);
