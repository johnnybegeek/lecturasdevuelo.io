// Constantes de texto para las páginas
const TEXT_CONSTANTS = {
  departures: "Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha.",
  archivo: "Asuntos completados o archivados, por si buscas inspiración.",
  recursos: "Recursos online que me resultan útiles y que quizá también pueden servirte.",
  temas: "Áreas temáticas que más me interesan.",
  who: "Quién está detrás de todo esto.",
  juegos: "Prototipos.",
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
