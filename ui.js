class Slider {
  constructor(id, min, max, value, step, label) {
    this.id = id;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;
    this.label = label;
  }

  render() {
    return `<input type="range" id="${this.id}" min="${this.min}" max="${this.max}" value="${this.value}" step="${this.step}">
    <label for="${this.id}">${this.label}</label>`
  }

  eventListen() {
    /* Event listener */
    document.getElementById(this.id).addEventListener("input", (e) => {
      console.log(e.target.value);
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