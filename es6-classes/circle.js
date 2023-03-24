/* eslint-disable no-undef -- Shape is imported by .html */
/* exported Circle */

class Circle extends Shape {
  constructor(radius) {
    let area = radius * radius * Math.PI
    area = Number(area.toFixed(2)) // round to 2 decimal places
    let circumference = radius * 2 * Math.PI
    circumference = Number(circumference.toFixed(2))
    super(area, circumference)
    this.radius = radius
  }

  print() {
    return `${super.print()} and the radius is ${this.radius}`
  }
}

const myCircle = new Circle(30)
console.log(myCircle.print())