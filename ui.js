let sliderArray = []
let sliderObjArray = [
  {
    id: 'StrokeWeight',
    min: 0,
    max: 20,
    value: 1,
    step: 0.1
  },
  {
    id: 'Magnitude',
    min: 0,
    max: 10,
    value: 1,
    step: 0.1
  },
  {
    id: 'Red',
    min: 0,
    max: 255,
    value: 0,
    step: 1
  },
  {
    id: 'Green',
    min: 0,
    max: 255,
    value: 0,
    step: 1
  },
  {
    id: 'Blue',
    min: 0,
    max: 255,
    value: 0,
    step: 1
  },
  {
    id: 'Alpha',
    min: 0,
    max: 20,
    value: 5,
    step: 1
  },
  {
    id: 'xyIncrement',
    min: 0,
    max: 1,
    value: 0.1,
    step: 0.001
  },
  {
    id: 'zoffIncrement',
    min: 0,
    max: 2,
    value: 0.0003,
    step: 0.0001
  },
  {
    id: 'MaxSpeed',
    min: 0,
    max: 20,
    value: 4,
    step: 0.1
  },
  {
    id: 'test34',
    min: 0,
    max: 20,
    value: 1,
    step: 0.1
  }
]

class Slider {
  constructor(id, min, max, value, step) {
    this.id = id;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;

  }

  render() {
    this.newValue = this.value
    return `<div><div id="${this.id}Div">${this.id}:${this.newValue}</div>
    <input type="range" id="${this.id}Slider" min="${this.min}" max="${this.max}" value="${this.value}" step="${this.step}"></div>`
  }

  eventListen() {

    /* Event listener */
    document.getElementById(`${this.id}Slider`).addEventListener("input", (e) => {
      this.newValue = (e.target.value * 1)
      console.log(this.newValue, typeof (this.newValue));
      document.getElementById(`${this.id}Div`).innerText = `${this.id}:${this.newValue}`
    }, false);
  }

}

// constructor(id, min, max, value, step)
for (let i = 0; i < sliderObjArray.length; i++) {

  sliderArray[i] = new Slider(sliderObjArray[i].id, sliderObjArray[i].min, sliderObjArray[i].max, sliderObjArray[i].value, sliderObjArray[i].step)
  document.getElementById('sliderDiv').insertAdjacentHTML('beforeend', sliderArray[i].render())
  sliderArray[i].eventListen()
}

