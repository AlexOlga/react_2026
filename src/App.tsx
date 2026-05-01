import BuggyButton from './components/buggyButton';
import Search from './components/search';
import getPokemonByName from './utils/getPokemonByName';
import getPokemons from './utils/getPokemons';

function App() {
  getPokemons(10);
  getPokemonByName('pikachu');
  return (
    <>
      <section id="center">
        <div>
          <Search />
          <BuggyButton />
        </div>
      </section>
    </>
  );
}

export default App;
