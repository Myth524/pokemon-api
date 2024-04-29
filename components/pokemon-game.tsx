'use client'

import { useState, useEffect } from 'react';
import { getPokemonByName, getPokemons } from "@/lib/pokemon-api";

export default function PokemonGame() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [randomPokemons, setRandomPokemons] = useState<Pokemon[]>([]);

  // Función para manejar el clic de un botón
  const handleButtonClick = async (pokemonName: string) => {
    if(pokemonName.toLowerCase() == selectedPokemon?.name?.toLowerCase()) {
      alert("Corecto! ¡Es " + selectedPokemon?.name + "!");
    } else {
      alert("AJAJAJJAJA bobo hpta! ¡Es " + selectedPokemon?.name + "!");
    }
  };

  // Cargar la lista de Pokémon y seleccionar aleatoriamente cuando se monte el componente
  useEffect(() => {
    const fetchPokemonList = async () => {
      const pokemonList = await getPokemons();
      const randomPokemons = [];
  
      // Seleccionar aleatoriamente 4 Pokémon de la lista
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        randomPokemons.push(pokemonList[randomIndex]);
      }
  
      // Seleccionar aleatoriamente un Pokémon de los 4
      const randomIndex = Math.floor(Math.random() * randomPokemons.length);
      const randomPokemon = randomPokemons[randomIndex];
  
      // Obtener el objeto completo del Pokémon seleccionado
      const selectedPokemon = await getPokemonByName(randomPokemon.name);
  
      // Establecer el estado de selectedPokemon y randomPokemons
      setSelectedPokemon(selectedPokemon);
      setRandomPokemons(randomPokemons);

      console.log(selectedPokemon)
      console.log(randomPokemons)

    };
  
    fetchPokemonList();
  }, []);

  return (
    <>
      <div className="game__container">
        <div className="whos__that_pokemon_card">
          <img
            className="pokemon__img"
            src={selectedPokemon?.sprites?.other?.home?.front_default}
            loading="lazy"
            alt={selectedPokemon?.name}
            id="pokemon_shadow_img"
          />
          <div className="options__container">
            {randomPokemons.map((pokemon, index) => (
              <button key={index} onClick={() => handleButtonClick(pokemon.name)}>
                {pokemon.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
