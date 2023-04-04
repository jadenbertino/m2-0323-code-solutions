function getPokemonData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}

getPokemonData('cubone');

/*
  new XMLHttpRequest() to create a new XHR object.
  xhr.open() to set the request method and URL.
  xhr.responseType to automatically parse the JSON response body into JavaScript objects.
  xhr.addEventListener() to execute a function when the response is eventually loaded.
  xhr.send() to actually send the request to the server at the URL specified in xhr.open().
  xhr.status to read the HTTP status code of the response message
  xhr.response to get the body of the HTTP response once it has been converted from a JSON string to JavaScript objects.
*/