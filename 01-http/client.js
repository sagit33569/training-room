const net = require("node:net");
const ResponseParser = require("./responseParser.js");
let httpStr = "";
const client = net.createConnection({ port: 8090, host: '127.0.0.1' }, () => {
  // 'connect' listener.
  console.log("connected to server!");
  client.write("GET / HTTP/1.1\r\n");
  client.write("Host: 127.0.0.1\r\n");
  client.write("\r\n");
});
client.on("data", (data) => {
  console.log(String.fromCharCode(data[0]));
  // console.log(data.toString());
  httpStr+=data.toString();
});
client.on("end", () => {
  console.log("disconnected from server");
  const parser = new ResponseParser();
  parser.parse(httpStr);
});
