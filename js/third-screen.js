function goToThirdScreen() {
    window.location.href = 'third-screen.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    const favoritesButton = document.getElementById('start-button'); 
    
    if (favoritesButton) {
        favoritesButton.addEventListener('click', goToThirdScreen);
    }
});

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []; 

    const favoritesContainer = document.querySelector('.favorites-container');
    
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Nenhum Pokémon foi salvo nos favoritos.</p>';
    } else {
        favorites.forEach(pokemon => {
            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemon.image;
            pokemonImg.alt = pokemon.name;
            pokemonImg.classList.add('pokemon-img'); 

            favoritesContainer.appendChild(pokemonImg);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadFavorites);
