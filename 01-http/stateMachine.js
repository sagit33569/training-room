// 状态机
class StateMachine {
  constructor() {
    this.currentState = "STATUS_LINE"; // 初始状态
    this.currentLine = ""; // 当前行
    this.statusCode = 0; // 状态码
    this.body = ""; // 响应体
    this.headers = {}; // 响应头
    this.statusText = ""; // 状态文本
  }

  // 状态机的核心方法
  receiveChar(data) {
    for (let i = 0; i < data.length; i++) {
      const char = String.fromCharCode(data[i]);
      switch(this.currentState) {
        case "STATUS_LINE":
          if (char === "\r") {
            const parts = currentLine.split('');
            this.statusCode = parts[1];
            this.statusText = parts[2];
            this.currentState = "S"
          } else {
            this.currentLine += char;
          }
          break
          
      }
    }
  }
}
