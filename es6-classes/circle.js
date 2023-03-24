/* eslint-disable no-undef -- Shape is imported by .html */
/* exported Circle */

class Circle extends Shape {
  constructor(area, circumference, radius) {
    super(area, circumference)
    this.radius = radius
  }
  
  print() {
    return `${super.print()} and the radius is ${this.radius}`
  }
}

const myCircle = new Circle(10, 20, 30)
console.log(myCircle.print())