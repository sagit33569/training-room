/**
 * 运算符 优先级由高到低
 * ==================
 * ()
 * new call []
 * ++ --
 * / * + - %
 * **
 * ! & | >> << >>> ^
 * && || !
 * ?
 */

/**
 * Literal 语法
 * =============
 * Object
 * undefined null
 * String Number Boolean
 * Bigint Symbol
 * 
 * 'abc'
 * 123   1e9   0b 0x 0o
 * true false
 * null
 * [] {} /^[a-z]$/ig
 * Variable
 */

/**
 * statement 语句
 * ============
 * await break case catch class const continue debugger
 * default delete do else export extends finally for 
 * function if import in instanceof new
 * return super switch this throw try typeof 
 * var void while with yield
 */

/**
 * Production 产生式
 * <NumericLiteral> ::= /^(-{0,1}[1-9]{1}[0-9]{0,}|0\.[0-9]{0,})$/
 * <NullLiteral> ::= /^null$/
 * <BooleanLiteral> ::= /^(?:true|false)$/
 * <StringLiteral> ::= /^(?:\"([^\r\n\"]|\\.){0,}\")|(?:\'([^\r\n\']|\\.){0,}\')$/
 * <Identifier> ::= /^[_$a-zA-Z][_$a-zA-Z0-9\u200C\u200D]{0,}$/
 * 
 * <Literal> ::= <NumericLiteral> | <NullLiteral> | <BooleanLiteral> | <StringLiteral>
 * <Primary> ::= "(" <Expression> ")" | <Literal> | <Variable>
 * <Expression> ::= 
 */