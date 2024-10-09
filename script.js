const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function buscarPokemon(nome) {
  try {
    const response = await fetch(`${apiUrl}${nome}`);

    if (!response.ok) {
      throw new Error('Pokémon não encontrado');
    }

    const pokemonData = await response.json();

    preencherTabela(pokemonData);
  } catch (error) {
    console.error('Erro ao buscar:', error);
    exibirMensagem(error.message);
  }
}

function preencherTabela(pokemon) {
  const tableBody = document.querySelector('#api-table tbody');
  tableBody.innerHTML = ''; 

  const row = tableBody.insertRow();
  row.insertCell(0).textContent = pokemon.name;
  row.insertCell(1).textContent = pokemon.id;
  row.insertCell(2).textContent = pokemon.height;
  row.insertCell(3).textContent = pokemon.weight;
  row.insertCell(4).textContent = pokemon.types.map(type => type.type.name).join(', ');
  row.insertCell(5).textContent = pokemon.abilities.map(ability => ability.ability.name).join(', ');

  const frontSpriteCell = row.insertCell(6);
  if (pokemon.sprites.front_default) {
    const frontImg = document.createElement('img');
    frontImg.src = pokemon.sprites.front_default;
    frontSpriteCell.appendChild(frontImg);
  } else {
    frontSpriteCell.textContent = 'N/A';
  }

  const backSpriteCell = row.insertCell(7);
  if (pokemon.sprites.back_default) {
    const backImg = document.createElement('img');
    backImg.src = pokemon.sprites.back_default;
    backSpriteCell.appendChild(backImg);
  } else {
    backSpriteCell.textContent = 'N/A';
  }
}

function exibirMensagem(mensagem) {
  const messageElement = document.querySelector('#message');
  messageElement.textContent = mensagem;
}

const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('keyup', () => {
  const nomePokemon = searchBox.value.toLowerCase().trim();
  if (nomePokemon.length === 0) {
    return;
  }

  exibirMensagem(''); 
  buscarPokemon(nomePokemon);
});