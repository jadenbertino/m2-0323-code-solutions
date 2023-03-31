const $countdown = document.querySelector('.countdown-display')

let countdownNumber = 4;
const countdownID = setInterval(() => {
  // update countdown message
  $countdown.textContent = countdownNumber || '~Earth Beeeelooowww Us~'

  // countdown completes at 0
  if (!countdownNumber) clearInterval(countdownID)

  countdownNumber -= 1
}, 1000)