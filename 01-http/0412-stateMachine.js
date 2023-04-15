/**
 * @description 有限状态机 FSM finite state machine
 * @description 概念： 每一个状态是一个机器(由函数实现),有输入、输出的逻辑，以及状态的迁移
 * @date 2021-04-12
 * @author: sagit
 */

let tagToken; // 标签token

let attributeNameStr = ""; // 属性名
let attributeValueStr = ""; // 属性值

let emit; // 提交token

/**
 * 解析开始标签
 * @param {string} char 输入
 * @return 下一个状态
 */
function start(char) {
  // console.log(char, "start");
  if (char === "<") { // 开始标签
    tagToken = {
      tagName: "",
      attributes: {},
      isClose: false,
    };
    return tag;
  } else { // 否则递归解析文本
    return start;
  }
}

/**
 * 解析标签
 * @param {string} char 输入
 * @return 下一个状态
 */
function tag(char) {
  // console.log(char, "tag");
  if (char === "/") { // 结束标签
    tagToken.isClose = true;
    return closeTag;
  } else { // 解析标签内部信息
    return openTag(char); // reconsume 重用
  }
}

/**
 * 解析结束标签
 * @param {string} char 输入
 * @return 下一个状态
 */
function closeTag(char) {
  // console.log(char, "closeTag");
  if (char === ">") { // 结束标签
    emit(tagToken);
    return start;
  } else { // 添加标签名到标签token
    tagToken.tagName += char;
    return closeTag;
  }
}

/**
 * 解析标签内部信息
 * @param {string} char 输入
 * @return 下一个状态
 */
function openTag(char) {
  // console.log(char, "openTag");
  if (char === ">") { // 结束标签 提交当前标签token
    emit(tagToken);
    return start;
  } else if (char === " ") { // 判断标签内是否存在属性
    return beforeAttribute;
  } else { // 添加标签名到标签token
    tagToken.tagName += char;
    return openTag;
  }
}

/**
 * 判断标签内是否存在的属性
 * @param {string} char 输入
 * @return 下一个状态
 */
function beforeAttribute(char) {
  // console.log(char, "beforeAttribute");
  if (char === " ") { // 判断标签内是否存在属性
    return beforeAttribute;
  } else if (char === ">") { // 结束标签 提交当前标签token
    emit(tagToken);
    return start;
  } else { // 重置属性名和属性值
    attributeNameStr = attributeValueStr = "";
    return attributeName(char); // reconsume 重用
  }
}

/**
 * 判断属性名
 * @param {string} char 输入
 * @return 下一个状态
 */
function attributeName(char) {
  // console.log(char, "attributeName");
  if (char === "=") { // 根据=号判断属性值
    return attributeValue;
  } else { // 记录属性名
    attributeNameStr += char;
    return attributeName;
  }
}

/**
 * 判断属性值
 * @param {string} char 输入
 * @return 下一个状态
 */
function attributeValue(char) {
  // console.log(char, "attributeValue");
  if (char === '"') { // 判断双引号   e.g <div class="a" />
    return doubleQuoted;
  } else { // 如非双引号，则报错
    throw new Error("must double quoted");
  }
}

/**
 * 判断双引号
 * @param {string} char 输入
 * @return 下一个状态
 */
function doubleQuoted(char) {
  // console.log(char, "doubleQuoted");
  if (char === '"') {
    // 此时因在attributeValue内以判断过开头的双引号，这里的双引号为闭合，因此属性值已获取完毕，将属性名和属性值添加到标签token的attributes对象内
    tagToken.attributes[attributeNameStr] = attributeValueStr;
    return afterAttribute;
  } else { // 记录属性值
    attributeValueStr += char;
    return doubleQuoted;
  }
}

/**
 * 判断属性值后的状态
 * @param {string} char 输入
 * @return 下一个状态
 */
function afterAttribute(char) {
  // console.log(char, "afterAttribute");
  if (char === " ") { // 如果是空格，则继续判断属性
    return beforeAttribute;
  } else if (char === ">") { // 结束标签 提交当前标签token，并从头开始继续解析HTML文本
    emit(tagToken);
    return start;
  } else { // 如果不是空格也不是结束标签，则报错
    throw new Error("invalid Tag");
  }
}

/**
 *  
 * @param {any} newEmit
 */
function setEmitCb(newEmit) {
  emit = newEmit;
}

module.exports = {
  start,
  setEmitCb,
};
