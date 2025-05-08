fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query })
})
.then(response => response.json())
.then(data => {
  const anime = data.data.Media;
  const container = document.getElementById('anime-container');
  container.innerHTML = `
    <h2>${anime.title.romaji}</h2>
    <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
    <p>Episodes: ${anime.episodes}</p>
  `;
});
