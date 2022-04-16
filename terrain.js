// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

let cols, rows;
let scl = 20; //20
let w = 800; //1400
let h = 800; //1000
let xyinc = 0.15  //0.2
let flying = 0;

let terrain = [];

const fr = document.getElementById('frameRateDiv')

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }

}

function draw() {

  flying -= 0.05; //0.1
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += xyinc;
    }
    yoff += xyinc;
  }


  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150); //(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  fr.innerText = `frame rate: ${floor(frameRate())}`
}