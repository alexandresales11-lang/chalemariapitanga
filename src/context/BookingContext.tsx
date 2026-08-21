import React, { createContext, useContext, useState, useMemo } from 'react';
import { CHALET_INFO, BOOKING_EXTRAS } from '../data/chaletData';

interface BookingContextType {
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestCount: number;
  selectedExtras: string[];
  guestName: string;
  specialNotes: string;
  baseNightRate: number;
  accommodationTotal: number;
  originalTotal: number;
  discountAmount: number;
  hasWeeklyDiscount: boolean;
  extrasTotal: number;
  grandTotal: number;
  perPersonTotal: number;
  perPersonPerNight: number;
  installment6x: number;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setNightsCount: (nights: number) => void;
  setGuestCount: (guests: number) => void;
  toggleExtra: (id: string) => void;
  setSelectedExtras: (extras: string[]) => void;
  setGuestName: (name: string) => void;
  setSpecialNotes: (notes: string) => void;
  generateWhatsAppLink: (source?: string) => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Helper to format Date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to add days to a date string
const addDaysToDate = (dateStr: string, days: number): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default Check-in: 28/08/2026 or upcoming weekend
  const [checkInDate, setCheckInDateState] = useState<string>(() => {
    return '2026-08-28';
  });

  // Default Check-out: 30/08/2026 (2 nights)
  const [checkOutDate, setCheckOutDateState] = useState<string>(() => {
    return '2026-08-30';
  });

  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [guestName, setGuestName] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Compute nights from dates
  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 2;
    const [y1, m1, d1] = checkInDate.split('-').map(Number);
    const [y2, m2, d2] = checkOutDate.split('-').map(Number);
    const start = new Date(y1, m1 - 1, d1);
    const end = new Date(y2, m2 - 1, d2);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  // Set Check-in and ensure Check-out is at least 1 day after
  const setCheckInDate = (newCheckIn: string) => {
    setCheckInDateState(newCheckIn);
    const currentNights = Math.max(1, nights);
    setCheckOutDateState(addDaysToDate(newCheckIn, currentNights));
  };

  // Set Check-out directly
  const setCheckOutDate = (newCheckOut: string) => {
    setCheckOutDateState(newCheckOut);
  };

  // Set duration by nights: shifts Check-out relative to Check-in
  const setNightsCount = (newNights: number) => {
    const validNights = Math.max(1, Math.min(30, newNights));
    setCheckOutDateState(addDaysToDate(checkInDate, validNights));
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 100% EXACT AIRBNB PRICING ENGINE:
  // Base fixed stay component: R$ 47.80
  // Base night rate (1 guest): R$ 794.60 / night
  // Additional guest fee: R$ 69.6364 / night per guest (from 2nd guest onwards)
  const FIXED_BASE_FEE = 47.8;
  const NIGHT_RATE_BASE = 794.6;
  const EXTRA_GUEST_RATE = 69.6363636;

  const extraGuestsCount = Math.max(0, guestCount - 1);
  const nightlyAccommodation = NIGHT_RATE_BASE + extraGuestsCount * EXTRA_GUEST_RATE;
  
  // Rate shown per night
  const baseNightRate = Math.round(nightlyAccommodation);

  // Subtotal before any length-of-stay discount
  const originalSubtotal = Math.round(FIXED_BASE_FEE + nightlyAccommodation * nights);

  // Weekly Discount (7+ nights) from Airbnb
  const hasWeeklyDiscount = nights >= 7;
  const discountAmount = hasWeeklyDiscount
    ? Math.round(originalSubtotal * 0.044659) // Exactly matches R$ 490 on R$ 10.972 -> R$ 10.482
    : 0;

  const accommodationTotal = originalSubtotal - discountAmount;
  const originalTotal = originalSubtotal;

  const extrasTotal = selectedExtras.reduce((acc, currId) => {
    const extra = BOOKING_EXTRAS.find((e) => e.id === currId);
    return acc + (extra ? extra.pricePerDay : 0);
  }, 0);

  const grandTotal = accommodationTotal + extrasTotal;
  const perPersonTotal = Math.round(grandTotal / (guestCount || 1));
  const perPersonPerNight = Math.round(perPersonTotal / (nights || 1));
  const installment6x = Math.round(grandTotal / 6);

  const generateWhatsAppLink = (source = 'simulador') => {
    const extrasListNames = selectedExtras
      .map((id) => BOOKING_EXTRAS.find((e) => e.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const formattedIn = checkInDate ? checkInDate.split('-').reverse().join('/') : '';
    const formattedOut = checkOutDate ? checkOutDate.split('-').reverse().join('/') : '';

    const text = `🌟 *SIMULAÇÃO OFICIAL - CHALÉ MARIA PITANGA* 🌴
Olá Haylla! Vim pelo site oficial e fiz uma simulação para o chalé:

👤 *Nome:* ${guestName || 'Hóspede'}
📅 *Entrada:* ${formattedIn || checkInDate}
📅 *Saída:* ${formattedOut || checkOutDate} (${nights} ${nights === 1 ? 'noite' : 'noites'})
👥 *Hóspedes:* ${guestCount} pessoas
✨ *Opcionais:* ${extrasListNames || 'Apenas o chalé'}
💰 *Valor Total:* ${hasWeeklyDiscount ? `De ~R$ ${originalTotal}~ por ` : ''}R$ ${grandTotal} (ou 6x de R$ ${installment6x} sem juros)
🏷️ *Por Pessoa:* Apenas R$ ${perPersonTotal}/pessoa pela estadia completa
${specialNotes ? `📝 *Observação:* ${specialNotes}\n` : ''}
Poderia me confirmar a disponibilidade dessas datas para eu garantir a reserva direta?`;

    return `https://wa.me/${CHALET_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <BookingContext.Provider
      value={{
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
        setNightsCount,
        setGuestCount,
        toggleExtra,
        setSelectedExtras,
        setGuestName,
        setSpecialNotes,
        generateWhatsAppLink,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
