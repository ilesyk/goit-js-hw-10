import { fetchBreeds, fetchCatByBreed } from './cat-api';
import NiceSelect from 'nice-select2';
import "../node_modules/nice-select2/src/scss/nice-select2.scss";
export const selectors = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};
 
selectors.loader.classList.remove('hide');

fetchBreeds().then(() => {
  selectors.loader.classList.add('hide');
  new NiceSelect(selectors.select);
});

 
selectors.select.addEventListener('change', onSelect);

function onSelect() {
  const breedId = selectors.select.value;
  selectors.info.innerHTML = '';

  if (breedId) {
    selectors.select.disabled = true;
    selectors.loader.classList.remove('hide');
    fetchCatByBreed(breedId).then(() => {
      selectors.select.disabled = false;
      selectors.loader.classList.add('hide');
      
    });
  } else {
    selectors.loader.classList.add('hide');
  }
}

