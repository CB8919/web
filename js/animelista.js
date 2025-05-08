let pageNumber = 1; // Página inicial

// Función para obtener anime de una página específica
function fetchAnime(page) {
  const query = `
    {
      Page(page: ${page}, perPage: 12) {
        media(type: ANIME) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  .then(response => response.json())
  .then(data => {
    const animes = data.data.Page.media;
    displayAnime(animes);
    updatePageNumber(page);
  })
  .catch(error => console.error('Error:', error));
}

// Función para mostrar los datos de anime
function displayAnime(animes) {
  const container = document.getElementById('anime-container');
  container.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos elementos

  animes.forEach(anime => {
    const animeElement = document.createElement('div');
    animeElement.className = 'anime-item';
    animeElement.innerHTML = `
      <a href="destacados.html?id=${anime.id}">
        <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
        <p>${anime.title.romaji}</p>
      </a>
    `;
    container.appendChild(animeElement);
  });
}

// Función para actualizar el número de página mostrado
function updatePageNumber(page) {
  document.getElementById('page-number').textContent = `Page ${page}`;
}

// Función para manejar los botones de paginación
function setupPagination() {
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  prevButton.addEventListener('click', () => {
    if (pageNumber > 1) {
      pageNumber--;
      fetchAnime(pageNumber);
    }
  });

  nextButton.addEventListener('click', () => {
    pageNumber++;
    fetchAnime(pageNumber);
  });

  // Cargar la primera página
  fetchAnime(pageNumber);
}

// Inicializar la paginación
setupPagination();


  


