//script de redireccion
document.addEventListener('DOMContentLoaded', ()=> {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');

    if (animeId) {
        // Aquí puedes hacer una solicitud para obtener los detalles del anime usando el ID
        console.log('ID del anime:', animeId);
    }
} )