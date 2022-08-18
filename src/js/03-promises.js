import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  imputDelay: document.querySelector("[name = 'delay']"),
  imputStep: document.querySelector("[name = 'step']"),
  imputAmount: document.querySelector("[name = 'amount']"),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  for (let i = 0; i < +refs.imputAmount.value; i++) {
    let position = i + 1;
    let delay = +refs.imputDelay.value + +refs.imputStep.value * i;
    createPromise(position, delay)
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
