import './css/styles.css';
import refs from './refs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupInfo, createMarkupList } from './createMarkup';
import { resetInfo, resetList } from './resetElements';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name';

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const countryName = e.target.value.trim();

  if (!countryName) {
    resetList();
    resetInfo();
    return;
  }

  fetch(
    `${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.status === '404') {
        throw new Error();
      }

      return response.json();
    })
    .then(countries => {
      if (countries.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2) {
        createMarkupList(countries, refs.countryList, resetInfo);
      } else {
        createMarkupInfo(...countries, refs.countryInfo, resetList);
      }
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
      resetList();
      resetInfo();
    });
}
