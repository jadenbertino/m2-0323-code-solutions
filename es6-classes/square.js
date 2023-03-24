/* eslint-disable no-undef -- Shape is imported by .html */
/* exported Square */

class Square extends Shape {
  constructor(width) {
    super()
    this.width = width
  }

  print() {
    return `${super.print()} and it's width is ${this.width}`
  }
}

const mySquare = new Square(50)
console.log(mySquare.print())
