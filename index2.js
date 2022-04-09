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
    setTimeout(logFreqData, 1000)

    // console.log('freq Data', dataArray);
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }

}, false);


//freq data function
function logFreqData() {
  analyser.getByteFrequencyData(dataArray)
  console.log('freq Data', dataArray);

}

// We also need to take into account what to do when the track finishes playing. Our HTMLMediaElement fires an ended event once it's finished playing, so we can listen for that and run code accordingly:
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

// modifying sound
const gainNode = audioContext.createGain();

// Now we have to update our audio graph from before, so the input is connected to the gain, then the gain node is connected to the destination:
track.connect(gainNode).connect(audioContext.destination);

gainNode.gain.value = 0

const volumeControl = document.querySelector('#volumeInput');

volumeControl.addEventListener('input', function () {
  gainNode.gain.value = this.value;
  console.log('gain: ', this.value);
}, false);

//mute
const mute = document.getElementById('mute')
mute.onclick = voiceMute
function voiceMute() {
  if (mute.id == "") {
    // connected your source into the output in addition to using the GainNode.
    gainNode.gain.setValueAtTime(-1, audioContext.currentTime);
    mute.id = "activated";
    mute.textContent = "Unmute";
  } else {
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    mute.id = "";
    mute.textContent = "Mute";
  }
}

//current time
const currentTime = document.getElementById('currentTime')
currentTime.innerText = audioContext.currentTime

const updateTimeBtn = document.getElementById('updateTime')
updateTimeBtn.addEventListener('click', () => {
  currentTime.innerText = audioContext.currentTime

})



//panner
// Let's use the constructor method of creating a node this time. When we do it this way, we have to pass in the context and any options that the particular node may take:
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

// We use the values from that input to adjust our panner values in the same way as we did before:
const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('change', function () {
  panner.pan.value = this.value;
  console.log('panner: ', this.value);
}, false);

// Let's adjust our audio graph again, to connect all the nodes together:
// track.connect(gainNode).connect(panner).connect(audioContext.destination);


//anayliser node
const analyser = audioContext.createAnalyser();
// analyser.fftSize = 2048;
analyser.fftSize = 512;

//get fftSize from slider
const fftSizeInput = document.getElementById('fftSize')
fftSizeInput.addEventListener('change', function () {
  let newfft = (2 ** this.value)
  console.log('newfft', newfft);
  analyser.fftSize = newfft;


  // bufferLength = analyser.frequencyBinCount;
  // dataArray = new Uint8Array(bufferLength);
  // analyser.getByteTimeDomainData(dataArray);
}, false);


let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
console.log('dataArray', dataArray);
console.log('bufferLength', bufferLength);
console.log('getByteFrequencyData', analyser.getByteFrequencyData(dataArray));
// console.log('getFloatFrequencyData', analyser.getFloatFrequencyData(bufferLength));

// Connect the source to be analysed
track.connect(analyser);


// // Get a canvas defined with ID "oscilloscope"
// var canvas = document.getElementById("oscilloscope");
// var canvasCtx = canvas.getContext("2d");






// draw an oscilloscope of the current audio source

function draw2() {

  requestAnimationFrame(draw2);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200, 200, 200)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0, 0, 0)";

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();

  const xDiv = document.getElementById('x').innerText = canvas.height
  const yDiv = document.getElementById('y').innerText = y

}


//new eg https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
analyser.fftSize = 256;
// var bufferLength = analyser.frequencyBinCount;
console.log('bufferLength', bufferLength);
// var dataArray = new Uint8Array(bufferLength);
const WIDTH = 800
const HEIGHT = bufferLength * 2

// canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
let count = 1
function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  // analyser.getByteTimeDomainData(dataArray);
  const xDiv = document.getElementById('x')
  const yDiv = document.getElementById('y')

  xDiv.innerText = dataArray[100]
  yDiv.innerText = dataArray[25]
  // for (var i = 0; i < bufferLength; i++) {

  //   // var v = dataArray[i];
  //   var v = dataArray.length;

  //   xDiv.innerText = bufferLength
  //   yDiv.innerText = v
  //   console.log('i: ', i, 'v:', v);
  // }

  // count++

};

draw();
