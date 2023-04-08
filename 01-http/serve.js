const http = require("node:http");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  console.log("Server is running on port 8090");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

server.listen(8090);
