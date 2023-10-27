import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
// console.dir(formEl[0]);

formEl.addEventListener('submit', onPromiseCreate);

function onPromiseCreate(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;

  const dataDelay = Number(delay.value);
  const dataStep = Number(step.value);
  const dataAmount = Number(amount.value);
  if (dataDelay < 0 || dataStep < 0 || dataAmount < 0) {
    Notiflix.Notify.warning(`❗ Please enter a positive number`);
  } else {
    for (let i = 0; i <= dataAmount; i += 1) {
      let position = i + 1;
      let delaySum = dataDelay + dataStep * position;

      createPromise(position, delaySum)
        .then(({ position, delay }) => {
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
  }
  // event.currentTarget.reset();
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
