export interface ChaletPhoto {
  id: string;
  url: string;
  title: string;
  category: 'exterior-dia' | 'exterior-noite' | 'interior' | 'piscina' | 'gourmet';
  timeOfDay: 'day' | 'night' | 'all';
  featured?: boolean;
}

export interface AmenityItem {
  icon: string;
  name: string;
  description?: string;
  highlight?: boolean;
}

export interface AmenityCategory {
  category: string;
  description: string;
  items: AmenityItem[];
}

export interface TestimonialVoiceNote {
  id: string;
  author: string;
  avatar: string;
  location: string;
  duration: string;
  timeAgo: string;
  transcript: string;
  rating: number;
  highlightTag: string;
  photoUrl?: string;
}

export interface WhatsAppReview {
  id: string;
  senderName: string;
  senderPhoneMasked: string;
  time: string;
  message: string;
  reply?: string;
  avatarColor: string;
  stars: number;
  groupType: 'Família' | 'Grupo de Amigos' | 'Casal' | 'Aniversário';
  verifiedGuest: boolean;
}

export interface DirectReview {
  id: string;
  author: string;
  city: string;
  date: string;
  avatar: string;
  content: string;
  rating: number;
  tags: string[];
  guestCount: number;
}

export interface LocalAttraction {
  name: string;
  distance: string;
  type: string;
  description: string;
  difficulty: 'Fácil' | 'Moderada' | 'Leve';
  highlight: string;
  image?: string;
}

export interface BookingOption {
  id: string;
  title: string;
  pricePerDay: number;
  description: string;
  icon: string;
}
