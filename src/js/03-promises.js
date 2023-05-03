import Notiflix from 'notiflix';
import 'notiflix/build/notiflix-loading-aio';

// Отримуємо доступ до елементів
const form = document.querySelector('.form');

// Виклик сабміта
form.addEventListener('submit', onSubmitForm);

// Функція сабміта
function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(form.step.value);
  }
}

// Функція створення промісів
function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res(obj);
      }
      rej(obj);
    }, delay);
  });
}