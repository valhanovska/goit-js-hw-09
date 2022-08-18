import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() >= selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }

    refs.btnStart.addEventListener('click', () => {
      timerId = setInterval(() => {
        const currentTime = new Date();
        const startTime = selectedDates[0];
        const deltaTime = startTime.getTime() - currentTime.getTime();

        if (deltaTime > 0) {
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          refs.days.textContent = `${days}`;
          refs.hours.textContent = `${hours}`;
          refs.minutes.textContent = `${minutes}`;
          refs.seconds.textContent = `${seconds}`;
        } else {
          Notiflix.Notify.success(`The time has come`);
          clearInterval(timerId);
        }
      }, 1000);
    });
  },
};

refs.btnStart.disabled = true;

flatpickr(refs.inputData, options);

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
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
