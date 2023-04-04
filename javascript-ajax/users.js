const $userList = document.querySelector('#user-list');

function loadUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    console.log('Status:', xhr.status)
    console.log('Response:', xhr.response)
    xhr.response.forEach(user => {
      const newUser = document.createElement('li')
      newUser.textContent = user.name
      $userList.appendChild(newUser)
    })
  })
  xhr.send()
}

loadUsers()

/*
  new XMLHttpRequest() to create a new XHR object.
  xhr.open() to set the request method and URL.
  xhr.responseType to automatically parse the JSON response body into JavaScript objects.
  xhr.addEventListener() to execute a function when the response is eventually loaded.
  xhr.send() to actually send the request to the server at the URL specified in xhr.open().
  xhr.status to read the HTTP status code of the response message
  xhr.response to get the body of the HTTP response once it has been converted from a JSON string to JavaScript objects.
*/