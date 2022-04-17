let sliderArray = []
let sliderObjArray = [
  {
    id: 'rows',
    min: 0,
    max: 3000,
    value: 860,
    value2: 750,
    step: 10,

  },
  {
    id: 'cols',
    min: 0,
    max: 3000,
    value: 1100,
    value2: 1100,
    step: 10,

  },
  {
    id: 'upDownTranslate',
    min: -500,
    max: 3000,
    value: 0,
    value2: -240,
    step: 1,

  },
  {
    id: 'rotateXAngle',
    min: 0,
    max: 360,
    value: 60, //degrees
    value2: 103, //degrees
    step: 1,

  },
  {
    id: 'zTranslate',
    min: -3000,
    max: 3000,
    value: 0,
    value2: -175,
    step: 1,

  },
]

class Slider {
  constructor(id, min, max, value, step, link, value2) {
    this.id = id;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;
    this.link = link;
    this.value2 = value2;

  }

  render() {
    this.newValue = this.value
    return `<div><div id="${this.id}Div">${this.id}:${this.newValue}</div>
    <input type="range" id="${this.id}Slider" min="${this.min}" max="${this.max}" value="${this.value}" step="${this.step}"></div>`
  }

  eventListen() {
    if (this.id == 'rows' || 'cols' || 'upDownTranslate') {
      /* Event listener */
      document.getElementById(`${this.id}Slider`).addEventListener("input", (e) => {
        this.newValue = (e.target.value * 1)
        // console.log(this.newValue, typeof (this.newValue));
        document.getElementById(`${this.id}Div`).innerText = `${this.id}:${this.newValue}`
        setup()
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
  }

  //default values
  defaultValues() {
    this.newValue = this.value
    document.getElementById(`${this.id}Slider`).value = this.value
    document.getElementById(`${this.id}Div`).innerText = `${this.id}: ${this.value}`

  }
  //preset2
  preset() {
    this.newValue = this.value2
    document.getElementById(`${this.id}Slider`).value = this.newValue
    document.getElementById(`${this.id}Div`).innerText = `${this.id}: ${this.newValue}`
    console.log(`${this.id}:${this.value2}`);
  }
}

// create sliders from array
for (let i = 0; i < sliderObjArray.length; i++) {

  sliderArray[i] = new Slider(sliderObjArray[i].id, sliderObjArray[i].min, sliderObjArray[i].max, sliderObjArray[i].value, sliderObjArray[i].step, sliderObjArray[i].link, sliderObjArray[i].value2)
  document.getElementById('sliderDiv').insertAdjacentHTML('beforeend', sliderArray[i].render())
  sliderArray[i].eventListen()
}

//buttons
const defaultValuesBtn = document.getElementById('defaultValuesBtn')
defaultValuesBtn.addEventListener('click', function () {
  for (let i = 0; i < sliderArray.length; i++) {
    sliderArray[i].defaultValues()
  }
  setup()
  console.log('defaultValues');
}, false);

const presetBtn = document.getElementById('presetBtn')
presetBtn.addEventListener('click', function () {
  for (let i = 0; i < sliderArray.length; i++) {
    sliderArray[i].preset()
  }
  console.log('preset');
  setup()
}, false);

