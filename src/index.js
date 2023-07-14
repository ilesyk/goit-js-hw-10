import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
export const selectors = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};

selectors.loader.classList.remove('hide');
fetchBreeds().finally(() => {
  selectors.loader.classList.add('hide');
});

selectors.select.addEventListener('input', onSelect);

function onSelect() {
  const breedId = selectors.select.value;
  selectors.info.innerHTML = '';

  if (breedId) {
    selectors.select.disabled = true;
    selectors.loader.classList.remove('hide');
    fetchCatByBreed(breedId).finally(() => {
      selectors.select.disabled = false;
      selectors.loader.classList.add('hide');
    });
  } else {
    selectors.loader.classList.add('hide');
  }
}
