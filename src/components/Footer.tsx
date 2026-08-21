import React from 'react';
import { CHALET_INFO } from '../data/chaletData';
import { Instagram, Phone, MapPin, Heart, ShieldCheck, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">
                🌴
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-white">Chalé Maria Pitanga</h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  Itaitú • Jacobina, Bahia
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              O chalé A-frame dos seus sonhos para viver momentos inesquecíveis em família ou com amigos. Piscina privativa, área gourmet completa, ar-condicionado industrial e toda a magia das cachoeiras de Itaitú.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CHALET_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/40 transition"
                title="Instagram Oficial"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={CHALET_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-[#25D366] hover:bg-emerald-500/20 hover:border-emerald-500/40 transition"
                title="WhatsApp Oficial"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Direct Contact & Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-amber-400 uppercase tracking-wider">
              Informações de Contato
            </h4>

            <div className="space-y-2 text-xs sm:text-sm text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Itaitú, Jacobina - Bahia, Brasil (A poucos minutos da Praça e das Cachoeiras)</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {CHALET_INFO.whatsappFormatted}</span>
              </p>

              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Instagram: @{CHALET_INFO.instagram}</span>
              </p>

              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Anfitriã Responsável: {CHALET_INFO.host.name}</span>
              </p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-amber-400 uppercase tracking-wider">
              Navegação Rápida
            </h4>

            <div className="flex flex-col gap-2 text-xs text-stone-400">
              <a href="#sobre" className="hover:text-amber-300 transition">O Espaço & Capacidade</a>
              <a href="#galeria" className="hover:text-amber-300 transition">Galeria de Fotos (25+)</a>
              <a href="#espacos" className="hover:text-amber-300 transition">Piscina, Gourmet & Deck</a>
              <a href="#depoimentos" className="hover:text-amber-300 transition">Depoimentos & Áudios Reais</a>
              <a href="#itaitu" className="hover:text-amber-300 transition">Cachoeiras de Itaitú</a>
              <a href="#reservar" className="hover:text-amber-300 transition">Simulador de Diárias</a>
              <a href="#faq" className="hover:text-amber-300 transition">Dúvidas Frequentes</a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-stone-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Chalé Maria Pitanga. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-stone-400">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para proporcionar estadias inesquecíveis em Itaitú, Bahia.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
