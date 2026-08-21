import React, { useState } from 'react';
import { AMENITIES_CATEGORIES } from '../data/chaletData';
import { Check, Sparkles, Waves, Flame, Sun, ShowerHead, Trees, Armchair, UtensilsCrossed, Users, Refrigerator, CookingPot, Zap, Wine, Coffee, Wind, BedDouble, BedSingle, Layers, Bath, Archive, Wifi, Speaker, Tv, Car, ShieldCheck, Gamepad2, Search } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Waves,
  Flame,
  Sun,
  ShowerHead,
  Trees,
  Armchair,
  UtensilsCrossed,
  Users,
  Refrigerator,
  CookingPot,
  Zap,
  Wine,
  Coffee,
  Wind,
  BedDouble,
  BedSingle,
  Layers,
  Sparkles,
  Bath,
  Archive,
  Wifi,
  Speaker,
  Tv,
  Car,
  ShieldCheck,
  Gamepad2,
};

export const AmenitiesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section id="comodidades" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30">
            Estrutura Completa
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Tudo o Que Você Precisa Para Não Se Preocupar Com Nada
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            O Chalé Maria Pitanga é 100% equipado para oferecer máximo conforto, lazer e praticidade para sua família e amigos.
          </p>

          {/* Search bar inside amenities */}
          <div className="max-w-md mx-auto pt-2 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar comodidade (ex: ar condicionado, piscina, taças...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:border-amber-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AMENITIES_CATEGORIES.map((category, catIdx) => {
            const filteredItems = category.items.filter((item) =>
              searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) || (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) : true
            );

            if (filteredItems.length === 0) return null;

            return (
              <div
                key={catIdx}
                className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5"
              >
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {category.category}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredItems.map((item, itemIdx) => {
                    const IconComponent = ICON_MAP[item.icon] || Check;
                    return (
                      <div
                        key={itemIdx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                          item.highlight
                            ? 'bg-amber-500/10 border-amber-300/80 text-stone-900'
                            : 'bg-white border-stone-200/80 text-stone-800'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            item.highlight ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
