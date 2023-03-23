/* exported yakko, wakko, dot */

const yakko = {
  age: 14,
  name: 'Yakko',
  role: 'brother',
};

const wakko = {
  age: 11,
  name: 'Wakko',
  role: 'brother',
};

const dot = {
  age: 10,
  name: 'Dot',
  role: 'sister',
};

const warnerPrototype = {
  describe: function () {
    const description = this.name + ' is a ' + this.age + '-year-old Warner ' + this.role + '.';
    return description;
  }
}
const warnerCharacters = [yakko, wakko, dot]
warnerCharacters.forEach(obj => Object.setPrototypeOf(obj, warnerPrototype))