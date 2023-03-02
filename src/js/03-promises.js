import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const congfNotify = {
  useIcon: false,
}

function createPromise(position, delay) {
  return new Promise((resolve ,reject)=>{
    setTimeout(()=>{
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function getFormData(event){
  return {
    delay: Number(event.currentTarget.elements.delay.value),
    step: Number(event.currentTarget.elements.step.value),
    amount: Number(event.currentTarget.elements.amount.value),
  };
}

function loopPromises({delay, amount, step}){
  for(let i = 1; i <= amount; i++){
    createPromise(i, delay)
    .then(({position, delay})=>{
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, congfNotify)
    })
    .catch(({position, delay})=>{
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, congfNotify)
    });
    delay += step;
  }
}

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  const formData = getFormData(event);
  loopPromises(formData);
});