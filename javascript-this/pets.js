/* exported doggo, kitteh */

/**
 * HTMLMediaElements (such as <audio>) are described in detail on MDN.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 */

function makeNoise() {
  // sets the time to 0 (start of the file) then plays the sound
  // makeNoise function is nested within an object that has a sound property
  this.sound.currentTime = 0;
  this.sound.play();
}

const doggo = {
  // html has an element like so:
  // <audio id="bork" src="sounds/bork.mp3" hidden="hidden"></audio>
  sound: document.querySelector('audio#bork'),
  speak: makeNoise,
};

const kitteh = {
  sound: document.querySelector('audio#mrow'),
  speak: makeNoise,
};
