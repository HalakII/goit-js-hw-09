import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
// -------------------------------------------------------------
let intervalId = null;
let selectedDate = null;
btn.disabled = true;
btn.addEventListener('click', onBtnClickStart);

//--------------------------------------------------------------
Notiflix.Notify.info('Please, choose a date and click on start');
flatpickr(myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.disabled = true;
    } else {
      selectedDate = selectedDates[0].getTime();
      Notiflix.Notify.success('The clock`s ticking!');
      btn.disabled = false;
    }
    // console.log(selectedDate);
    // console.log(new Date().getTime());
  },
});

function onBtnClickStart() {
  btn.disabled = true;
  myInput.disabled = true;
  intervalId = setInterval(() => {
    const deltaTime = selectedDate - new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (deltaTime <= 1000) {
      clearInterval(intervalId);
      myInput.disabled = false;
      btn.disabled = true;
      Notiflix.Notify.success('Timer stopped!');
    }
    console.log(addLeadingZero(seconds));
  }, 1000);
}

// -------------------------------------------------------------------
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// --------------------------------------------------------------------
function convertMs(deltaTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(deltaTime / day);
  const hours = Math.floor((deltaTime % day) / hour);
  const minutes = Math.floor(((deltaTime % day) % hour) / minute);
  const seconds = Math.floor((((deltaTime % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
