import axios from 'axios';

// --- 1. DEFINIÇÃO DOS TIPOS (Colocamos aqui para não precisar de outro arquivo) ---
export interface WeatherCondition {
  main: string;
  description: string;
}

export interface MainData {
  temp: number;
  humidity: number;
}

export interface WindData {
  speed: number;
}

export interface SysData {
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  weather: WeatherCondition[];
  main: MainData;
  wind: WindData;
  sys: SysData;
  dt_txt?: string;
}

export interface ForecastList {
  list: WeatherData[];
}

// --- 2. CONFIGURAÇÃO DA API ---
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// --- 3. FUNÇÃO DE BUSCA ---
export const getCityWeather = async (lat: number, lon: number) => {
  try {
    const forecast = await axios.get<ForecastList>(`${BASE_URL}/forecast`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' }
    });

    const current = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' }
    });

    return { current: current.data, forecast: forecast.data };
  } catch (error) {
    console.error("Erro ao buscar clima:", error);
    return null;
  }
};

// --- 4. FUNÇÃO DE FILTRO ---
export const filterForecasts = (list: WeatherData[]) => {
  // Se a lista vier vazia ou undefined (erro na API), retornamos um objeto vazio seguro
  if (!list) return { dawn: null, morning: null, afternoon: null, night: null };

  const next24h = list.slice(0, 9);
  
  return {
    dawn: next24h.find((i) => i.dt_txt?.includes("03:00")) || next24h[0],
    morning: next24h.find((i) => i.dt_txt?.includes("09:00")) || next24h[2],
    afternoon: next24h.find((i) => i.dt_txt?.includes("15:00")) || next24h[4],
    night: next24h.find((i) => i.dt_txt?.includes("21:00")) || next24h[6],
  };
};