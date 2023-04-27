import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/build/notiflix-loading-aio';

let selectedTime;

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    refs.startBtn.disabled = true;

    selectedTime = selectedDates[0];
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      refs.startBtn.disabled = false;
      return;
    } else Notiflix.Notify.failure('Please choose a date in the future');
  },
});

let intervalId = 'null';
let delta;
refs.startBtn.addEventListener('click', onTimer);

function onTimer() {
  intervalId = setInterval(() => {
    if (delta < 1000) {
      offTimer();
    } else {
      const currentDate = new Date();
      delta = selectedTime - currentDate;
      const { days, hours, minutes, seconds } = convertMs(delta);
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }
  }, 1000);
}

function offTimer() {
  clearInterval(intervalId);
  refs.startBtn.disabled = true;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
