// Constantes de texto para las páginas
const TEXT_CONSTANTS = {
  departures: "Departures prueba",
  arrivals: "Arrivals prueba",
  navdata: "NavData prueba",
  hub: "Hub prueba",
  who: "Who prueba"
};

// Función para aplicar las constantes a los elementos con clase 'callout-verde'
function applyConstantsToCallouts() {
  const callouts = document.querySelectorAll('.callout-verde');
  const pageName = document.querySelector('h1').textContent.trim();
  
  callouts.forEach(callout => {
    const p = callout.querySelector('p');
    if (p && TEXT_CONSTANTS[pageName.toLowerCase()]) {
      p.innerHTML = TEXT_CONSTANTS[pageName.toLowerCase()];
    }
  });
}

// Función para aplicar las constantes a los párrafos de index.html
function applyConstantsToIndex() {
  const descriptions = document.querySelectorAll('main p');
  const mappings = {
    'Departures': TEXT_CONSTANTS.departures,
    'Arrivals': TEXT_CONSTANTS.arrivals,
    'NavData': TEXT_CONSTANTS.navdata,
    'Hub': TEXT_CONSTANTS.hub,
    'Who': TEXT_CONSTANTS.who
  };
  
  descriptions.forEach(p => {
    const h2 = p.previousElementSibling;
    if (h2 && h2.tagName === 'H2') {
      const title = h2.querySelector('a').textContent.trim();
      if (mappings[title]) {
        p.textContent = mappings[title];
      }
    }
  });
}

// Aplicar las constantes al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.callout-verde')) {
    applyConstantsToCallouts();
  }
  if (document.querySelector('main p')) {
    applyConstantsToIndex();
  }
});