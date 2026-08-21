import React, { useState, useEffect, useRef } from 'react';
import { CHALET_INFO, CHALET_PHOTOS } from '../data/chaletData';
import { ChaletPhoto } from '../types';
import { LightboxModal } from './LightboxModal';
import { useBooking } from '../context/BookingContext';
import {
  Star,
  Users,
  Bath,
  Flame,
  Waves,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Eye,
  Camera,
} from 'lucide-react';
import { soundscape } from '../utils/audioVibes';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreGallery,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const unsubscribe = soundscape.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => unsubscribe();
  }, []);

  // Synchronized booking state & pricing engine
  const {
    guestCount,
    setGuestCount,
    nights,
    setNightsCount,
    baseNightRate,
    grandTotal,
    originalTotal,
    hasWeeklyDiscount,
    perPersonTotal,
    installment6x,
    generateWhatsAppLink,
  } = useBooking();

  // Hero carousel state
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<ChaletPhoto | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentPhoto = CHALET_PHOTOS[currentPhotoIdx] || CHALET_PHOTOS[0];

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + CHALET_PHOTOS.length) % CHALET_PHOTOS.length);
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % CHALET_PHOTOS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal movement is dominant and significant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX > 0) {
        handlePrevPhoto();
      } else {
        handleNextPhoto();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const openFullscreenPhoto = (photo: ChaletPhoto) => {
    setLightboxPhoto(photo);
  };

  const toggleSoundscape = () => {
    soundscape.toggleSound('summer-day');
  };

  const handleQuickWhatsApp = () => {
    const link = generateWhatsAppLink('hero');
    window.open(link, '_blank');
  };

  // Reusable Hero Visual Carousel Card Component
  const renderChaletPhotoCard = (isMobile: boolean) => (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-stone-900 group cursor-pointer select-none transition-all duration-300 ${
        isMobile ? 'my-2' : ''
      }`}
      onClick={() => openFullscreenPhoto(currentPhoto)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Active Photo with Smooth Transition */}
      <img
        key={currentPhoto.id}
        src={currentPhoto.url}
        alt={currentPhoto.title}
        className={`w-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ${
          isMobile ? 'h-[280px] xs:h-[320px] sm:h-[380px]' : 'h-[440px] lg:h-[500px]'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Gradient Sun & Night Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

      {/* Top Floating Left: Status Tag & Photo Index */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-stone-900 font-sans">Foto Real</span>
        </div>

        <div className="bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white text-[10px] font-bold flex items-center gap-1">
          <Camera className="w-3 h-3 text-amber-400" />
          <span>
            {currentPhotoIdx + 1}/{CHALET_PHOTOS.length}
          </span>
        </div>
      </div>

      {/* Top Floating Right: Host Micro Badge + Expand Icon */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        <div className="hidden xs:flex bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 items-center gap-1.5 text-white text-[11px] font-semibold">
          <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-400">
            <img
              src={CHALET_INFO.host.photo}
              alt={CHALET_INFO.host.name}
              className="w-full h-full object-cover scale-[1.35]"
              referrerPolicy="no-referrer"
            />
          </div>
          <span>Haylla</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openFullscreenPhoto(currentPhoto);
          }}
          className="bg-amber-500/90 hover:bg-amber-400 text-stone-950 p-1.5 sm:p-2 rounded-full shadow-lg transition-transform active:scale-90 flex items-center justify-center cursor-pointer"
          title="Clique para expandir em tela cheia"
          aria-label="Expandir foto em tela cheia"
        >
          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrevPhoto}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/30 flex items-center justify-center transition-all z-10 active:scale-90 shadow-lg cursor-pointer"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNextPhoto}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/30 flex items-center justify-center transition-all z-10 active:scale-90 shadow-lg cursor-pointer"
        aria-label="Próxima foto"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Quick Carousel Progress Dots (First 8 key spots) */}
      <div className="absolute bottom-16 sm:bottom-18 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
        {CHALET_PHOTOS.slice(0, 10).map((_, idx) => (
          <span
            key={idx}
            className={`transition-all duration-300 rounded-full ${
              idx === currentPhotoIdx % 10
                ? 'w-5 h-1.5 bg-amber-400 shadow-sm'
                : 'w-1.5 h-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Bottom Card Overlay on Image */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 bg-stone-900/90 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-white/20 text-white space-y-1 z-10">
        <div className="flex items-center justify-between">
          <div className="truncate pr-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              {currentPhoto.timeOfDay === 'night' ? '🌙 Noite & Lareira' : '☀️ Dia Ensolarado'} • Itaitú
            </span>
            <h4 className="text-xs sm:text-sm font-bold font-serif leading-tight truncate">
              {currentPhoto.title}
            </h4>
          </div>
          <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-400/40 text-amber-300 font-bold text-[11px] shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>5.0</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1 border-t border-stone-800">
          <span className="flex items-center gap-1 text-stone-400">
            <Eye className="w-3 h-3 text-amber-400" />
            <span>Toque para tela cheia</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openFullscreenPhoto(currentPhoto);
            }}
            className="text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-0.5 cursor-pointer"
          >
            Ver Todas ({CHALET_PHOTOS.length})
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20">
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Grid: Main Pitch & Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Compelling Headline, Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15] sm:leading-[1.1]">
                Seu Refúgio de Verão <br />
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Inesquecível em Itaitú.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-stone-700 leading-relaxed max-w-2xl font-normal">
                Piscina privativa cristalina sob o sol radiante da Bahia, cabana A-frame charmosa, área gourmet completa para seu churrasco e ar-condicionado industrial potente.
              </p>
            </div>

            {/* Mobile-First Interactive Photo Carousel: Displayed right here on mobile so visitors can flick through photos immediately */}
            <div className="block lg:hidden">{renderChaletPhotoCard(true)}</div>

            {/* Badges & Credibility Row — Positioned directly AFTER the chalet photo */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Itaitú - Jacobina, Bahia
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-800 border border-rose-500/20">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                5.0 Superhost (140+ avaliações 5 estrelas)
              </span>

              <button
                onClick={toggleSoundscape}
                className={`text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-xs border cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse'
                    : 'bg-white/90 hover:bg-white text-stone-700 border-stone-200'
                }`}
                title="Ativar som ambiente da natureza"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-200 animate-bounce" />
                    <span>Tocando Vibe de Verão 🌴</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                    <span>Ouvir Ambiente 🎵</span>
                  </>
                )}
              </button>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-400/30 text-orange-900 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-orange-600" />
                Acomodação dos Sonhos com Privacidade Total
              </div>
            </div>

            {/* Key Specs Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-amber-100/90 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-orange-600 font-bold text-sm">
                  <Users className="w-4 h-4" /> Até 12 pessoas
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">8 camas + colchões</span>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-amber-100/90 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-sky-600 font-bold text-sm">
                  <Waves className="w-4 h-4" /> Piscina Exclusiva
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">Deck & espreguiçadeiras</span>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-amber-100/90 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                  <Bath className="w-4 h-4" /> 4 Banheiros
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">Conforto sem filas</span>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-amber-100/90 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                  <Flame className="w-4 h-4" /> Área Gourmet
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">Churrasqueira + freezer</span>
              </div>
            </div>

            {/* Quick Interactive Price Calculator Card - Synchronized with Main Calculator */}
            <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white p-5 sm:p-6 rounded-3xl shadow-xl border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">⚡</span>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">Simulador Oficial de Estadia</h3>
                    <p className="text-[11px] text-stone-400">
                      R$ {baseNightRate}/noite • {guestCount} {guestCount === 1 ? 'hóspede' : 'hóspedes'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-serif flex items-center justify-end gap-1.5 flex-wrap">
                    <span className="text-white text-base">Total:</span>
                    {hasWeeklyDiscount && (
                      <span className="line-through text-stone-400 text-sm sm:text-base font-normal">
                        R$ {originalTotal.toLocaleString('pt-BR')}
                      </span>
                    )}
                    <span>R$ {grandTotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    Ou 6x R$ {installment6x.toLocaleString('pt-BR')} sem juros
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Apenas <span className="text-white font-semibold">R$ {perPersonTotal}/pessoa</span> total
                  </div>
                </div>
              </div>

              {/* Sliders / Quick Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-stone-300">Número de Hóspedes:</span>
                    <span className="text-amber-400 font-bold">{guestCount} {guestCount === 1 ? 'pessoa' : 'pessoas'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-0.5">
                    <span>1 (Individual)</span>
                    <span>6 (Família)</span>
                    <span>12 (Grupo Max)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-stone-300">Duração da Estadia:</span>
                    <span className="text-amber-400 font-bold">{nights} {nights === 1 ? 'noite' : 'noites'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={nights}
                    onChange={(e) => setNightsCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-0.5">
                    <span>1 noite</span>
                    <span>Fim de semana (2n)</span>
                    <span>Semana (7n+)</span>
                  </div>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  id="hero-whatsapp-btn"
                  onClick={handleQuickWhatsApp}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Consultar com Haylla no Zap</span>
                </button>

                <button
                  id="hero-full-calculator-btn"
                  onClick={onOpenBooking}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Ver Detalhes & Personalizar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Micro guarantees */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Atendimento direto com a anfitriã
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sem taxas ocultas
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Reserva garantida e segura
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            {renderChaletPhotoCard(false)}

            {/* Floating Quick Feature Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-amber-100 items-center gap-3 animate-in fade-in slide-in-from-bottom duration-500 z-20">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                🥩
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Área Gourmet Completa</div>
                <div className="text-[11px] text-stone-500">Com kit churrasco e freezer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal triggered directly from the Hero Photo */}
      <LightboxModal
        photo={lightboxPhoto}
        photosList={CHALET_PHOTOS}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(photo) => {
          setLightboxPhoto(photo);
          const idx = CHALET_PHOTOS.findIndex((p) => p.id === photo.id);
          if (idx !== -1) setCurrentPhotoIdx(idx);
        }}
      />
    </section>
  );
};

