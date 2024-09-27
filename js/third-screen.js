// Função para redirecionar o usuário para a tela de favoritos
function goToThirdScreen() {
    window.location.href = 'third-screen.html'; 
}
document.addEventListener('DOMContentLoaded', function() {
    const favoritesButton = document.getElementById('start-button');
    
    if (favoritesButton) {
        favoritesButton.addEventListener('click', goToThirdScreen);
    }
});

// Função que carrega os Pokémons salvos nos favoritos do localStorage e os exibe na tela
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const favoritesContainer = document.querySelector('.favorites-container');
    favoritesContainer.innerHTML = ''; 

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Nenhum Pokémon foi salvo nos favoritos.</p>';
    } else {
        favorites.forEach((pokemon, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');

            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemon.image;
            pokemonImg.alt = pokemon.name;
            pokemonImg.classList.add('pokemon-img');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                removeFavorite(index); 
            });

            favoriteItem.appendChild(pokemonImg);
            favoriteItem.appendChild(removeButton);
            favoritesContainer.appendChild(favoriteItem);
        });
    }
}

// Função que remove um Pokémon dos favoritos e atualiza a tela e o localStorage
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);

    localStorage.setItem('favorites', JSON.stringify(favorites)); 
    loadFavorites(); 
}

document.addEventListener('DOMContentLoaded', loadFavorites);
