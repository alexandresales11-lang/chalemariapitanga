import React, { useState } from 'react';
import { CHALET_PHOTOS } from '../data/chaletData';
import { ChaletPhoto } from '../types';
import { LightboxModal } from './LightboxModal';
import { Sparkles, Eye, Camera, Sun, Moon, Waves, UtensilsCrossed, BedDouble } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'piscina' | 'exterior-dia' | 'exterior-noite' | 'gourmet' | 'interior'>('all');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<ChaletPhoto | null>(null);

  const filterOptions = [
    { id: 'all', label: 'Todas as Fotos (25+)', icon: Camera },
    { id: 'piscina', label: 'Piscina & Deck de Sol', icon: Waves },
    { id: 'exterior-dia', label: 'Chalé A-Frame de Dia', icon: Sun },
    { id: 'exterior-noite', label: 'Noite Iluminada & Lareira', icon: Moon },
    { id: 'gourmet', label: 'Área Gourmet & Churrasco', icon: UtensilsCrossed },
    { id: 'interior', label: 'Interior Aconchegante', icon: BedDouble },
  ];

  const filteredPhotos = CHALET_PHOTOS.filter((photo) => {
    if (selectedFilter === 'all') return true;
    return photo.category === selectedFilter;
  });

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-stone-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-800 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Galeria 100% Real do Espaço
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Cada Detalhe Pensado Para o Seu Encanto
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Navegue pelas fotos reais do Chalé Maria Pitanga. Veja o sol radiante no deck, a piscina cristalina, a estrutura gourmet impecável e o aconchego das noites estreladas.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id as typeof selectedFilter)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-orange-600/20 scale-102'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200 shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => {
            const isWide = idx === 0 || (idx % 7 === 0 && idx !== 0);
            return (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxPhoto(photo)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-stone-200 border border-white/50 ${
                  isWide ? 'sm:col-span-2 sm:row-span-2 h-80 sm:h-[420px]' : 'h-64'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Quick Hover Zoom Icon */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Photo Tag & Time of Day */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {photo.timeOfDay === 'night' ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-950/80 text-indigo-200 backdrop-blur-sm border border-indigo-500/30 flex items-center gap-1">
                      🌙 Noturna
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/80 text-white backdrop-blur-sm flex items-center gap-1">
                      ☀️ Dia Ensolarado
                    </span>
                  )}
                </div>

                {/* Caption Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base leading-tight group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1 opacity-90">
                    Toque para ampliar em alta definição
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Action Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            ✨ Fotos 100% autênticas tiradas no próprio Chalé Maria Pitanga em Itaitú - Jacobina, BA.
          </p>
        </div>
      </div>

      {/* Lightbox Modal Viewer */}
      <LightboxModal
        photo={activeLightboxPhoto}
        photosList={filteredPhotos}
        onClose={() => setActiveLightboxPhoto(null)}
        onSelectPhoto={(photo) => setActiveLightboxPhoto(photo)}
      />
    </section>
  );
};
