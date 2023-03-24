/* exported Shape */

class Shape {
  constructor(area, circumference) {
    this.area = area
    this.circumference = circumference
  }

  print() {
    return `The area is ${this.area} and the circumference is ${this.circumference}`
  }
}

const myShape = new Shape(10, 20)
console.log(myShape.print())