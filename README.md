# JS 训练

### 手写 http

```javascript
// 使用node的 net模块，模拟http请求
// 以下为请求数据
// GET / HTTP/1.1\r\n
// Host: 127.0.0.1\r\n
// \r\n

// 以下为响应数据
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
```

### 手写 Javascript

```javascript
// 手写Javascript的产生式（Production）
// <StatementList> ::=
//  <ReturnStatement> |
//  <ExpressionStatement>  
```

