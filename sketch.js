// let xoff1=0
// let xoff2 =1000
let canvasW = 800
let canvasH = 600
let xyIncrementRangeValue = 0.1
let scl = 10
let cols, rows

let zoff = 0

let fr

let particles = []

let flowfield

//default values
let magRangeValue  //input field
let redRangeValue  //input field
let greenRangeValue  //input field
let blueRangeValue //input field
let alphaRangeValue  //input field
let zoffIncrementRangeValue
let maxSpeedRangeValue

function defaultValues() {
  magRangeValue = 1 //input field
  redRangeValue = 0 //input field
  greenRangeValue = 0 //input field
  blueRangeValue = 0 //input field
  alphaRangeValue = 5 //input field
  zoffIncrementRangeValue = 0.0003
  maxSpeedRangeValue = 4
}
defaultValues()

//sliders
const redRangeDiv = document.getElementById('redValue')
const greenRangeDiv = document.getElementById('greenValue')
const blueRangeDiv = document.getElementById('blueValue')
const maxSpeedRangeDiv = document.getElementById('maxSpeedValue')

function setup() {
  createCanvas(canvasW, canvasH);
  cols = floor(width / scl)
  rows = floor(height / scl)
  fr = createP('')

  flowfield = new Array(cols * rows)

  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle()
  }
  background(255)

  //INPUTS
  const magRange = document.getElementById('magRange')
  const magValueDiv = document.getElementById('magValue')
  magValueDiv.innerText = `Mag: ${magRangeValue}`
  magRange.addEventListener('input', function () {
    magRangeValue = (this.value * 1)
    magValueDiv.innerText = `Mag: ${magRangeValue}`
  }, false);

  //colours red green blue
  const redRange = document.getElementById('redRange')
  // const redRangeDiv = document.getElementById('redValue')
  redRangeDiv.innerText = `Red: ${redRangeValue}`
  redRange.addEventListener('input', function () {
    redRangeValue = (this.value * 1)
    redRangeDiv.innerText = `Red: ${redRangeValue}`
  }, false);

  const greenRange = document.getElementById('greenRange')

  greenRangeDiv.innerText = `Green: ${greenRangeValue}`
  greenRange.addEventListener('input', function () {
    greenRangeValue = (this.value * 1)
    greenRangeDiv.innerText = `Green: ${greenRangeValue}`
  }, false);

  const blueRange = document.getElementById('blueRange')

  blueRangeDiv.innerText = `Blue: ${blueRangeValue}`
  blueRange.addEventListener('input', function () {
    blueRangeValue = (this.value * 1)
    blueRangeDiv.innerText = `Blue: ${blueRangeValue}`
  }, false);

  //other
  const alphaRange = document.getElementById('alphaRange')
  const alphaRangeDiv = document.getElementById('alphaValue')
  alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
  alphaRange.addEventListener('input', function () {
    alphaRangeValue = (this.value * 1)
    alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
  }, false);

  const xyIncrementRange = document.getElementById('xyIncrementRange')
  const xyIncrementRangeDiv = document.getElementById('xyIncrementValue')
  xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
  xyIncrementRange.addEventListener('input', function () {
    xyIncrementRangeValue = (this.value * 1)
    xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
  }, false);

  const zoffIncrementRange = document.getElementById('zoffIncrementRange')
  const zoffIncrementRangeDiv = document.getElementById('zoffIncrementValue')
  zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`
  zoffIncrementRange.addEventListener('input', function () {
    zoffIncrementRangeValue = (this.value * 1)
    zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`
  }, false);

  const maxSpeedRange = document.getElementById('maxSpeedRange')

  maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRangeValue}`
  maxSpeedRange.addEventListener('input', function () {
    maxSpeedRangeValue = (this.value * 1)
    maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRangeValue}`
  }, false);

  //buttons
  const clearBackgroundBtn = document.getElementById('clearBackground')
  clearBackgroundBtn.addEventListener('click', function () {
    background(255)
    console.log('clear background');
  }, false);
  const defaultValuesBtn = document.getElementById('defaultValuesBtn')
  defaultValuesBtn.addEventListener('click', function () {
    defaultValues()
    updateSliders()
    console.log('defaultValues');
  }, false);

  //update UI
  function updateSliders() {
    magRange.value = magRangeValue
    magValueDiv.innerText = `Mag: ${magRangeValue}`

    redRange.value = redRangeValue
    redRangeDiv.innerText = `red: ${redRangeValue}`
    greenRange.value = greenRangeValue
    greenRangeDiv.innerText = `green: ${greenRangeValue}`
    blueRange.value = blueRangeValue
    blueRangeDiv.innerText = `blue: ${blueRangeValue}`

    alphaRange.value = alphaRangeValue
    alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
    xyIncrementRange.value = xyIncrementRangeValue
    xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
    zoffIncrementRange.value = zoffIncrementRangeValue
    zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`

    maxSpeedRange.value = maxSpeedRangeValue
    maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRangeValue}`
  }
}




function draw() {
  // background(255)
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle)
      // v.setMag(1)
      v.setMag(magRangeValue)
      flowfield[index] = v
      xoff += xyIncrementRangeValue
      // stroke(0, 50)
      // strokeWeight(1)

      // push()
      // translate(x * scl, y * scl)
      // rotate(v.heading())
      // line(0, 0, scl, 0)
      // pop()


    }
    yoff += xyIncrementRangeValue
    zoff += zoffIncrementRangeValue
  }
  let speed2 //link for speed and music
  if (linked) {
    //music
    analyser.getByteFrequencyData(dataArray);
    // analyser.getByteTimeDomainData(dataArray);
    const xDiv = document.getElementById('x')
    const yDiv = document.getElementById('y')
    speed2 = map(dataArray[100], 0, 255, 0, 5)
    xDiv.innerText = speed2
    yDiv.innerText = dataArray[25]

    //auto update sliders when linked to music
    function updateSliders2() {
      // magRange.value = magRangeValue
      // magValueDiv.innerText = `Mag: ${magRangeValue}`

      redRange.value = dataArray[100]
      redRangeDiv.innerText = `red: ${redRange.value}`
      greenRange.value = dataArray[200]
      greenRangeDiv.innerText = `green: ${greenRange.value}`
      blueRange.value = dataArray[20]
      blueRangeDiv.innerText = `blue: ${blueRange.value}`

      // alphaRange.value = alphaRangeValue
      // alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
      // xyIncrementRange.value = xyIncrementRangeValue
      // xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
      // zoffIncrementRange.value = zoffIncrementRangeValue
      // zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`

      maxSpeedRange.value = speed2
      maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRange.value}`
    }
    updateSliders2()
  }


  //particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield)
    particles[i].edges()
    if (linked) {
      particles[i].update(speed2)
      particles[i].show(dataArray[150], dataArray[200], dataArray[50], alphaRangeValue, speed2)
    } else {
      particles[i].update(maxSpeedRangeValue)
      particles[i].show(redRangeValue, greenRangeValue, blueRangeValue, alphaRangeValue, maxSpeedRangeValue)
    }


  }

  fr.html(floor(frameRate()))

  // console.log('linked', linked);
}

