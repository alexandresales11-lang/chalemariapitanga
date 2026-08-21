import React from 'react';
import { Sun, Moon, Sparkles, Flame, Waves } from 'lucide-react';

interface AtmosphereToggleProps {
  activeMode: 'day' | 'night';
  onChangeMode: (mode: 'day' | 'night') => void;
}

export const AtmosphereToggle: React.FC<AtmosphereToggleProps> = ({ activeMode, onChangeMode }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="bg-stone-900 text-white p-4 sm:p-5 rounded-3xl shadow-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl shadow-lg shrink-0">
            {activeMode === 'day' ? '☀️' : '🌙'}
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Experiência Visual Interativa:</span>
              <span className="text-amber-400 font-serif">
                {activeMode === 'day' ? 'Verão Ensolarado em Itaitú' : 'Noite Mágica com Fogueira'}
              </span>
            </h3>
            <p className="text-xs text-stone-300">
              {activeMode === 'day'
                ? 'Visualize a piscina cristalina sob o céu azul radiante e o deck com sol o dia todo.'
                : 'Descubra a iluminação cênica da piscina, a lareira externa sob as estrelas e o aconchego.'}
            </p>
          </div>
        </div>

        {/* Toggle Switch Buttons */}
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-800 border border-stone-700 shrink-0">
          <button
            onClick={() => onChangeMode('day')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeMode === 'day'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-200" />
            <span>Dia Ensolarado</span>
          </button>

          <button
            onClick={() => onChangeMode('night')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeMode === 'night'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-300" />
            <span>Noite Estrelada</span>
          </button>
        </div>
      </div>
    </div>
  );
};
