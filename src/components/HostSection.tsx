import React from 'react';
import { CHALET_INFO } from '../data/chaletData';
import { Star, ShieldCheck, Heart, MessageCircle, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const HostSection: React.FC = () => {
  const { host } = CHALET_INFO;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-white relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-stone-850/80 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-amber-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Host Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-stone-900 shadow-2xl bg-stone-900">
                <img
                  src={host.photo}
                  alt={host.name}
                  className="w-full h-full object-cover scale-[1.38] translate-y-1 transition duration-500 group-hover:scale-[1.44]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-900 p-2 rounded-full shadow-lg border-2 border-stone-900 z-10">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h3 className="font-serif font-black text-2xl text-white">{host.name}</h3>
              <p className="text-amber-400 font-semibold text-xs tracking-wider uppercase mt-0.5">
                {host.role} • Chalé Maria Pitanga
              </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                5.0 Avaliação
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Superhost
              </span>
            </div>
          </div>

          {/* Right: Message & Host Philosophy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Hospitalidade com Amor e Cuidado em Cada Detalhe
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                "Nosso propósito é que você sinta a magia, a paz e o calor de Itaitú."
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {host.bio}
              </p>
            </div>

            {/* Host Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Limpeza e Higiene Padrão 5 Estrelas</h4>
                  <p className="text-[11px] text-stone-400">Roupas de cama perfumadas, piscina higienizada e cheirinho de acolhimento.</p>
                </div>
              </div>

              <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700/80 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Suporte Rápido e Atenção Total</h4>
                  <p className="text-[11px] text-stone-400">Atendimento personalizado antes, durante e após a sua estadia.</p>
                </div>
              </div>

              <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">Dicas Exclusivas de Cachoeiras</h4>
                  <p className="text-[11px] text-stone-400">Roteiros sob medida para você conhecer os melhores segredos de Itaitú.</p>
                </div>
              </div>

              <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">100% de Satisfação no Check-in</h4>
                  <p className="text-[11px] text-stone-400">Recepção pontual e orientações claras de todos os eletros e luzes.</p>
                </div>
              </div>
            </div>

            {/* Direct Host Contact Button */}
            <div className="pt-2">
              <a
                href={CHALET_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Mandar Mensagem Direta Para Haylla</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
