function ExampleConstructor() {
}

console.log('ExampleConstructor.prototype:', ExampleConstructor.prototype)
console.log('typeof ExampleConstructor.prototype:', typeof ExampleConstructor.prototype)

const obj = new ExampleConstructor()

console.log('obj:', obj)
const objIsInstanceOfExampleConstructor = obj instanceof ExampleConstructor
console.log('obj is instance of ExampleConstructor:', objIsInstanceOfExampleConstructor)
