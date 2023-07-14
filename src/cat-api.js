import axios from 'axios';
import { selectors, slimselect } from './index';
import Notiflix from 'notiflix';
axios.defaults.headers.common['x-api-key'] =
  'live_LhcBKtNvvXu9gxXVSZt6OhSKpUdIZ0aRfEksKLYhizTjkDXeWMCVBg8sJxMR9NLd';

const URL = 'https://api.thecatapi.com/v1';
const END_POINT_BREED = '/breeds';
const END_POINT_SEARCH = '/images/search';

function fetchBreeds() {
  selectors.loader.classList.remove('hide');
  selectors.select.disabled = true;
  selectors.info.classList.add('hide');

  return axios
    .get(`${URL}${END_POINT_BREED}`)
    .then(({ data }) => {
      selectors.select.innerHTML = createSelect(data);
      selectors.select.disabled = false;
      selectors.loader.classList.add('hide');
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      selectors.loader.classList.add('hide');
    });
}

function createSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function fetchCatByBreed(breedId) {
  selectors.loader.classList.remove('hide');
  selectors.info.classList.add('hide');
  return axios
    .get(`${URL}${END_POINT_SEARCH}?breed_ids=${breedId}`)
    .then(({ data }) => {
      const catData = data[0];
      selectors.info.innerHTML = createMarkup(catData);
      selectors.info.classList.remove('hide');
      selectors.loader.classList.add('hide');
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      selectors.loader.classList.add('hide');
    });
}

function createMarkup(data) {
  const imageUrl = data.url;
  const breedName = data.breeds[0].name;
  const breedDescription = data.breeds[0].description;
  const breedTemperament = data.breeds[0].temperament;

  return `
    <img src="${imageUrl}" alt="${breedName}" width="400">
    <h2>${breedName}</h2>
    <p>${breedDescription}</p>
    <h4>Temperament:</h4>
    <p>${breedTemperament}</p>
  `;
}

export { fetchBreeds, fetchCatByBreed };
