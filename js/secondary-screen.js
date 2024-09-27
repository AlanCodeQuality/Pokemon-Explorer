// Seleciona elementos HTML que serão manipulados no código
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonSave = document.querySelector('.btn-save');

let searchPokemon = 1;
let favorites = JSON.parse(localStorage.getItem('favorites')) || []; 

// Função assíncrona que busca dados do Pokémon na API usando o nome ou número
const fetchPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);   

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data; 
    }   
}

// Função que renderiza os dados do Pokémon buscado na tela
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {    
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';
    }
}

// Função que salva o Pokémon atual nos favoritos, evitando duplicatas
const savePokemonToFavorites = () => {
    const currentPokemon = {
        name: pokemonName.innerHTML,
        id: pokemonNumber.innerHTML,
        image: pokemonImage.src
    };

    if (!favorites.some(pokemon => pokemon.id === currentPokemon.id)) {
        favorites.push(currentPokemon); 
        localStorage.setItem('favorites', JSON.stringify(favorites)); 
        alert(`${currentPokemon.name} foi salvo aos favoritos!`);
    } else {
        alert(`${currentPokemon.name} já está nos favoritos!`);
    }
}

// Evento que busca o Pokémon submetido no campo de busca
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Evento que busca o Pokémon anterior quando o botão 'prev' é clicado
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// Evento que busca o próximo Pokémon quando o botão 'next' é clicado
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Evento que salva o Pokémon atual aos favoritos quando o botão 'save' é clicado
buttonSave.addEventListener('click', savePokemonToFavorites);

renderPokemon(searchPokemon);
