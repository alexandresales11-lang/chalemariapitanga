import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { SpacesTour } from './components/SpacesTour';
import { TestimonialsHub } from './components/TestimonialsHub';
import { BookingCalculator } from './components/BookingCalculator';
import { AmenitiesSection } from './components/AmenitiesSection';
import { HostSection } from './components/HostSection';
import { LocalGuide } from './components/LocalGuide';
import { FAQSection } from './components/FAQSection';
import { StickyBookingBar } from './components/StickyBookingBar';
import { Footer } from './components/Footer';
import { CHALET_INFO } from './data/chaletData';
import { ShieldCheck, Heart, Sparkles, Star, Users, Waves, Flame, Bath, MapPin, CheckCircle2, ChevronRight, Phone } from 'lucide-react';

export default function App() {
  const scrollToBooking = () => {
    const el = document.getElementById('reservar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('galeria');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-stone-850">
        {/* Header with Navigation & Live Bar */}
        <Header onOpenBooking={scrollToBooking} />

        {/* Hero Section */}
        <Hero
          onOpenBooking={scrollToBooking}
          onExploreGallery={scrollToGallery}
        />

        {/* Quick Trust Highlights Banner */}
        <section id="sobre" className="py-8 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-lg relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              <div className="p-2 space-y-1">
                <div className="font-serif font-black text-2xl sm:text-3xl text-amber-200">100%</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Exclusivo & Privativo</p>
              </div>
              <div className="p-2 space-y-1">
                <div className="font-serif font-black text-2xl sm:text-3xl text-amber-200">12</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Hóspedes no Total</p>
              </div>
              <div className="p-2 space-y-1">
                <div className="font-serif font-black text-2xl sm:text-3xl text-amber-200">4</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Banheiros Completos</p>
              </div>
              <div className="p-2 space-y-1">
                <div className="font-serif font-black text-2xl sm:text-3xl text-amber-200">5.0 ⭐</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Nota no Airbnb</p>
              </div>
              <div className="p-2 space-y-1">
                <div className="font-serif font-black text-2xl sm:text-3xl text-amber-200">Industrial</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Ar Potente Que Gela</p>
              </div>
              <div className="p-2 space-y-1">
                <div className="font-serif font-black text-2xl sm:text-3xl text-amber-200">3 Vagas</div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Estacionamento Grátis</p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery with Filter & Lightbox */}
        <PhotoGallery />

        {/* Spaces Tour (Piscina, Mezanino, Gourmet, Lareira, Banheiros) */}
        <SpacesTour />

        {/* Real Social Proof, Audio Voice Notes & WhatsApp Reviews Hub */}
        <TestimonialsHub />

        {/* Interactive Booking & Pricing Calculator */}
        <BookingCalculator />

        {/* Full Amenities Checklist */}
        <AmenitiesSection />

        {/* Host Section with Haylla Yasmmin */}
        <HostSection />

        {/* Local Guide */}
        <LocalGuide />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final Urgency Call to Action Banner */}
        <section className="py-16 bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              ✨ Sua Melhor Viagem Começa Aqui
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pronto Para Viver Dias Incríveis no Chalé Maria Pitanga?
            </h2>
            <p className="text-stone-100 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Consulte as datas disponíveis agora mesmo no WhatsApp e garanta sua reserva direta com a anfitriã Haylla sem intermediários.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={CHALET_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-stone-900 hover:bg-black text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 transition-transform transform active:scale-95"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>Chamar Haylla no WhatsApp (74) 98835-9752</span>
              </a>
              <button
                onClick={scrollToBooking}
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/40 font-bold text-sm sm:text-base px-6 py-4 rounded-2xl transition cursor-pointer"
              >
                Simular Valores
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Sticky Bottom Bar for High Conversions */}
        <StickyBookingBar onOpenBooking={scrollToBooking} />
      </div>
    </BookingProvider>
  );
}
