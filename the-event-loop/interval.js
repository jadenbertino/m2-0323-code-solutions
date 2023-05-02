let count = 3

const intervalID = setInterval(() => {
  if (count === 0) {
    clearInterval(intervalID)
    console.log('Blast off!')
    return
  }

  console.log(count)
  count--
}, 1000)