import React from 'react';
import { LOCAL_ATTRACTIONS } from '../data/chaletData';
import { MapPin, Compass, Navigation, Sparkles, Footprints, Droplets } from 'lucide-react';

export const LocalGuide: React.FC = () => {
  return (
    <section id="itaitu" className="py-16 sm:py-24 bg-stone-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-900 border border-sky-500/30">
            <Compass className="w-4 h-4 text-sky-600" />
            Itaitú & Jacobina - Bahia
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            O Paraíso das Cachoeiras ao Seu Alcance
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Itaitú é um dos vilarejos ecológicos mais encantadores da Chapada Norte. Hospedando-se no Chalé Maria Pitanga, você fica a poucos minutos das melhores atrações naturais.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {LOCAL_ATTRACTIONS.map((spot, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5" />
                    {spot.distance}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {spot.difficulty}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-sky-700 transition-colors leading-tight">
                  {spot.name}
                </h3>

                <p className="text-[11px] text-stone-500 uppercase font-semibold tracking-wider">
                  {spot.type}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {spot.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{spot.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Tips Callout Banner */}
        <div className="mt-10 bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-sky-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-lg sm:text-xl text-white flex items-center gap-2 justify-center sm:justify-start">
              <Navigation className="w-5 h-5 text-amber-400" />
              Guia Completo de Passeios Disponível na Chegada
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              A anfitriã Haylla envia uma curadoria completa com mapas de acesso, dicas de guias locais e os melhores restaurantes da vila!
            </p>
          </div>
          <a
            href="#reservar"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shrink-0 transition-transform active:scale-95 shadow-md"
          >
            Quero Me Hospedar em Itaitú
          </a>
        </div>
      </div>
    </section>
  );
};
