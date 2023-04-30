// Отримуємо доступ до елементів
const refs = {
  firstDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  button: document.querySelector('button'),
};

// Функція створення промісів
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setInterval(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Reject promise ${position} in ${delay}ms`);
      }
    });
  });
}

let i = 1;

function position() {
  i++;
}

function delay() {
  refs.firstDelay.value;
}

// Виклик сабміта
refs.button.addEventListener('click', e => {
  e.preventDefault();
  createPromise(refs.amount.value, refs.firstDelay.value).then(resolve).catch(reject);
});
