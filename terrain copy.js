// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

let cols, rows;
let scl = 20; //20
let w = 400; //1400
let h = 800; //1000
let xyinc = 0.15  //0.2
let flying = 0;

let terrain = [];

const fr = document.getElementById('frameRateDiv')
const infoDiv = document.getElementById('infoDiv')

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  infoDiv.innerText = `cols:${cols}, rows:${rows}`
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

let testDataArray = [100, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
function draw() {


  // infoDiv.innerText = `dataArray: ${dataArray[1]}, musicData: ${musicData}`

  frameRate(30)
  if (linked) {
    //get music data
    analyser.getByteFrequencyData(dataArray);
    // analyser.getByteTimeDomainData(dataArray)
    // let musicData = map(dataArray[1], 0, 255, 0, 0.3)

    for (let y = 0; y < rows; y++) {

      // analyser.getByteTimeDomainData(dataArray)

      for (let x = 0; x < cols; x++) {

        // terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);

        // infoDiv.innerText = terrain[x][y];
        // musicData = map(dataArray[1], 0, 255, 0, 1)
        terrain[x][y] = map(dataArray[x * 2], 0, 255, -100, 100);
        // let musicData = map(dataArray[x * 3], 0, 255, -100, 100);
        // terrain[x][y] = musicData

        // terrain[x][y] = testDataArray[x]

      }

    }

  } else {
    flying -= 0.01; //0.1
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
        xoff += xyinc;
      }
      yoff += xyinc; //xyinc
    }
  }



  background(0);
  // translate(0, 50);
  rotateX(PI / 2.5);  //PI / 3
  // fill(200, 200, 200, 150); //(200, 200, 200, 150);
  fill(dataArray[50], 50, dataArray[50], 150); //(200, 200, 200, 150);
  translate(-w / 2, -h / 2); //center?
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

console.log('terrain', terrain);