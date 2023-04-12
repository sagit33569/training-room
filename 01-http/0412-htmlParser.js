/**
 * @description: 解析标准的html文档，结合栈类型的数据结构，使用状态机实现
 * @date 2021-04-12
 * @author: sagit
 */
const { start, setEmitCb } = require("./0412-stateMachine");

/**
 * @description: 栈类型的数据结构，用于存储解析过程中的标签token
 */
let stack = [{
  type: 'document',
  children: []
}]

// 测试用的html文档
const HTML_TEMP = `<html lang="en">
<head>
  <title>DOM parser</title>
</head>
<body>
  <div id="app" class="app-container">1234</div>
</body>
</html>`;

/**
 * @description: 设置回调函数，用于提交token
 * @param {function} cb 回调函数
 * @return {void}
 */
setEmitCb(token => {
  // console.log(stack);
  // console.log(token);
  if (!token.isClose) {
    const element = {
      type: "element",
      tagName: token.tagName,
      attributes: token.attributes,
      children: [],
    };
    stack[stack.length - 1]["children"].push(element);
    stack.push(element);
  } else {
    if (stack[stack.length - 1].tagName !== token.tagName) {
      console.error('mismatch tag!!!')
    }
    stack.pop()
  }
})

/**
 * 创建变量，用于存储当前状态
 */
let current = start

/**
 * 遍历html文档，逐个字符的解析
 */
for (let c of HTML_TEMP) {
  current = current(c);
}

/**
 * 打印解析结果
 */
console.log(JSON.stringify(stack, null, 2));
