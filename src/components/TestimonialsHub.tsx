import React, { useState } from 'react';
import { TESTIMONIALS_VOICE_NOTES, WHATSAPP_REVIEWS, DIRECT_REVIEWS } from '../data/chaletData';
import { AudioVoicePlayer } from './AudioVoicePlayer';
import { WhatsAppChatCard } from './WhatsAppChatCard';
import { Star, ShieldCheck, Heart, Sparkles, MessageCircle, Volume2, Award, ThumbsUp } from 'lucide-react';

export const TestimonialsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'audios' | 'whatsapp' | 'airbnb'>('all');

  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-amber-50/50 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Authority Badges */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-orange-900 border border-orange-400/40 shadow-xs">
            <Award className="w-4 h-4 text-orange-600" />
            Experiências Reais & Comprovadas
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Quem Se Hospeda, Se Apaixona.
          </h2>

          <p className="text-stone-700 text-sm sm:text-base">
            Mais de 140 estadias perfeitas em Itaitú. Ouça áudios reais de hóspedes, veja prints de WhatsApp e comprove por que o Chalé Maria Pitanga é nota máxima.
          </p>

          {/* Social Proof Scoreboard */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">5.0 de Avaliação Média</span>
            </div>

            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-stone-800">100% de Satisfação no Check-in</span>
            </div>

            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-xs font-bold text-stone-800">Mais de 140 Grupos Felizes</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2.5 mb-10 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🌟 Ver Todos os Depoimentos
          </button>
          <button
            onClick={() => setActiveTab('audios')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-all ${
              activeTab === 'audios'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Volume2 className="w-4 h-4 text-emerald-500" />
            <span>Áudios dos Hóspedes ({TESTIMONIALS_VOICE_NOTES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Prints de WhatsApp ({WHATSAPP_REVIEWS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('airbnb')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-all ${
              activeTab === 'airbnb'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Star className="w-4 h-4 text-rose-500" />
            <span>Avaliações Escritas ({DIRECT_REVIEWS.length})</span>
          </button>
        </div>

        {/* 1. Voice Notes Section */}
        {(activeTab === 'all' || activeTab === 'audios') && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Depoimentos em Áudio (Dê o Play)
                </h3>
                <p className="text-xs text-stone-500">Ouça o que os hóspedes relataram logo após a estadia</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS_VOICE_NOTES.map((voiceNote) => (
                <AudioVoicePlayer key={voiceNote.id} voiceNote={voiceNote} />
              ))}
            </div>
          </div>
        )}

        {/* 2. WhatsApp Direct Chat Prints Section */}
        {(activeTab === 'all' || activeTab === 'whatsapp') && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#128C7E] flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Mensagens Diretas no WhatsApp
                </h3>
                <p className="text-xs text-stone-500">Conversas reais de agradecimento e feedback com a Haylla</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WHATSAPP_REVIEWS.map((review) => (
                <WhatsAppChatCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {/* 3. Detailed Written Reviews Section */}
        {(activeTab === 'all' || activeTab === 'airbnb') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Avaliações Verificadas
                </h3>
                <p className="text-xs text-stone-500">Hóspedes que viveram a experiência completa</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DIRECT_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-11 h-11 rounded-full object-cover border border-amber-300"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm font-serif">{review.author}</h4>
                          <span className="text-[11px] text-stone-500">{review.city} • {review.date}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                      "{review.content}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                    {review.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
