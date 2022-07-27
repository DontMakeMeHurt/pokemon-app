import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './component/PokemonCollection';
import { Pokemon } from './component/interface';


interface Pokemons {
  name: string,
  url : string
}

export interface Detail {
  id: number,
  isOpened: boolean
}

const App: React.FC = () => {
  
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [urlNext, setUrlNext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  });

  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
      setUrlNext(res.data.next);
      res.data.results.forEach(async (pokemon:Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons((p) => [...p, poke.data])
        setLoading(false);
      })
    }
    getPokemons();
  }, [])

  const nextPage = async () => {
    setLoading(true)
    let res = await axios.get(urlNext);
    setUrlNext(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="pokemon-header">Pokemon</div>
        <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setViewDetail={setViewDetail} />
        <div className="btn">
          <button onClick={nextPage}>{loading ? "Loading...." : "Load More" }</button>
        </div>
      </div>
    </div>
  );
}

export default App;
