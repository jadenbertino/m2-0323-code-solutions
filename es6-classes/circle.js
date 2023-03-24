/* eslint-disable no-undef -- Shape is imported by .html */
/* exported Circle */

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }

  print() {
    return `${super.print()} and the radius is ${this.radius}`
  }
}

const myCircle = new Circle(30)
console.log(myCircle.print())