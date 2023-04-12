/**
 * @description 使用Node.js的HTTP模块创建一个HTTP服务器, 用于接受客户端的请求，返回响应数据
 * @date 2023-04-04
 * @author: sagit
 */
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
