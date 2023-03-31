const values = [10, 1, 22, 23, 41, 5, 18, 7, 80, 9];

console.log('FORWARDS')
values.forEach(num => console.log(num))

console.log('BACKWARDS')
values.forEach((_, i) => console.log(values[values.length - 1 - i]))