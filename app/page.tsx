import PokemonGame from "@/components/pokemon-game";

export default async function home() {
  return (
    <>
      <div className="game_container">
        <PokemonGame/>
      </div>
    </>
  )
}
