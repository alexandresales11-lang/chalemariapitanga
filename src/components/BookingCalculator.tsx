import React from 'react';
import { CHALET_INFO, BOOKING_EXTRAS } from '../data/chaletData';
import { useBooking } from '../context/BookingContext';
import { Calendar, Users, Sparkles, Check, Phone, ShieldCheck, MessageSquare, Heart, Clock, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingCalculatorProps {
  onClose?: () => void;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = () => {
  const {
    checkInDate,
    checkOutDate,
    nights,
    guestCount,
    selectedExtras,
    guestName,
    specialNotes,
    baseNightRate,
    accommodationTotal,
    originalTotal,
    discountAmount,
    hasWeeklyDiscount,
    extrasTotal,
    grandTotal,
    perPersonTotal,
    perPersonPerNight,
    installment6x,
    setCheckInDate,
    setCheckOutDate,
    setGuestCount,
    toggleExtra,
    setGuestName,
    setSpecialNotes,
    generateWhatsAppLink,
  } = useBooking();

  const handleReserveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#BE4528', '#38BDF8'],
      });
    } catch {
      // ignore
    }

    const link = generateWhatsAppLink('calculadora');
    window.open(link, '_blank');
  };

  return (
    <section id="reservar" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Simulador de Estadia & Reserva Imediata
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Reserve Seus Dias Inesquecíveis em Itaitú
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Selecione as datas, número de hóspedes e monte seu pacote personalizado. Garantia de melhor tarifa falando direto com a anfitriã Haylla.
          </p>
        </div>

        {/* Two-Column Grid: Left Controls, Right Summary & WhatsApp CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-stone-850 rounded-3xl p-5 sm:p-8 border border-stone-700 shadow-2xl space-y-6 overflow-hidden">
            <h3 className="font-serif font-bold text-xl text-amber-400 flex items-center gap-2">
              <Calendar className="w-5 h-5 shrink-0" /> 1. Escolha as Datas e Hóspedes
            </h3>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Data de Chegada (Check-in a partir das 14h)
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full max-w-full block box-border bg-stone-800 text-white px-3.5 py-3 rounded-2xl border border-stone-600 focus:border-amber-500 focus:outline-hidden text-sm cursor-pointer"
                />
              </div>

              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Data de Saída (Check-out até as 12h)
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full max-w-full block box-border bg-stone-800 text-white px-3.5 py-3 rounded-2xl border border-stone-600 focus:border-amber-500 focus:outline-hidden text-sm cursor-pointer"
                />
              </div>
            </div>

            {/* Guest Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400" /> Quantidade de Pessoas:
                </span>
                <span className="text-amber-400 font-bold text-sm">{guestCount} hóspedes</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full h-2.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                <span>1 pessoa</span>
                <span>6 pessoas</span>
                <span>12 pessoas (Capacidade Máxima)</span>
              </div>
            </div>

            {/* Custom Extras Section */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-lg text-amber-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> 2. Personalize com Experiências
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BOOKING_EXTRAS.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                          : 'bg-stone-800/60 hover:bg-stone-800 border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs sm:text-sm text-white">{extra.title}</div>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                            isSelected ? 'bg-amber-400 text-stone-900 font-bold' : 'border border-stone-500'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1 leading-snug">{extra.description}</p>
                      <div className="text-xs font-bold text-amber-300 mt-2">
                        {extra.pricePerDay === 0 ? '✨ Incluso Grátis' : `+ R$ ${extra.pricePerDay}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Identification inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 w-full">
              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-stone-300 mb-1">Seu Nome Completo:</label>
                <input
                  type="text"
                  placeholder="Ex: Amanda Silva"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full max-w-full block box-border bg-stone-800 text-white px-3.5 py-2.5 rounded-xl border border-stone-700 focus:border-amber-500 text-xs"
                />
              </div>

              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-stone-300 mb-1">Motivo / Ocasião (Opcional):</label>
                <input
                  type="text"
                  placeholder="Ex: Aniversário em família, Férias..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full max-w-full block box-border bg-stone-800 text-white px-3.5 py-2.5 rounded-xl border border-stone-700 focus:border-amber-500 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-stone-850 to-stone-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/40 shadow-2xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-stone-700 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Resumo da Estadia</span>
                <h4 className="font-serif font-bold text-xl text-white">Chalé Maria Pitanga</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">{nights} noites</span>
                <div className="text-xs text-emerald-400 font-semibold">100% Exclusivo</div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-300">
                <span>Diárias ({nights} noites x R$ {baseNightRate}):</span>
                <span className="font-semibold text-white">
                  R$ {originalTotal.toLocaleString('pt-BR')}
                </span>
              </div>

              {hasWeeklyDiscount && (
                <div className="flex justify-between text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20 text-xs">
                  <span>Desconto semanal (7+ noites):</span>
                  <span>- R$ {discountAmount.toLocaleString('pt-BR')}</span>
                </div>
              )}

              {extrasTotal > 0 && (
                <div className="flex justify-between text-stone-300">
                  <span>Opcionais selecionados:</span>
                  <span className="font-semibold text-amber-400">+ R$ {extrasTotal}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-400 text-xs font-semibold pt-1 border-t border-stone-700/60">
                <span>Taxa de limpeza & uso da piscina:</span>
                <span>Inclusa</span>
              </div>

              <div className="flex justify-between text-emerald-400 text-xs font-semibold">
                <span>Estacionamento 3 carros:</span>
                <span>Grátis</span>
              </div>
            </div>

            {/* Highlighted Value Per Person Callout */}
            <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-2xl space-y-1 text-center">
              <span className="text-xs text-stone-300">Dividindo entre os {guestCount} hóspedes:</span>
              <div className="font-serif font-black text-2xl sm:text-3xl text-amber-400">
                R$ {perPersonTotal} <span className="text-xs font-sans text-stone-300 font-normal">/ pessoa pela estadia toda</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Apenas ~R$ {perPersonPerNight}/dia por pessoa para desfrutar de um chalé paradisíaco privativo!
              </p>
            </div>

            {/* Total Estimated Box */}
            <div className="border-t border-stone-700 pt-3 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-stone-200">Total:</span>
                <div className="flex items-baseline gap-2">
                  {hasWeeklyDiscount && (
                    <span className="line-through text-stone-400 text-base font-normal">
                      R$ {originalTotal.toLocaleString('pt-BR')}
                    </span>
                  )}
                  <span className="font-serif text-2xl sm:text-3xl font-black text-amber-400">
                    R$ {grandTotal.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
              <div className="text-xs text-emerald-400 font-semibold text-right">
                Ou 6x R$ {installment6x.toLocaleString('pt-BR')} sem juros
              </div>
            </div>

            {/* Free Cancellation Notice Badge */}
            <div className="bg-stone-800/80 border border-stone-700 p-2.5 rounded-xl text-center text-xs text-stone-300">
              <span className="text-emerald-400 font-medium">✓ Cancelamento flexível</span> • Reserve direto com a anfitriã sem taxa extra
            </div>

            {/* Direct WhatsApp Reserve Action */}
            <button
              id="calculator-submit-btn"
              onClick={handleReserveWhatsApp}
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-3 text-sm sm:text-base transition-transform transform active:scale-98"
            >
              <Phone className="w-5 h-5 fill-white" />
              <span>Garantir Reserva no WhatsApp</span>
            </button>

            {/* Host Quick Reassurance */}
            <div className="flex items-center gap-3 pt-2 border-t border-stone-800 text-xs text-stone-400">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400 shrink-0 bg-stone-900">
                <img
                  src={CHALET_INFO.host.photo}
                  alt={CHALET_INFO.host.name}
                  className="w-full h-full object-cover scale-[1.38] translate-y-0.5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-stone-200 font-semibold block">Haylla Yasmmin (Anfitriã)</span>
                <span>Responde em média em menos de 5 minutos!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
