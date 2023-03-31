// update page header from '...' to 'Hello There' after 2 seconds

const $message = document.querySelector('.message')
setTimeout(() => {
  $message.textContent = 'Hello There'
}, 2000);