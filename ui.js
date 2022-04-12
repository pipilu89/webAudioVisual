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
      this.newValue = e.target.value
      // console.log(this.newValue);
      document.getElementById(`${this.id}Div`).innerText = `${this.id}:${this.newValue}`
    }, false);
  }

}

// /* Selecting DOM element */
// const button2 = document.getElementById(id1);

// /* Callback function */
// function alertButton() {
//   alert('Hi native JavaScript');
// }

// /* Event listener */
// button2.addEventListener("input", alertButton, false);

//     //INPUTS
//     const magRange = document.getElementById('magRange')
//     const magValueDiv = document.getElementById('magValue')
//     magValueDiv.innerText = `Mag: ${magRangeValue}`
//     magRange.addEventListener('input', function () {
//       magRangeValue = (this.value * 1)
//       magValueDiv.innerText = `Mag: ${magRangeValue}`
//     }, false);