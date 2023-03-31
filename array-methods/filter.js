const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const names = [
  'Ada',
  'Hedy',
  'Jean',
  'Grace',
  'Evelyn',
  'Joan',
  'Elizabeth',
  'Janese',
  'Donna',
];

console.log('Even Numbers:')
console.log(numbers.filter(n => n % 2 === 0))

console.log(`Names that do NOT include 'D' or 'd'`)
console.log(names.filter(name => !name.includes('d') && !name.includes('D')))