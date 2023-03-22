/* exported student */
const student = {
  firstName: "Jaden",
  lastName: "Bertino",
  subject: "Music",
  getFullName: function() {
    return this.firstName + ' ' + this.lastName
  },
  getIntroduction: function() {
    return `Hello, my name is ${this.getFullName()} and I am studying ${this.subject}.`
  }
}