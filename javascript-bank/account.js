/* exported Account */

class Account {
  constructor(number, holder) {
    this.number = number
    this.holder = holder
    this.transactions = []
  }

  deposit(amount) {
    // amount must be positive integer
    if (!(Number.isInteger(amount) && amount > 0)) return false
    const depositTransaction = new Transaction("deposit", amount)
    this.transactions.push(depositTransaction)
    return true
  }
  
  withdraw(amount) {
    // amount must be positive integer
    if (!(Number.isInteger(amount) && amount > 0)) return false
    const withdrawalTransaction = new Transaction("withdrawal", amount)
    this.transactions.push(withdrawalTransaction)
    return true
  }

  getBalance() {
    if (this.transactions.length === 0) return 0
    let total = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i]
      if (transaction.type === 'deposit') {
        total += transaction.amount
      } else if (transaction.type === 'withdrawal') {
        total -= transaction.amount
      }
    }
    return total
  }
}