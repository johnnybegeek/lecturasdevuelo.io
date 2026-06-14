// Constantes de texto para las páginas
const TEXT_CONSTANTS = {
  departures: "Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha.",
  arrivals: "Asuntos completados o archivados, por si buscas inspiración.",
  navdata: "Recursos online que me resultan útiles y que quizás también pueden servirte.",
  hub: "Áreas temáticas que más me interesan.",
  who: "Quién está detrás de todo esto."
};

// Función genérica para aplicar los textos definidos en TEXT_CONSTANTS
function applyTextConstants() {
  // Selecciona todos los elementos con el atributo `data-text-key`
  const elements = document.querySelectorAll('[data-text-key]');

  elements.forEach(element => {
    const key = element.getAttribute('data-text-key');
    if (TEXT_CONSTANTS[key]) {
      // Reemplaza el contenido del elemento con el texto correspondiente
      element.textContent = TEXT_CONSTANTS[key];
    }
  });
}

// Aplicar las constantes al cargar la página
document.addEventListener('DOMContentLoaded', applyTextConstants);
