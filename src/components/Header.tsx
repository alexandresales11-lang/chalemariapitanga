import React, { useState, useEffect } from 'react';
import { CHALET_INFO } from '../data/chaletData';
import { Phone, Instagram, Calendar, Sparkles, Menu, X, ShieldCheck, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O Chalé', href: '#sobre' },
    { label: 'Fotos & Vídeo', href: '#galeria' },
    { label: 'Espaços & Lazer', href: '#espacos' },
    { label: 'Depoimentos Reais', href: '#depoimentos' },
    { label: 'Comodidades', href: '#comodidades' },
    { label: 'Cachoeiras', href: '#itaitu' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Urgency Top Notification Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white text-xs sm:text-sm font-medium py-1.5 px-3 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center justify-center p-1 bg-white/20 rounded-full animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            </span>
            <span className="truncate">
              <strong>Agenda aberta para a temporada!</strong> Garanta seu fim de semana no refúgio mais desejado de Itaitú.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold shrink-0">
            <span className="flex items-center gap-1 opacity-90">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 100% Exclusivo & Privativo
            </span>
            <a
              href={CHALET_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition text-amber-100 underline decoration-amber-300"
            >
              Fale com Haylla
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-900/95 backdrop-blur-md text-white shadow-xl py-3 border-b border-stone-800/80'
            : 'bg-white/95 backdrop-blur-md text-stone-800 py-4 shadow-xs border-b border-amber-100/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl sm:text-2xl">🌴</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight leading-none bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                  Maria Pitanga
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Chalé A-Frame
                </span>
              </div>
              <p className="text-[11px] font-medium opacity-75 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-rose-500" /> Itaitú, Jacobina - Bahia
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-500 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Instagram Link */}
            <a
              href={CHALET_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-amber-500/10 text-rose-600 transition"
              title="Instagram Oficial: @chalemariapitangaitaitu"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* CTA Button */}
            <button
              id="header-reserve-btn"
              onClick={onOpenBooking}
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Simular Estadia</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-current hover:bg-black/5"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 text-white border-b border-stone-800 px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3.5 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-stone-800 hover:text-amber-400 transition"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Calcular Valor & Reservar
              </button>
              <a
                href={CHALET_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-5 h-5" />
                Falar com Haylla no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
