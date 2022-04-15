let xyIncrementRangeValue = 0.1
// let scl = 50 //default 10
let scl = sliderArray[9].newValue //default 10
console.log('scl', scl);

let particleQty = sliderArray[10].newValue
// let particleQty = 100
let cols, rows

let zoff = 0

let fr

let particles = []

let flowfield

let backgroundColourVariable = '#000'
let colorPicker;
let fileInput;
let widthOffset = 300
let heightOffset = 0


function setup() {
  console.log('start setup');
  // createCanvas(canvasW, canvasH);
  createCanvas(windowWidth - widthOffset, windowHeight - heightOffset);
  background(backgroundColourVariable)

  calculateColsRows()

  makeColourPicker()

  fr = createDiv('')
  fr.parent('frameRateDiv');



  setupParticlesArray()

}

function calculateColsRows() {
  scl = sliderArray[9].newValue
  cols = floor(width / scl)
  rows = floor(height / scl)
  flowfield = new Array(cols * rows)
  console.log('scl', scl);
}

function setupParticlesArray() {
  //reset particle for when setup is re-run
  particles = []
  particleQty = sliderArray[10].newValue
  console.log('particleQty', particleQty);

  for (let i = 0; i < particleQty; i++) {
    particles[i] = new Particle()
  }
}

function makeColourPicker() {
  colorPicker = createColorPicker(backgroundColourVariable)
  colorPicker.id('colourPickerInput');
  colorPicker.parent('frameRateDiv');

  backgroundColourVariable = colorPicker.color()
  background(colorPicker.color())

  const colourPickerInput = document.getElementById('colourPickerInput')
  colourPickerInput.addEventListener('input', function () {
    background(colorPicker.color())
    console.log('change background colour');
  }, false);
}

function draw() {
  // background(255)
  let speed2 //link for speed and music
  let zoffIncLink //link for zoff and music
  if (linked) {
    //music
    analyser.getByteFrequencyData(dataArray);
    // analyser.getByteTimeDomainData(dataArray);
    // zoffIncLink = map(dataArray[127], 0, 255, 0, 0.05)
  }
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle)
      // v.setMag(1)
      // v.setMag(magRangeValue)
      v.setMag(sliderArray[1].newValue)
      flowfield[index] = v
      xoff += sliderArray[6].newValue
      // stroke(0, 50)
      // strokeWeight(1)

      // push()
      // translate(x * scl, y * scl)
      // rotate(v.heading())
      // line(0, 0, scl, 0)
      // pop()
    }
    yoff += sliderArray[6].newValue
    zoff += sliderArray[7].newValue

    // if (linked) {
    //   // zoff += zoffIncLink
    //   zoff += sliderArray[7].newValue
    // }
    // else {
    //   zoff += sliderArray[7].newValue
    // }
  }

  if (linked) {
    // speed2 = map(dataArray[20], 0, 255, 1, 16)
    // strokeWeightLink = map(dataArray[32], 0, 255, 1, 20)
    // zoffIncLink = map(dataArray[1], 0, 255, 0.0003, 0.001)

    //clear background if threshold
    if (dataArray[3] > 250) {
      background(colorPicker.color())
    }

    //auto update sliders when linked to music
    for (let i = 0; i < sliderArray.length; i++) {
      sliderArray[i].updateLinkedUI()
    }
  }


  //particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield)
    particles[i].edges()
    if (linked) {
      // particles[i].update(speed2)
      particles[i].update(sliderArray[8].newValue)
      particles[i].show(sliderArray[2].newValue, sliderArray[3].newValue, sliderArray[4].newValue, sliderArray[5].newValue, sliderArray[8].newValue, sliderArray[0].newValue)
      // particles[i].show(dataArray[60], dataArray[2], dataArray[4], map(dataArray[50], 0, 255, 0.5, 50), speed2, strokeWeightLink)
      // console.log('sliderArray[2].value', sliderArray[2].value);
    } else {
      particles[i].update(sliderArray[8].newValue)
      // console.log('sliderArray[8].newValue', sliderArray[8].newValue);
      // particles[i].update(sliderArray[8].newValue)
      particles[i].show(sliderArray[2].newValue, sliderArray[3].newValue, sliderArray[4].newValue, sliderArray[5].newValue, sliderArray[8].newValue, sliderArray[0].newValue)
      // particles[i].show(redRangeValue, greenRangeValue, blueRangeValue, alphaRangeValue, maxSpeedRangeValue, strokeWeightDefault)
    }


  }

  fr.html(`frame rate: ${floor(frameRate())}`)
}

function windowResized() {
  resizeCanvas(windowWidth - widthOffset, windowHeight - heightOffset);
  background(colorPicker.color())
  // console.log('resized window');
}

// Clicking toggles fullscreen on and off.
const fullScreenBtn = document.getElementById('fullScreenBtn')
fullScreenBtn.addEventListener('click', () => {
  let fs = fullscreen();
  fullscreen(!fs);

})


//file input dialog function
// function handleFile(file) {
//   print(file);
//   if (file.type === 'audio') {
//     source.src = file.data;
//     audio.load();
//     audio.play();
//     console.log('source.src', source.src);
//     console.log('file.type =audio');
//   } else {
//     console.log('file.type NOT audio');
//   }
// }