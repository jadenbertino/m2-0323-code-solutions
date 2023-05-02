import add from './add.js'
import divide from './divide.js'
import multiply from './multiply.js'
import subtract from './subtract.js'

const calculator = {
  plus: (num1, num2) => add(num1, num2),
  minus: (num1, num2) => subtract(num1, num2),
  times: (num1, num2) => multiply(num1, num2),
  over: (num1, num2) => divide(num1, num2),
}

const [, , num1, operand, num2] = process.argv

const result = calculator[operand](Number(num1), Number(num2))

console.log('result:', result)