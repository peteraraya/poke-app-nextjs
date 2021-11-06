import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import StyledTitle from '../components/styled-components/StyledTitle';
import StyledLink from '../components/styled-components/StyledLink';

const Pokemon = ({ data }) => {
  const router = useRouter();
  console.log({ router });
  
  if (router.isFallback) {
    return <p>Cargando...</p>;
  }
    

  return (
    <div className="center">
      <StyledTitle>{data.name} número#{data.id}</StyledTitle>
      <Image src={data.sprites.front_default} width={200} height={150}alt={data.name}></Image>
      <div className="center">
        <Link href="/" passHref>
          <StyledLink>Volver</StyledLink>
        </Link>
      </div>
   </div>
  )
}

export default Pokemon;

// Contenido Estatico del servidor
// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
//   const data = await response.json();
// return { props:{data}}
// }


export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await response.json();
  return { props: { data } }
};

// que rutas dinamicas tiene que generar
export const getStaticPaths  = async () => {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ]
  return {
    paths,
    fallback: true
  }
}


/**
 * Renderizado en el servidor y generar contenido estatico
 * getServerSideProps: esta es una función async , se ejecuta cada vez que ejecutemos una petición a nuestro servidor.
 * props  : son las propiedades 
 * params : son los parámetros que recibe nuestra ruta a travez del simbolo ?.
 * 
 *  Cada vez que un componente se renderize en la parte del servidor debemos hacer una petición con getServerSideProps
 * 
 *  Para que tome jnuestras imagenes debemos realizar una configuración en e archivo next.config.js
 * 
 * Contenido estatico con una sola página
 *   fallback: false : solo renderiza los html que se le indica
 *  fallback: true   : renderiza todo el contenido con lazy loading
 * 
 */