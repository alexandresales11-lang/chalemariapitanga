import React, { useState, useEffect } from 'react';
import { CHALET_INFO } from '../data/chaletData';
import { useBooking } from '../context/BookingContext';
import { MessageCircle, Calendar, Star, Users, Flame } from 'lucide-react';

interface StickyBookingBarProps {
  onOpenBooking: () => void;
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);
  const { grandTotal, perPersonTotal, guestCount, nights, installment6x, generateWhatsAppLink } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (~400px)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const handleWhatsApp = () => {
    const link = generateWhatsAppLink('sticky');
    window.open(link, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md text-white border-t border-amber-500/30 py-3 px-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left chalet info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden hidden sm:block border border-amber-400 shrink-0">
            <img
              src="https://i.imgur.com/N9VQkP6.jpeg"
              alt="Chalé Maria Pitanga"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-white">Chalé Maria Pitanga</span>
              <span className="hidden md:inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-400/30">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0
              </span>
            </div>
            <p className="text-[11px] text-stone-400 flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-300 font-bold">Total: R$ {grandTotal.toLocaleString('pt-BR')}</span>
              <span className="text-emerald-400 font-semibold">(6x R$ {installment6x})</span>
              <span>•</span>
              <span className="text-stone-300">R$ {perPersonTotal}/pessoa ({nights}n • {guestCount}p)</span>
            </p>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="hidden md:flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/40 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Personalizar Estadia</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Reservar no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

