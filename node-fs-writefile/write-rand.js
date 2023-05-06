/*
  Within write-rand.js, use fs.writeFile with async and await 
  to write a random number to a new file named random.txt.
  Remember to handle errors.
*/

import writeToFile from './writeToFile.js';

const randomNumber = Math.floor(Math.random() * 1000000000);
writeToFile('random.txt', randomNumber)