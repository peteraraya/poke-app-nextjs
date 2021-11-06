import { render, screen } from '@testing-library/react';
import Index, { getStaticProps} from '../pages/index';

describe('Index', () => {

  describe('Component', () => {
    it('se renderiza', () => {
      
      // agregamos funciones solo a ese componente y no la pantalla completa
      const {
        getByTestId,
        getByText
      } =
      render(<Index pokemones={[{name:'Chanchito feliz', url:'/pokemon/detalle/1'}]} />);

      // verificando si tiene el mismo texto que el que se espera
      const paragraph = getByText('App de Pokemones');
      expect(paragraph).toBeInTheDocument();

      // verificamos si el parrafo tiene es id
      const paragraphId = getByTestId('titulo');
      expect(paragraphId).toBeInTheDocument();

      // probando si contenido dinamico se esta mostrando
      const chanchito = screen.getByText('Chanchito feliz');
      // console.log(chanchito.getAttribute('href'));
      expect(chanchito).toBeInTheDocument();

      // probamos si se creo la url
      const url = chanchito.getAttribute('href');
      expect(url).toEqual('/pokemones/1');


    });
  });
  

  describe('getStaticProps', () => {
    
    it('return pokemones', async() => {
      global.fetch = jest.fn()
        .mockImplementation(url => {
          // se le esta pasando la url correcta
          expect(url).toEqual('https://pokeapi.co/api/v2/pokemon?limit=151');

          return new Promise(resolve => {
            resolve({
              json: () => Promise.resolve({
                results: 'lista de pokemones'
              })
            });
          });
        });
      
      const {props} = await getStaticProps();
      expect(props.pokemones).toBe('lista de pokemones');
    });
    
    
  });
  
  describe('ejemplo intro', () => {
    
    const add = () => 2 + 2;
    it('suma 2 + 2 ',()=>{
      expect(add()).toBe(4);
    });

  });
  


});
