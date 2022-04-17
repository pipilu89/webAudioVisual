// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

let cols, rows;
let scl = 20; //20
let w = sliderArray[1].newValue; //1100
let h = sliderArray[0].newValue; //2000
let xyinc = 0.15  //0.2
let flying = 0;

let terrain = [];
let newRow = []

let heightOffset = 20
let widthOffset = 300
const fr = document.getElementById('frameRateDiv')
const infoDiv = document.getElementById('infoDiv')
let strokeStatus = false
let upDownTranslate
let zTranslate
// let img

// function preload() {
//   img = loadImage('assets/grass.png');
// }

function setup() {
  console.log('setup');
  createCanvas(windowWidth - widthOffset, windowHeight - heightOffset, WEBGL);
  h = sliderArray[0].newValue
  w = sliderArray[1].newValue
  cols = w / scl;
  rows = h / scl;
  infoDiv.innerText = `cols:${cols}, rows:${rows}`

  upDownTranslate = sliderArray[2].newValue
  zTranslate = sliderArray[4].newValue
  angleMode(DEGREES); // Change the mode to DEGREES
  rotateXAngle = sliderArray[3].newValue

  //[row][col]  [y][x]
  for (let y = 0; y < rows; y++) {
    terrain[y] = [];
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = 0; //specify a default value for now
    }
  }
  for (let i = 0; i < cols; i++) {
    newRow[i] = 0
  }


}
const strokeBtn = document.getElementById('strokeBtn');
strokeBtn.addEventListener('click', function () {
  // stroke depending on state
  if (this.dataset.stroke === 'false') {
    this.dataset.stroke = 'true';
    // strokeInfo.innerText = 'true'
    strokeStatus = true
  } else if (this.dataset.stroke === 'true') {
    this.dataset.stroke = 'false';
    // strokeInfo.innerText = 'false'
    strokeStatus = false
  }
  console.log('stroke', strokeStatus);
  setup()
}, false);

function draw() {
  // frameRate(30)


  if (linked) {
    //get music data
    analyser.getByteFrequencyData(dataArray);

    // newRow = [0, dataArray[0], dataArray[1], dataArray[2], dataArray[3], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
    for (let x = 0; x < cols; x++) {
      // newRow[x] = map(dataArray[(x) * 2], 0, 255, -200, 200);
      newRow[x] = dataArray[(x) * 2];
    }
    terrain.pop()
    terrain.unshift([...newRow])

    // background(dataArray[70], dataArray[70], dataArray[70]);
    background(0);
    // fill(50, dataArray[30], 50, 150); //(200, 200, 200, 150);
    fill(50, 200, 50, 150); //(200, 200, 200, 150);
  }
  else {
    flying -= 0.1; //0.1
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        terrain[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
        xoff += xyinc;
      }
      yoff += xyinc; //xyinc
    }

    background(0);
    fill(50, 200, 50, 150); //(200, 200, 200, 150);
  }

  // rotateX(PI / 3);  //PI / 3
  rotateX(rotateXAngle);  //PI / 3
  // translate(0, 50, 100);
  // colorMode(HSB);


  // stroke(20, dataArray[70])
  // strokeWeight(1)
  if (!strokeStatus) {
    noStroke()
  }

  translate(-w / 2, (-h / 2) - upDownTranslate, zTranslate); //center?

  // texture(img);
  // textureWrap(MIRROR)
  // textureMode(NORMAL);
  for (let y = 0; y < rows - 1; y++) {

    fill(y, 30 + y, 30 + y, 255 - (y * 7))
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      // fill(30 + x, x, x, 250 - (x * 5))
      vertex(x * scl, y * scl, terrain[y][x]);
      vertex(x * scl, (y + 1) * scl, terrain[y + 1][x]);
    }
    endShape();
  }

  fr.innerText = `frame rate: ${floor(frameRate())}`
}

function windowResized() {
  resizeCanvas(windowWidth - widthOffset, windowHeight - heightOffset);
  // background(colorPicker.color())
  // console.log('resized window');
}

