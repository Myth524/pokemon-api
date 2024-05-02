'use client'

import { FiRefreshCcw } from 'react-icons/fi'
import React, { useState, useEffect, useCallback } from 'react';
import { getPokemonByName, getPokemons } from "@/lib/pokemon-api";

export default function PokemonGame() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [randomPokemons, setRandomPokemons] = useState<Pokemon[]>([]);
  const [showPokemonImage, setShowPokemonImage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(""); 
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false); 

  const showPokemon = (show: boolean) => {
    setShowPokemonImage(show);
  };

  const gameMessage = (pokemonName:string) => {
    if (pokemonName.toLowerCase() === selectedPokemon?.name?.toLowerCase()) {
      setMessage("¡Correcto! ¡Es " + selectedPokemon?.name + "!");
    } else {
      setMessage("¡Incorrecto! ¡Es " + selectedPokemon?.name + "!");
    }
  }
  
  const handleButtonClick = useCallback(async (pokemonName: string) => {
    gameMessage(pokemonName);
    showPokemon(true);
    setButtonsDisabled(true); 
  }, [selectedPokemon]);

  const handleRefresh = async () => {
    try {
      await window.location.reload();
    } catch (error) {
      console.error('Error al intentar recargar la página:', error);
    }
  };
  
  
  useEffect(() => {
    const fetchPokemonList = async () => {
      const pokemonList = await getPokemons();
      if (pokemonList && pokemonList.length > 0) {
        const chosenPokemons = [];
        let indicesUsed = new Set();
        
        while (chosenPokemons.length < 4) {
          let randomIndex = Math.floor(Math.random() * pokemonList.length);
          if (!indicesUsed.has(randomIndex)) {
            chosenPokemons.push(pokemonList[randomIndex]);
            indicesUsed.add(randomIndex);
          }
        }

        const randomIndex = Math.floor(Math.random() * chosenPokemons.length);
        const selectedPokemon = await getPokemonByName(chosenPokemons[randomIndex].name);

        setSelectedPokemon(selectedPokemon);
        setRandomPokemons(chosenPokemons);
        showPokemon(false);
        setButtonsDisabled(false);
        console.log("selected Pokemon: " + selectedPokemon);
        console.log("random Pokemons: " + chosenPokemons);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="game__container">
      <div className="whos__that_pokemon_card">
        <div className="refresh-button-container">
          <button className="refresh-button" onClick={handleRefresh}>
            <FiRefreshCcw />
          </button>
        </div>
        <img
          className={`pokemon__img ${showPokemonImage ? 'show' : ''}`}
          src={selectedPokemon?.sprites?.other?.home?.front_default}
          loading="lazy"
          alt={selectedPokemon?.name}
          id="pokemon_shadow_img"
        />
        <label className="message-label">{message}</label>
        <div className="options__container">
          {randomPokemons.map((pokemon, index) => (
            <button 
              key={index} 
              onClick={() => handleButtonClick(pokemon.name)} 
              disabled={buttonsDisabled} 
            >
              {pokemon.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}