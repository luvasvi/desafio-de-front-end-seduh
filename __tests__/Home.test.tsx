import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock do componente SolidGlobe para não quebrar o teste (já que usa canvas/svg complexo)
jest.mock('@/components/SolidGlobe', () => {
  return function DummyGlobe() {
    return <div data-testid="solid-globe">Globe</div>;
  };
});

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    
    // Verifica se o título "Weather" está lá
    const heading = screen.getByRole('heading', { name: /weather/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders city links correctly', () => {
    render(<Home />);
    
    // Verifica se algumas cidades das constantes estão na tela
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Vancouver')).toBeInTheDocument();
    expect(screen.getByText('Yakutsk')).toBeInTheDocument();
  });
});