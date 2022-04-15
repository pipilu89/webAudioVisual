const audioContext = new AudioContext();

// get the audio element
const audioElement = document.getElementById('audio1');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

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



// Allow us to control the audio
audioElement.controls = "true";

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
  audioElement.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });

  // Append the audio element
  // document.getElementById("audioDiv").appendChild(audio);

  // Allow us to control the audio
  // audio.controls = "true";

  // Set the src and start loading the audio from the file
  audioElement.src = urlObj;

  // needed for google: https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  audioContext.resume();

  // audioElement.load();
  audioElement.play();
}

document
  .getElementById("fileDialog")
  .addEventListener("change", changeHandler);


// MEDIA2
const selectMediaInput = document.querySelector("select");
selectMediaInput.onchange = function () {
  // audio.pause();
  console.log('this.value', this.value);
  audioElement.src = this.value;

  // source.src = this.value;
  audioContext.resume();
  audioElement.load();
  audioElement.play();
}


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