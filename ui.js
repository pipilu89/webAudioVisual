let sliderArray = []
let sliderObjArray = [
  {
    id: 'StrokeWeight',
    min: 0,
    max: 30,
    value: 1,
    step: 0.1,
    link: 50,    //dataArray[x]
  },
  {
    id: 'Magnitude',
    min: 0,
    max: 10,
    value: 1,
    step: 0.1,
    link: 10,    //dataArray[x]
  },
  {
    id: 'Red',
    min: 0,
    max: 255,
    value: 0,
    step: 1,
    link: 2,    //dataArray[x]

  },
  {
    id: 'Green',
    min: 0,
    max: 255,
    value: 0,
    step: 1,
    link: 20,    //dataArray[x]
  },
  {
    id: 'Blue',
    min: 0,
    max: 255,
    value: 0,
    step: 1,
    link: 60,    //dataArray[x]
  },
  {
    id: 'Alpha',
    min: 0,
    max: 50,
    value: 5,
    step: 1,
    link: 2,    //dataArray[x]
  },
  {
    id: 'xyIncrement',
    // min: 0,
    min: 0.1,
    // max: 1,
    max: 0.5,
    value: 0.1,
    step: 0.001,
    link: 80
    // ,
    // gradient: 1
  },
  {
    id: 'zoffIncrement',
    // min: 0,
    min: 0.0001,
    // max: 2,
    max: 0.0005,
    value: 0.0003,
    step: 0.0001,
    link: 80
  },
  {
    id: 'MaxSpeed',
    min: 0,
    max: 20,
    value: 4,
    step: 0.1,
    link: 70,    //dataArray[x]
  },
  {
    id: 'scale',
    min: 10,
    max: 1000,
    value: 10,
    step: 10,
    // link: 70,    //dataArray[x]
  },
  {
    id: 'particles',
    min: 0,
    max: 2000,
    value: 500,
    step: 10,
    particles: 1 //flag linking particle function
  }
]

class Slider {
  constructor(id, min, max, value, step, link) {
    this.id = id;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;
    this.link = link;

  }

  render() {
    this.newValue = this.value
    return `<div><div id="${this.id}Div">${this.id}:${this.newValue}</div>
    <input type="range" id="${this.id}Slider" min="${this.min}" max="${this.max}" value="${this.value}" step="${this.step}"></div>`
  }

  eventListen() {
    if (this.id == 'particles') {
      /* Event listener */
      document.getElementById(`${this.id}Slider`).addEventListener("input", (e) => {
        this.newValue = (e.target.value * 1)
        // console.log(this.newValue, typeof (this.newValue));
        document.getElementById(`${this.id}Div`).innerText = `${this.id}:${this.newValue}`
        setupParticlesArray()
      }, false);
    } else if (this.id == 'scale') {
      /* Event listener */
      document.getElementById(`${this.id}Slider`).addEventListener("input", (e) => {
        this.newValue = (e.target.value * 1)
        // console.log(this.newValue, typeof (this.newValue));
        document.getElementById(`${this.id}Div`).innerText = `${this.id}:${this.newValue}`
        calculateColsRows()
      }, false);
    }
    else {
      /* Event listener */
      document.getElementById(`${this.id}Slider`).addEventListener("input", (e) => {
        this.newValue = (e.target.value * 1)
        // console.log(this.newValue, typeof (this.newValue));
        document.getElementById(`${this.id}Div`).innerText = `${this.id}:${this.newValue}`
      }, false);
    }
  }

  //update slider position and text value when linked to music data array
  updateLinkedUI() {
    if (this.link) {
      this.newValue = map(dataArray[this.link], 0, 255, this.min, this.max)
      document.getElementById(`${this.id}Slider`).value = this.newValue
      document.getElementById(`${this.id}Div`).innerText = `${this.id}: ${this.newValue.toFixed(5)}`
    }
    // if (this.gradient) {
    //   this.newValue = 1
    //   document.getElementById(`${this.id}Slider`).value = this.newValue
    //   document.getElementById(`${this.id}Div`).innerText = `${this.id}: ${this.newValue}`
    // }


  }

  //default values
  defaultValues() {
    this.newValue = this.value
    document.getElementById(`${this.id}Slider`).value = this.value
    document.getElementById(`${this.id}Div`).innerText = `${this.id}: ${this.value}`
  }
}

// create sliders from array
for (let i = 0; i < sliderObjArray.length; i++) {

  sliderArray[i] = new Slider(sliderObjArray[i].id, sliderObjArray[i].min, sliderObjArray[i].max, sliderObjArray[i].value, sliderObjArray[i].step, sliderObjArray[i].link)
  document.getElementById('sliderDiv').insertAdjacentHTML('beforeend', sliderArray[i].render())
  sliderArray[i].eventListen()
}

//buttons
const clearBackgroundBtn = document.getElementById('clearBackground')
clearBackgroundBtn.addEventListener('click', function () {
  background(colorPicker.color())
  console.log('clear background');

}, false);



const defaultValuesBtn = document.getElementById('defaultValuesBtn')
defaultValuesBtn.addEventListener('click', function () {
  for (let i = 0; i < sliderArray.length; i++) {
    sliderArray[i].defaultValues()
  }
  console.log('defaultValues');
}, false);

const resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click', function () {
  setupParticlesArray()
}, false);

const setupBtn = document.getElementById('setupBtn')
setupBtn.addEventListener('click', function () {
  setup()
  // draw()
}, false);

const sclBtn = document.getElementById('sclBtn')
sclBtn.addEventListener('click', function () {
  calculateColsRows()
  console.log('calculateColsRows');
}, false);