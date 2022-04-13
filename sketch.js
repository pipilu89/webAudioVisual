let xyIncrementRangeValue = 0.1
let scl = 10
let cols, rows

let zoff = 0

let fr

let particles = []

let flowfield

let backgroundColourVariable = '#000'
let colorPicker;
let fileInput;

//default values
// let magRangeValue  //input field
// let redRangeValue  //input field
// let greenRangeValue  //input field
// let blueRangeValue //input field
// let alphaRangeValue  //input field
// let zoffIncrementRangeValue
// let maxSpeedRangeValue
// let strokeWeightDefault = 1
// let strokeWeightLink = 1

function defaultValues() {
  // magRangeValue = 1 //input field
  // redRangeValue = 0 //input field
  // greenRangeValue = 0 //input field
  // blueRangeValue = 0 //input field
  // alphaRangeValue = 5 //input field
  // zoffIncrementRangeValue = 0.0003
  // maxSpeedRangeValue = 4
}
defaultValues()

//sliders
// const redRangeDiv = document.getElementById('redValue')

// const greenRangeDiv = document.getElementById('greenValue')
// const blueRangeDiv = document.getElementById('blueValue')
// const maxSpeedRangeDiv = document.getElementById('maxSpeedValue')
// const alphaRangeDiv = document.getElementById('alphaValue')
// // const zoffIncrementRangeDiv = document.getElementById('zoffIncrementValue')

function setup() {
  // createCanvas(canvasW, canvasH);
  createCanvas(windowWidth, windowHeight);
  background(backgroundColourVariable)
  cols = floor(width / scl)
  rows = floor(height / scl)

  colorPicker = createColorPicker(backgroundColourVariable)
  colorPicker.id('colourPickerInput');
  colorPicker.parent('frameRateDiv');

  backgroundColourVariable = colorPicker.color()
  background(colorPicker.color())

  fileInput = createFileInput(handleFile);
  fileInput.parent('fileSelectInput');

  fr = createDiv('')
  fr.parent('frameRateDiv');

  flowfield = new Array(cols * rows)

  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle()
  }

  //INPUTS
  // const magRange = document.getElementById('magRange')
  // const magValueDiv = document.getElementById('magValue')
  // magValueDiv.innerText = `Mag: ${magRangeValue}`
  // magRange.addEventListener('input', function () {
  //   magRangeValue = (this.value * 1)
  //   magValueDiv.innerText = `Mag: ${magRangeValue}`
  // }, false);

  // //colours red green blue
  // const redRange = document.getElementById('redRange')
  // // console.log('redRange', redRange);
  // // const redRangeNewSlider = document.getElementById('RedSlider')
  // // console.log('redRangeNewSlider', redRangeNewSlider);
  // // console.log('redRangeNewSlider', redRangeNewSlider.value);
  // // redRangeNewSlider.value = 10
  // // console.log('redRangeNewSlider', redRangeNewSlider);
  // // const redRangeDiv = document.getElementById('redValue')
  // redRangeDiv.innerText = `Red: ${redRangeValue}`
  // redRange.addEventListener('input', function () {
  //   redRangeValue = (this.value * 1)
  //   redRangeDiv.innerText = `Red: ${redRangeValue}`
  // }, false);

  // const greenRange = document.getElementById('greenRange')

  // greenRangeDiv.innerText = `Green: ${greenRangeValue}`
  // greenRange.addEventListener('input', function () {
  //   greenRangeValue = (this.value * 1)
  //   greenRangeDiv.innerText = `Green: ${greenRangeValue}`
  // }, false);

  // const blueRange = document.getElementById('blueRange')

  // blueRangeDiv.innerText = `Blue: ${blueRangeValue}`
  // blueRange.addEventListener('input', function () {
  //   blueRangeValue = (this.value * 1)
  //   blueRangeDiv.innerText = `Blue: ${blueRangeValue}`
  // }, false);

  // //other
  // const alphaRange = document.getElementById('alphaRange')
  // const alphaRangeDiv = document.getElementById('alphaValue')
  // alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
  // alphaRange.addEventListener('input', function () {
  //   alphaRangeValue = (this.value * 1)
  //   alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
  // }, false);

  // const xyIncrementRange = document.getElementById('xyIncrementRange')
  // const xyIncrementRangeDiv = document.getElementById('xyIncrementValue')
  // xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
  // xyIncrementRange.addEventListener('input', function () {
  //   xyIncrementRangeValue = (this.value * 1)
  //   xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
  // }, false);

  // const zoffIncrementRange = document.getElementById('zoffIncrementRange')
  // const zoffIncrementRangeDiv = document.getElementById('zoffIncrementValue')
  // zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`
  // zoffIncrementRange.addEventListener('input', function () {
  //   zoffIncrementRangeValue = (this.value * 1)
  //   zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`
  // }, false);

  // const maxSpeedRange = document.getElementById('maxSpeedRange')

  // maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRangeValue}`
  // maxSpeedRange.addEventListener('input', function () {
  //   maxSpeedRangeValue = (this.value * 1)
  //   maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRangeValue}`
  // }, false);

  //buttons
  const clearBackgroundBtn = document.getElementById('clearBackground')
  clearBackgroundBtn.addEventListener('click', function () {
    background(colorPicker.color())
    console.log('clear background');

  }, false);

  const colourPickerInput = document.getElementById('colourPickerInput')
  colourPickerInput.addEventListener('input', function () {
    background(colorPicker.color())
    console.log('change background colour');
  }, false);
  const defaultValuesBtn = document.getElementById('defaultValuesBtn')
  defaultValuesBtn.addEventListener('click', function () {
    defaultValues()
    updateSliders()
    console.log('defaultValues');
  }, false);

  //update UI
  function updateSliders() {
    // magRange.value = magRangeValue
    // magValueDiv.innerText = `Mag: ${magRangeValue}`

    // redRange.value = redRangeValue
    // redRangeDiv.innerText = `red: ${redRangeValue}`
    // greenRange.value = greenRangeValue
    // greenRangeDiv.innerText = `green: ${greenRangeValue}`
    // blueRange.value = blueRangeValue
    // blueRangeDiv.innerText = `blue: ${blueRangeValue}`

    // alphaRange.value = alphaRangeValue
    // alphaRangeDiv.innerText = `alpha: ${alphaRangeValue}`
    // xyIncrementRange.value = xyIncrementRangeValue
    // xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`
    // zoffIncrementRange.value = zoffIncrementRangeValue
    // zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRangeValue}`

    // maxSpeedRange.value = maxSpeedRangeValue
    // maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRangeValue}`
  }
}




