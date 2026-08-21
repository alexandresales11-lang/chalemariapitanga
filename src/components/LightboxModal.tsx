import React, { useEffect, useRef, useState } from 'react';
import { ChaletPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Sparkles, MessageCircle, Maximize2, Share2 } from 'lucide-react';
import { CHALET_INFO } from '../data/chaletData';

interface LightboxModalProps {
  photo: ChaletPhoto | null;
  photosList: ChaletPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: ChaletPhoto) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photosList,
  onClose,
  onSelectPhoto,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photosList]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (photo && thumbnailsRef.current) {
      const activeEl = thumbnailsRef.current.querySelector(`[data-photo-id="${photo.id}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [photo]);

  if (!photo) return null;

  const currentIndex = photosList.findIndex((p) => p.id === photo.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photosList.length) % photosList.length;
    onSelectPhoto(photosList[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photosList.length;
    onSelectPhoto(photosList[nextIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal motion is clearly dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-2 sm:p-6 animate-in fade-in duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between z-20 text-white pt-2 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} de {photosList.length}
          </span>
          <span className="hidden sm:inline-block text-xs text-stone-300 font-medium">
            • Chalé Maria Pitanga (Itaitú - BA)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CHALET_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-transform active:scale-95 shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Consultar Data no WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Center Area with Image & Navigation */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2 sm:my-4">
        {/* Prev Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 transition-all z-20 shadow-xl cursor-pointer"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Main Image View */}
        <div className="relative max-h-[65vh] sm:max-h-[70vh] flex flex-col items-center justify-center px-8">
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.title}
            className="max-h-[58vh] sm:max-h-[66vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/15 animate-in zoom-in-95 duration-200"
            referrerPolicy="no-referrer"
          />
          {/* Caption */}
          <div className="mt-2.5 text-center max-w-xl px-2">
            <h4 className="text-white font-bold text-sm sm:text-base font-serif">{photo.title}</h4>
            <p className="text-stone-400 text-xs mt-0.5">
              {photo.timeOfDay === 'night' ? '🌙 Noite Iluminada & Lareira' : '☀️ Dia Ensolarado & Piscina'} • Itaitú, Jacobina - BA
            </p>
          </div>
        </div>

        {/* Next Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 transition-all z-20 shadow-xl cursor-pointer"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Bottom Thumbnails Strip for Quick Jump */}
      <div className="w-full max-w-5xl px-2 pb-2">
        <div
          ref={thumbnailsRef}
          className="flex items-center gap-2 overflow-x-auto py-2 px-1 no-scrollbar justify-start sm:justify-center"
        >
          {photosList.map((p, idx) => {
            const isSelected = p.id === photo.id;
            return (
              <button
                key={p.id}
                data-photo-id={p.id}
                onClick={() => onSelectPhoto(p)}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={p.url}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

