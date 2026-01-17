import Link from 'next/link';
import { CITIES } from '@/utils/constants';
import SolidGlobe from '@/components/SolidGlobe';

export default function Home() {
  return (
  
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 tracking-wide selection:bg-white selection:text-black">
      
      {/* Título */}
      <h1 className="text-5xl md:text-7xl font-thin tracking-tighter mb-2 text-center">
        Weather
      </h1>
      
      {/* Subtítulo (Margem pequena) */}
      <p className="text-lg md:text-2xl text-gray-400 font-extralight mb-8 text-center">
        Select a city
      </p>

      {/* Ícone */}
      <div className="mb-10 hover:scale-105 transition-transform duration-700 ease-out">
        <SolidGlobe size={160} color="white" />
      </div>

     
      <div className="grid grid-cols-3 gap-x-4 gap-y-6 text-center w-full max-w-2xl px-2">
        {CITIES.map((city) => (
          <Link 
            key={city.id} 
            href={`/city/${city.id}`}
            //responsivel
            className="text-lg md:text-2xl font-thin hover:text-gray-300 transition-colors duration-300 whitespace-nowrap"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </main>
  );
}