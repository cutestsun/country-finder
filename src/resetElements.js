import refs from './refs';

function resetList() {
  refs.countryList.innerHTML = '';
}

function resetInfo() {
  refs.countryInfo.innerHTML = '';
}

export { resetList, resetInfo };
