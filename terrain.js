// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

let cols, rows;
let scl = 20; //20
let w = 1100; //1400
let h = 2000; //1000
let xyinc = 0.15  //0.2
let flying = 0;

let terrain = [];
let newRow = []

let heightOffset = 20
let widthOffset = 300
const fr = document.getElementById('frameRateDiv')
const infoDiv = document.getElementById('infoDiv')
let stroke = false

function setup() {
  createCanvas(windowWidth - widthOffset, windowHeight - heightOffset, WEBGL);
  cols = w / scl;
  rows = h / scl;
  infoDiv.innerText = `cols:${cols}, rows:${rows}`

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
    stroke = true
  } else if (this.dataset.stroke === 'true') {
    this.dataset.stroke = 'false';
    // strokeInfo.innerText = 'false'
    stroke = false
  }
  console.log('stroke', stroke);
  setup()
}, false);

function draw() {
  // frameRate(30)

  if (linked) {
    //get music data
    analyser.getByteFrequencyData(dataArray);

    for (let x = 0; x < cols; x++) {
      // newRow[x] = map(dataArray[(x) * 2], 0, 255, -200, 200);
      newRow[x] = dataArray[(x) * 2];
    }
    terrain.pop()
    terrain.unshift([...newRow])

    background(dataArray[70], 10, 10);
    fill(50, dataArray[30], 50, 150); //(200, 200, 200, 150);
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

  // translate(0, 50, 100);
  rotateX(PI / 3);  //PI / 3
  // colorMode(HSB);

  // stroke(20, dataArray[70])
  // strokeWeight(1)
  if (!stroke) {
    noStroke()
  }

  translate(-w / 2, (-h / 2) + 50); //center?
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
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

