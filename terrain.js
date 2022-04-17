// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

let cols, rows;
let scl = 20; //20
let w = 1100; //1400
let h = 2000; //1000
let xyinc = 0.15  //0.2
let flying = 0;

let terrain = [];

let heightOffset = 200
let widthOffset = 10
const fr = document.getElementById('frameRateDiv')
const infoDiv = document.getElementById('infoDiv')

function setup() {
  createCanvas(windowWidth - widthOffset, windowHeight - heightOffset, WEBGL);
  cols = w / scl;
  rows = h / scl;
  infoDiv.innerText = `cols:${cols}, rows:${rows}`
  // for (let x = 0; x < cols; x++) {
  //   terrain[x] = [];
  //   for (let y = 0; y < rows; y++) {
  //     terrain[x][y] = 0; //specify a default value for now
  //   }
  // }

  //[row][col]  [y][x]
  for (let y = 0; y < rows; y++) {
    terrain[y] = [];
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = 0; //specify a default value for now
    }
  }
}

// console.log(rowXY);
// let newRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let newRow = []
for (let i = 0; i < cols; i++) {
  newRow[i] = 0
}

function draw() {
  // frameRate(30)
  //get music data
  analyser.getByteFrequencyData(dataArray);


  for (let x = 0; x < cols; x++) {
    // terrain[0][x] = map(dataArray[x * 2], 0, 255, -100, 100);
    newRow[x] = map(dataArray[(x) * 2], 0, 255, -200, 200);
    // newRow[x] = random(100)

  }

  terrain.pop()
  terrain.unshift([...newRow])
  // console.log(terrain);

  // translate(0, 50, 100);
  rotateX(PI / 3);  //PI / 3
  // colorMode(HSB);
  background(dataArray[70], 10, 10);

  // background(255);
  // fill(200, 200, 200, 150); //(200, 200, 200, 150);
  // fill(50, dataArray[10], 50, 100); //(200, 200, 200, 150);
  fill(50, dataArray[30], 50, 150); //(200, 200, 200, 150);
  // stroke(20, dataArray[70])
  // strokeWeight(1)
  noStroke()
  translate(-w / 2, (-h / 2) + 50); //center?
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[y][x]);
      vertex(x * scl, (y + 1) * scl, terrain[y + 1][x]);
      // vertex(x * scl, y * scl, terrain[x][y]);
      // vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }





  fr.innerText = `frame rate: ${floor(frameRate())}`
}

// console.log('terrain', terrain);

// else {
//   flying -= 0.01; //0.1
//   let yoff = flying;
//   for (let y = 0; y < rows; y++) {
//     let xoff = 0;
//     for (let x = 0; x < cols; x++) {
//       terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
//       xoff += xyinc;
//     }
//     yoff += xyinc; //xyinc
//   }
// }


function windowResized() {
  resizeCanvas(windowWidth - widthOffset, windowHeight - heightOffset);
  background(colorPicker.color())
  // console.log('resized window');
}