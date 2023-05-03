import takeAChance from './take-a-chance.js';

takeAChance('Jaden')
  .then((message) => {
    console.log(message)
  }).catch((err) => {
    console.log(err.message)
  })