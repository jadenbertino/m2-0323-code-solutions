/*
  Within note-to-self.js, use fs.writeFile with async and await and process.argv 
  to accept input from the user to write to a new file named note.txt. 
  (On the command line, remember to use quotes around the note.) 
  Remember to handle errors.
*/

import writeToFile from './writeToFile.js';

const notes = process.argv.slice(2);
const formattedNotes = notes.join('\n');
writeToFile('note.txt', formattedNotes);