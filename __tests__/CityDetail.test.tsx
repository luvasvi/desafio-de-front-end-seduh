import { render, screen, waitFor } from '@testing-library/react';
import CityDetail from '@/app/city/[id]/page';

// 1. Mock do Next.js Navigation (Simula que estamos na URL /city/london-gb)
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'london-gb' }),
}));

// 2. Mock da API de Clima (Simula a resposta do servidor para não gastar sua chave real)
jest.mock('@/services/weatherApi', () => ({
  getCityWeather: jest.fn().mockResolvedValue({
    current: {
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 25, humidity: 60 },
      wind: { speed: 5 },
      sys: { sunrise: 1600000000, sunset: 1600040000 },
      timezone: 0, // Importante para a função de horário
    },
    forecast: {
      list: Array(40).fill({
        main: { temp: 20 },
        weather: [{ main: 'Clouds' }],
        dt_txt: '2023-01-01 12:00:00'
      }),
    },
  }),
  filterForecasts: jest.fn().mockReturnValue({
    dawn: null,
    morning: null,
    afternoon: null,
    night: null,
  }),
}));

describe('CityDetail Page', () => {
  it('shows loading state initially', () => {
    render(<CityDetail />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders weather data correctly after loading', async () => {
    render(<CityDetail />);

    // O waitFor aguarda o useEffect e a "API" responderem
    await waitFor(() => {
      // Verifica o Nome da Cidade (Vem do CITIES constant baseado no ID mocked)
      expect(screen.getByText('London')).toBeInTheDocument();
      
      // Verifica a Temperatura (Vem do mock da API: 25)
      // Nota: O componente quebra o número em partes, então buscamos pelo texto "25"
      expect(screen.getByText('25')).toBeInTheDocument();

      // Verifica a Descrição
      expect(screen.getByText('clear sky')).toBeInTheDocument();
      
      // Verifica detalhes do rodapé
      expect(screen.getByText('60%')).toBeInTheDocument(); // Humidade
    });
  });
});