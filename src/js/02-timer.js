import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

    const currentDate = new Date();
    selectedTime = selectedDates[0].getTime() - currentDate.getTime();

    if (selectedDates[0].getTime() > currentDate.getTime()) {
      refs.startBtn.disabled = false;
      return;
    } else alert('Please choose a date in the future');
  },
});

let intervalId;

refs.startBtn.addEventListener('click', timeOn);

function timeOn() {
  intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(selectedTime -= 1);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;

    console.log(
      `Днів:${days} Годин:${hours} Хвилин:${minutes} Секунд:${seconds}`
    );
    console.log(selectedTime);

  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, "0");
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
