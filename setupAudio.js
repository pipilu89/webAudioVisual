// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

// Now we can add the play and pause functionality.
// select our play button
const playButton = document.querySelector('button');

playButton.addEventListener('click', function () {

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // play or pause track depending on state
  if (this.dataset.playing === 'false') {
    audioElement.play();
    this.dataset.playing = 'true';

    // console.log('freq Data', dataArray);
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }

}, false);

// We also need to take into account what to do when the track finishes playing. Our HTMLMediaElement fires an ended event once it's finished playing, so we can listen for that and run code accordingly:
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

//analyser node
const analyser = audioContext.createAnalyser();

// Connect the source to be analysed
track.connect(analyser);


analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
// analyser.getByteTimeDomainData(dataArray);
// analyser.getFloatTimeDomainData(dataArray);
// analyser.getByteFrequencyData(dataArray);



function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  // analyser.getByteTimeDomainData(dataArray);
  const xDiv = document.getElementById('x')
  const yDiv = document.getElementById('y')

  xDiv.innerText = dataArray[1]
  yDiv.innerText = dataArray[25]


};

// draw();