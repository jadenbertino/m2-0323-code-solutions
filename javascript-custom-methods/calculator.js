/* exported calculator */

const calculator = {
  add: function(x, y) {
    return x + y
  },
  subtract: function(x, y) {
    return x - y
  },
  add: function(x, y) {
    return x +y
  },
  multiply: function(x, y) {
    return x * y
  },
  divide: function(x, y) {
    return x / y
  },
  square: function(x) {
    return x * x
  },
  sumAll: function(nums) {
    return nums.reduce((a, b) => a + b)
  },
  getAverage: function(nums) {
    return nums.reduce((a, b) => a + b) / nums.length
  },
}