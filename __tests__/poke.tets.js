
import { render, screen, waitFor } from '@testing-library/react';
import Poke from '../pages/Poke';

describe('Poke', () => {

  it('renders pokemones', async() => {

    const mockResults = [{ name: 'chanchito', url: 'https://www.dominio.com/pokemones/1' }];

    global.fetch = jest.fn()
      .mockImplementation(url => {
        return new Promise(resolve => {
          resolve({
            json: () => Promise.resolve({
              results: mockResults
            })
          });
        });
      });
    
    render(<Poke />);
    
    const loading = screen.getByText('Cargando...');
    expect(loading).toBeInTheDocument();

    // espera a que se cargue el componente
    await waitFor(() => {
      expect(screen.queryByText('App de Pokemones'));
    });


    const element = screen.getByTestId(1);
    const anchor = element.children[0];
    // si este tiene atributos href y tenga en el url 
    expect(anchor).toHaveAttribute('href', '/pokemones/1');
    // saber si anchor tiene un texto en particular
    expect(anchor).toHaveTextContent('chanchito');

});
  


});


/**
  ojo con los warning por los estados
  para ello utlizaremos  waitFor

  waitFor : retorna una promesa que se resuelve cuando el elemento es encontrado de forma exitosa
  
  se utiliza cuando los componentes no se han cargado
  debemos transformar a una función asincrona

*/