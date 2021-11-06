import Link from 'next/link';

const Pokemon = ({ pokemon }) => {
  const id = (pokemon.url.split('/').filter(x => x ).pop());
  return (
    <li><Link href={`/pokemones/${id}`}>{ pokemon.name }</Link></li>
  )
}

export default function Pokemones({pokemones}) {
  console.log(pokemones)
  return (
    <div>
      <p>Pokemones</p>
      <ul>
        {pokemones.map(pokemon => (
         <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  return {
    props: {
      pokemones: data.results
    }
  }
}

/**
 *  Cuando trabajamos con nextjs y hacemos renderizado estatico le estamos diciendo a next que todas las paginas las tome
 *  y las intente renderizar antes de servirlas a los usuaarios.
 *  Esto quiere decir que todas las paginas que se renderizan antes de servirlas a los usuarios, se renderizan en el mismo tiempo.
 * 
 *  getStaticProps : nos pemisiona obtener los datos que necesitamos para renderizar la pagina.
 *  
 *  SSG : Static Site Generation : genera archivos de html estaticos.
 * 
 *  Uso de styled-components :  npm i -S styled-components
 *  utilizaremos un plugin   :  npm i -D babel-plugin-styled-components
 *    luego creamos un archivo .babelrc 
 *    y agregamos la siguiente linea :
        * {
          "presets": ["next/babel"],
          "plugins": ["styled-components"]
        }
 *  Luego creamos un archivo llamado _document.js dentro del directorio pages
 */