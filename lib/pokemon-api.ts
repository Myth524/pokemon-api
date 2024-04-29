let POKEMON_API = process.env.POKEMON_APi || "https://pokeapi.co/api/v2/";

export async function getPokemons() {
    const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
    const data = await response.json();
    return data.results;
}

export async function getPokemonByName(name: string) {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();
    return data;
}