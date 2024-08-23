const fs = require("fs");
const http = require("http");
const { host, port } = require("./config/server");

const server = http.createServer((req, res) => {
  let filePath = "./views/404.view.html";
  let contentType = "text/html";

  switch (req.url) {
    case "/":
      filePath = "./views/home.view.html";
      break;

    case "/about":
      filePath = "./views/about.view.html";
      break;

    case "/contact":
      filePath = "./views/contact.view.html";
      break;

    case "/contact-us":
      res.statusCode = 301;
      res.setHeader("Location", "/contact");
      res.end();
      break;

    case "/cv":
      filePath = "./assets/resume.pdf";
      contentType = "application/pdf";
      break;

    default:
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Something went wrong!");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    // Set 404 status code for the error page
    if (filePath == "./404.html") {
      res.statusCode = 404;
    }

    res.end(data);
  });
});

server.listen(port, host, (err, data) => {
  if (err) {
    console.log(err);
  }

  console.log(`Project is running at ${host}:${port}`);
});
