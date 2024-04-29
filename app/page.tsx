import PokemonGame from "@/components/pokemon-game";

export default async function Home() {
  return (
    <>
      <div className="game__container">
        <PokemonGame/>
      </div>
    </>
  );
}
