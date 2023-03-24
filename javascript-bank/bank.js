/* exported Bank */

class Bank {
  constructor() {
    this.nextAccountNumber = 1
    this.accounts = []
  }

  openAccount(holder, balance) {
    // amount must be positive integer
    if (!(Number.isInteger(balance) && balance > 0) || typeof holder !== 'string') return null
    const newAccount = new Account(this.nextAccountNumber, holder)
    newAccount.deposit(balance)
    this.accounts.push(newAccount)
    this.nextAccountNumber++
    return newAccount.number
  }

  getAccount(number) {
    return this.accounts.find(acc => acc.number === number) || null
  }

  getTotalAssets() {
    if (this.accounts.length === 0) return 0
    // each account has 1 transaction minimum since it takes a deposit to open up an account
    return this.accounts.reduce((accumulator, account) => {
      return accumulator + account.getBalance()
    }, 0)
  }
}