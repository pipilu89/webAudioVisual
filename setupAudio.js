// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);


// NOT NEEDED BECAUSE USE CONTROLS
// Now we can add the play and pause functionality.
// select our play button
// const playButton = document.getElementById('playBtn');

// playButton.addEventListener('click', function () {

//   // check if context is in suspended state (autoplay policy)
//   if (audioContext.state === 'suspended') {
//     audioContext.resume();
//   }

//   // play or pause track depending on state
//   if (this.dataset.playing === 'false') {
//     audioElement.play();
//     this.dataset.playing = 'true';

//     // console.log('freq Data', dataArray);
//   } else if (this.dataset.playing === 'true') {
//     audioElement.pause();
//     this.dataset.playing = 'false';
//   }

// }, false);

// We also need to take into account what to do when the track finishes playing. Our HTMLMediaElement fires an ended event once it's finished playing, so we can listen for that and run code accordingly:
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

//analyser node
const analyser = audioContext.createAnalyser();

// Connect the source to be analysed
track.connect(analyser);


// analyser.fftSize = 2048; //better for oscilloscope 
analyser.fftSize = 256;  //better for winamp spectrum
const bufferLength = analyser.frequencyBinCount;
console.log('bufferLength: ', bufferLength, ' fftSize:', analyser.fftSize, 'sampleRate: ', audioContext.sampleRate);
let dataArray = new Uint8Array(bufferLength);
// analyser.getByteTimeDomainData(dataArray);
// analyser.getFloatTimeDomainData(dataArray);
// analyser.getByteFrequencyData(dataArray);


//link / unlink music to draw
let linked = true

const linkedInfo = document.getElementById('linkedInfo');
const linkMusicBtn = document.getElementById('linkMusicBtn');
linkMusicBtn.addEventListener('click', function () {

  // link or unlink track depending on state
  if (this.dataset.linked === 'false') {
    this.dataset.linked = 'true';
    linkedInfo.innerText = 'true'
    linked = true

  } else if (this.dataset.linked === 'true') {

    this.dataset.linked = 'false';
    linkedInfo.innerText = 'false'
    linked = false
  }

}, false);

const audio = document.getElementById("audio1");


// https://stackoverflow.com/questions/54932711/display-and-play-audio-file-selected-in-input-javascript
function changeHandler({
  target
}) {
  // Make sure we have files to use
  if (!target.files.length) return;

  // Create a blob that we can use as an src for our audio element
  const urlObj = URL.createObjectURL(target.files[0]);

  // Create an audio element
  // const audio = document.createElement("audio");

  // Clean up the URL Object after we are done with it
  audio.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });

  // Append the audio element
  document.getElementById("audioDiv").appendChild(audio);

  // Allow us to control the audio
  audio.controls = "true";

  // Set the src and start loading the audio from the file
  audio.src = urlObj;
  audio.load();
  // audio.play();
}

document
  .getElementById("fileDialog")
  .addEventListener("change", changeHandler);


// MEDIA2
const selectMediaInput = document.querySelector("select");
selectMediaInput.onchange = function () {
  // audio.pause();
  console.log('this.value', this.value);
  audio.src = this.value;

  // source.src = this.value;

  audio.load();
  // audio.play();
}

function audioChangeHandler() {
  console.log('audioChangeHandler', this.value);
}
document
  .querySelector("audio")
  .addEventListener("click", audioChangeHandler);