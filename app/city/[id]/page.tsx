'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import Link from 'next/link';

import { CITIES } from '@/utils/constants'; 
import { getCityWeather, filterForecasts, WeatherData, ForecastList } from '@/services/weatherApi';

import { Cloud, Moon, Sun, Wind, Droplets, ArrowUp, ArrowDown, CloudSnow, CloudRain, CloudSun, CloudMoon } from 'lucide-react';

// --- INTERFACES ---
interface FullWeatherData {
  current: WeatherData & { timezone: number };
  forecast: ForecastList;
}

interface IconProps {
  size: number;
  strokeWidth: number;
  className?: string;
}

export default function CityDetail() {
  const params = useParams();
  const id = params?.id; 
  
  const [data, setData] = useState<FullWeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const cityInfo = CITIES.find((c) => c.id === id);

  useEffect(() => {
    if (cityInfo) {
      getCityWeather(cityInfo.lat, cityInfo.lon)
        .then((result) => {
          if (result) {
             setData(result as FullWeatherData);
          }
          setLoading(false);
        });
    }
  
  }, [cityInfo]);

  if (!cityInfo) return <div className="flex items-center justify-center h-screen bg-black text-white font-thin">City not found</div>;
  if (loading || !data) return <div className="flex items-center justify-center h-screen bg-black text-white font-thin text-2xl animate-pulse">Loading...</div>;

  const weatherMain = data.current.weather[0].main.toLowerCase();
  const temp = Math.round(data.current.main.temp);

  // --- FORMATAÇÃO DE HORÁRIO ---
  const formatCityTime = (timestamp: number) => {
    const offset = data.current.timezone; 
    const localDate = new Date((timestamp + offset) * 1000);
    return localDate.toLocaleTimeString([], {
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'UTC'
    });
  };

  // variação térmica
  const next24Hours = data.forecast.list.slice(0, 8);
  const temps = next24Hours.map(item => item.main.temp);
  const maxTemp = Math.round(Math.max(...temps));
  const minTemp = Math.round(Math.min(...temps));

  // estilos dinâmicos
  const isClear = weatherMain === 'clear';
  const bgClass = isClear ? 'bg-[#3CABF4]' : 'bg-[#E0E0E0]'; 
  const textColor = isClear ? 'text-white' : 'text-[#333333]'; 
  const subTextColor = isClear ? 'opacity-80' : 'opacity-50';
  const dividerColor = isClear ? 'bg-white/30' : 'bg-black/10';

  // ícones config
  const mainIconProps: IconProps = { size: 140, strokeWidth: 0.8 };
  const smallIconProps: IconProps = { size: 24, strokeWidth: 1.2 };

  // escolher ícone
  const getIconByCondition = (condition: string, props: IconProps, isNight: boolean = false) => {
    const main = condition ? condition.toLowerCase() : 'clouds';

    switch (main) {
      case 'clear': 
        return isNight ? <Moon {...props} /> : <Sun {...props} />;
      case 'clouds': 
        return isNight ? <CloudMoon {...props} /> : <CloudSun {...props} />;
      case 'snow': 
        return <CloudSnow {...props} />; 
      case 'rain': 
      case 'drizzle':
      case 'thunderstorm': 
        return <CloudRain {...props} />;
      default: 
        return <Cloud {...props} />;
    }
  };
  
  const forecasts = filterForecasts(data.forecast.list);

  return (
    <main className={`relative min-h-screen w-full flex flex-col items-center justify-center py-6 px-4 md:px-6 transition-colors duration-1000 overflow-x-hidden ${bgClass} ${textColor}`}>
      
      {/* botão back*/}
      <Link href="/" className="absolute top-4 left-4 md:top-6 md:left-6 text-base md:text-lg font-medium opacity-70 hover:opacity-100 transition-opacity z-20">
          &larr; Back
      </Link>

      <div className="flex flex-col items-center text-center w-full max-w-4xl font-thin mt-8 md:mt-0">
        
        {/* Título */}
        <h1 className="text-4xl md:text-6xl tracking-tight mb-1">{cityInfo.name}</h1>
        
        {/* Descrição */}
        <p className="text-lg md:text-3xl capitalize font-extralight mb-4 opacity-80">{data.current.weather[0].description}</p>
        
        {/* --- TEMPERATURA --- */}
        <div className="flex flex-row items-start justify-center tracking-tighter mb-4 md:mb-2 ml-4 md:ml-8">
            <span className="text-[7rem] sm:text-[9rem] md:text-[11rem] leading-none font-thin">
                {temp}
            </span>
            <div className="flex flex-col items-start justify-start pt-3 md:pt-8 ml-2 md:ml-4">
                <span className="text-3xl md:text-5xl font-light leading-none mb-2 md:mb-3">°C</span>
                <div className="flex flex-col gap-0 md:gap-1 pl-1">
                    <span className={`flex items-center gap-1 text-xs md:text-base font-light ${subTextColor}`}>
                        <ArrowUp size={14} strokeWidth={2} className="md:w-4 md:h-4" /> {maxTemp}°
                    </span>
                    <span className={`flex items-center gap-1 text-xs md:text-base font-light ${subTextColor}`}>
                        <ArrowDown size={14} strokeWidth={2} className="md:w-4 md:h-4" /> {minTemp}°
                    </span>
                </div>
            </div>
        </div>

        {/* --- ÍCONE PRINCIPAL --- */}
        <div className="mb-6 md:mb-8 opacity-90 transform scale-75 md:scale-110 origin-bottom transition-transform">
           {/* Usa o clima atual */}
           {getIconByCondition(weatherMain, mainIconProps, false)}
        </div>
        
        {/* --- GRID PREVISÃO DINÂMICO --- */}
        <div className="w-full max-w-2xl grid grid-cols-4 gap-2 md:gap-4 text-center mb-6 md:mb-8 px-2 md:px-4">
            {[
            { 
                label: 'Dawn', 
                temp: forecasts.dawn, 
                // clima real para definir o ícone
                icon: getIconByCondition(forecasts.dawn?.weather[0]?.main || '', smallIconProps, false) 
            },
            { 
                label: 'Morning', 
                temp: forecasts.morning, 
                icon: getIconByCondition(forecasts.morning?.weather[0]?.main || '', smallIconProps, false) 
            },
            { 
                label: 'Afternoon', 
                temp: forecasts.afternoon, 
                icon: getIconByCondition(forecasts.afternoon?.weather[0]?.main || '', smallIconProps, false) 
            },
            { 
                label: 'Night', 
                temp: forecasts.night, 
                
                icon: getIconByCondition(forecasts.night?.weather[0]?.main || '', smallIconProps, true) 
            }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 md:gap-2">
                    <span className={`text-[10px] md:text-sm font-medium uppercase tracking-wider ${subTextColor}`}>{item.label}</span>
                    
                    <div className="opacity-90 scale-90 md:scale-100">
                        {item.icon}
                    </div>
                    
                    <span className="font-normal text-lg md:text-2xl tracking-tight">
                        {item.temp ? Math.round(item.temp.main.temp) : '--'}°
                    </span>
                </div>
            ))}
        </div>

        {/* Divisória */}
        <div className={`w-full max-w-2xl h-px ${dividerColor} mb-6 md:mb-8 opacity-50`}></div>

        {/* --- RODAPÉ DE DETALHES --- */}
        <div className="w-full max-w-2xl grid grid-cols-4 gap-2 md:gap-4 text-center font-light px-2 md:px-4 pb-4 md:pb-0">
            {[
                { label: 'wind', icon: Wind, val: `${data.current.wind.speed} m/s` },
                { label: 'sunrise', icon: ArrowUp, val: formatCityTime(data.current.sys.sunrise) },
                { label: 'sunset', icon: ArrowDown, val: formatCityTime(data.current.sys.sunset) },
                { label: 'humidity', icon: Droplets, val: `${data.current.main.humidity}%` }
            ].map((detail, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-1 md:gap-2">
                    <span className={`text-[10px] md:text-xs uppercase tracking-widest ${subTextColor}`}>{detail.label}</span>
                    <detail.icon {...smallIconProps} className="opacity-80 scale-90 md:scale-100"/>
                    <span className="font-normal text-sm md:text-xl whitespace-nowrap">{detail.val}</span>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}