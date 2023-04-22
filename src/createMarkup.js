function createMarkupInfo(
  { name, capital, population, flags, languages },
  elToInsert,
  resetFn
) {
  resetFn();

  const markup = `
  <a href="https://en.wikipedia.org/wiki/${name.common}" class="country-link">
        <div class="country-bg"></div>
        <div class="country-title">
          <img src="${flags.svg}" 
          class="country-info-img"
          alt="${name.official}">
          <h2>${name.official}</h2>
        </div>
        <div class="country-subtitle-box">
          Capital:
          <span class="country-subtitle">
            ${capital}
          </span>
        </div>
        <div class="country-subtitle-box">
          Population:
          <span class="country-subtitle">
            ${population}
          </span>
        </div>
        <div class="country-subtitle-box">
          Languages:
          <span class="country-subtitle">
            ${Object.values(languages).join(', ')}
          </span>
        </div>
      </a>`;

  elToInsert.innerHTML = markup;
}

function createMarkupList(countriesArr, elToInsert, resetFn) {
  resetFn();

  const markup = countriesArr
    .map(
      ({ flags, name }) =>
        `<li class="country-list-item country-title country-list-title"><img class="country-list-img" src="${flags.svg}" alt="${name.official}"><h2>${name.official}</h2></li>`
    )
    .join('');

  elToInsert.innerHTML = markup;
}

export { createMarkupInfo, createMarkupList };