function draw() {
  // console.log('s', s.newValue);
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
    if (linked) {
      // zoff += zoffIncLink
      zoff += sliderArray[7].newValue
    }
    else {
      zoff += sliderArray[7].newValue
    }
  }

  if (linked) {
    //music
    // analyser.getByteFrequencyData(dataArray);
    // analyser.getByteTimeDomainData(dataArray);
    const xDiv = document.getElementById('x')
    const yDiv = document.getElementById('y')

    speed2 = map(dataArray[20], 0, 255, 1, 16)
    xDiv.innerText = speed2
    yDiv.innerText = dataArray[25]

    strokeWeightLink = map(dataArray[32], 0, 255, 1, 20)
    // zoffIncLink = map(dataArray[1], 0, 255, 0.0003, 0.001)

    //clear background if threshold
    if (dataArray[3] > 200) {
      background(colorPicker.color())
    }

    //auto update sliders when linked to music
    function updateSliders2() {
      // magRange.value = magRangeValue
      // magValueDiv.innerText = `Mag: ${magRangeValue}`

      // redRange.value = dataArray[60]
      const redRangeNewSlider = document.getElementById('RedSlider')
      redRangeNewSlider.value = dataArray[2]
      const redDiv = document.getElementById('RedDiv')
      redDiv.innerText = `red: ${dataArray[2]}`
      // console.log('redRangeNewSlider.value update', redRangeNewSlider.value);
      // redRangeDiv.innerText = `red: ${redRange.value}`
      // greenRange.value = dataArray[2]
      // greenRangeDiv.innerText = `green: ${greenRange.value}`
      // blueRange.value = dataArray[4]
      // blueRangeDiv.innerText = `blue: ${blueRange.value}`

      // // alphaRange.value = dataArray[5]
      // alphaRange.value = map(dataArray[50], 0, 255, 0.5, 50)
      // alphaRangeDiv.innerText = `alpha: ${alphaRange.value}`

      // xyIncrementRange.value = xyIncrementRangeValue
      // xyIncrementRangeDiv.innerText = `xyIncrement: ${xyIncrementRangeValue}`

      // zoffIncrementRange.value = zoffIncLink.toFixed(5)
      // zoffIncrementRangeDiv.innerText = `zoffIncrement: ${zoffIncrementRange.value}`

      // maxSpeedRange.value = speed2
      // maxSpeedRangeDiv.innerText = `maxSpeed: ${maxSpeedRange.value}`
    }
    // updateSliders2()
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
      // particles[i].update(sliderArray[8].newValue)
      particles[i].show(sliderArray[2].newValue, sliderArray[3].newValue, sliderArray[4].newValue, sliderArray[5].newValue, sliderArray[8].newValue, sliderArray[0].newValue)
      // particles[i].show(redRangeValue, greenRangeValue, blueRangeValue, alphaRangeValue, maxSpeedRangeValue, strokeWeightDefault)
    }


  }

  fr.html(`frame rate: ${floor(frameRate())}`)

  // fr.parent('controls');
  // fr.html(floor(frameRate()))
  // console.log('linked', linked);

  // let div = createDiv('').size(100, 100);
  // div.html('hi');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
function handleFile(file) {
  print(file);
  if (file.type === 'audio') {
    source.src = file.data;
    audio.load();
    audio.play();
    console.log('source.src', source.src);
    console.log('file.type =audio');
  } else {
    console.log('file.type NOT audio');
  }
}