const btnElStart = document.querySelector('[data-start]');
const btnElStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
btnElStart.addEventListener('click', onChangeColorStart);
btnElStop.addEventListener('click', onChangeColorStop);
// console.log(bodyEl);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
btnElStop.disabled = true;
let timerId = null;

function onChangeColorStart() {
  btnElStart.disabled = true;
  btnElStop.disabled = false;
  bodyEl.style.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onChangeColorStop() {
  btnElStart.disabled = false;
  btnElStop.disabled = true;
  clearInterval(timerId);
}
