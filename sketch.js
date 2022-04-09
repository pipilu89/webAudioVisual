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

let magRangeValue = 1 //input field
let redRangeValue = 0 //input field
let greenRangeValue = 0 //input field
let blueRangeValue = 0 //input field
let alphaRangeValue = 5 //input field
let zoffIncrementRangeValue = 0.0003

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

  const magRange = document.getElementById('magRange')
  magRange.addEventListener('input', function () {
    magRangeValue = (this.value * 1)
    console.log('mag: ', magRangeValue);
  }, false);
  const redRange = document.getElementById('redRange')
  redRange.addEventListener('input', function () {
    redRangeValue = (this.value * 1)
    console.log('red: ', redRangeValue);
  }, false);
  const greenRange = document.getElementById('greenRange')
  greenRange.addEventListener('input', function () {
    greenRangeValue = (this.value * 1)
    console.log('green: ', greenRangeValue);
  }, false);
  const blueRange = document.getElementById('blueRange')
  blueRange.addEventListener('input', function () {
    blueRangeValue = (this.value * 1)
    console.log('blue: ', blueRangeValue);
  }, false);
  const alphaRange = document.getElementById('alphaRange')
  alphaRange.addEventListener('input', function () {
    alphaRangeValue = (this.value * 1)
    console.log('alpha: ', alphaRangeValue);
  }, false);
  const xyIncrementRange = document.getElementById('xyIncrementRange')
  xyIncrementRange.addEventListener('input', function () {
    xyIncrementRangeValue = (this.value * 1)
    console.log('xyIncrement: ', xyIncrementRangeValue);
  }, false);
  const zoffIncrementRange = document.getElementById('zoffIncrementRange')
  zoffIncrementRange.addEventListener('input', function () {
    zoffIncrementRangeValue = (this.value * 1)
    console.log('zoffIncrement: ', zoffIncrementRangeValue);
  }, false);
  const clearBackgroundBtn = document.getElementById('clearBackground')
  clearBackgroundBtn.addEventListener('click', function () {
    background(255)
    console.log('clear background');
  }, false);
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

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield)
    particles[i].update()
    particles[i].edges()
    particles[i].show(redRangeValue, greenRangeValue, blueRangeValue, alphaRangeValue)


  }

  fr.html(floor(frameRate()))
}

