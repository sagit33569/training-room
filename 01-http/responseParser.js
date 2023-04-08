class ResponseParser {
  constructor() {
    this.statusCode = 0;
    this.body = "";
    this.headers = {};
    this.statusText = "";
  }

  parse(data) {
    // "HTTP/1.1 200 OK\r\n"   // response line
    // "Content-Type: application/json\r\n"   // response header
    // "Date: Tue, 04 Apr 2023 13:52:00 GMT\r\n"   // response header
    // "Connection: keep-alive\r\n"    // response header
    // "Keep-Alive: timeout=5\r\n"    // response header
    // "Transfer-Encoding: chunked\r\n"    // response header
    // "\r\n"    // response header end
    // "17\r\n"   // response body
    // '{"data":"Hello World!"}\r\n'    // response body
    // "0\r\n"    // response body end
    // "\r\n"    // response end
    const lineReg = /[^\r]*\r\n/g;

    while (true) {
      let lineStr = lineReg.exec(data);
      // console.log("lineStr", lineStr);
      // 过滤response body 因为响应头和响应体是分开的，中间有一个空行
      if (!lineStr || lineStr[0] === "\r\n") {
        break;
      }
      // 继续截取响应头，需要过滤掉响应行 response line
      if (lineStr && !lineStr[0].match(/HTTP\/1.1/)) {
        // 通过: 对  key value 进行分割
        const [key, value] = lineStr[0].split(": ");
        // 将value中的\r\n去掉，因为在浏览器中是不会显示\r\n的，所以这里也不需要
        this.headers[key] = value.replace("\r\n", "");
      } else {
        // console.log("HTTP lineStr", lineStr[0]);
        const responseLineReg = /HTTP\/1.1 (\d+) (.*)\r\n/;
        // const responseLineReg = /^HTTP\/1\.\d\s(\d+)\s(.+)\r\n$/;
        const match = lineStr[0].match(responseLineReg);
        // console.log("match", match);
        this.statusCode = match[1];
        this.statusText = match[2];
      }
    }
    // console.log(this.headers);
    while (true) {
      // 获取响应体的长度
      let bodyStr = lineReg.exec(data);
      // 获取响应体的起始位置
      const start = lineReg.lastIndex;
      // 永远指定进制
      const bodyLength = parseInt(bodyStr, 16);
      // 如果响应体的长度为0或为NaN，那么就不需要再截取了
      if (!bodyStr || bodyLength === 0) {
        break;
      }
      // console.log("bodyStr", bodyStr);
      // console.log("bodyLength", bodyLength);
      // 截取响应体
      let body = data.slice(start, start + bodyLength);
      // 设置下一次截取的起始位置
      lineReg.lastIndex += bodyLength + 1;
      this.body = body;
    }
    console.log('this', this);
  }
}

module.exports = ResponseParser;
