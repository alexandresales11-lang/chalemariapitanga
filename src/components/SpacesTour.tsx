import React, { useState } from 'react';
import { BedDouble, Waves, UtensilsCrossed, Flame, Bath, Car, Check, ChevronRight } from 'lucide-react';

export const SpacesTour: React.FC = () => {
  const [activeSpaceTab, setActiveSpaceTab] = useState<'mezanino' | 'piscina' | 'gourmet' | 'lareira' | 'banheiros' | 'estacionamento'>('mezanino');

  const spaces = [
    {
      id: 'mezanino',
      name: 'Chalé & Mezanino',
      icon: BedDouble,
      badge: 'Até 12 Hóspedes',
      image: 'https://i.imgur.com/bcPOIR2.png',
      altImage: 'https://i.imgur.com/chyFT2D.png',
      headline: 'Aconchego Alpino com Climatização Industrial Potente',
      description: 'O chalé possui uma volumetria A-frame única toda revestida em madeira nobre e vidro, proporcionando um ambiente acolhedor e fresco. Equipado com ar-condicionado industrial de alta potência que gela todo o ambiente com rapidez.',
      highlights: [
        '2 Camas de casal confortáveis',
        '2 Camas de solteiro',
        '3 Colchões adicionais de solteiro de excelente densidade',
        'Roupas de cama 100% algodão higienizadas',
        'Smart TV e iluminação intimista',
        'Closet e cabideiro para malas e roupas',
      ],
    },
    {
      id: 'piscina',
      name: 'Piscina & Deck Solar',
      icon: Waves,
      badge: 'Sol o Dia Inteiro',
      image: 'https://i.imgur.com/rVLGlQ3.png',
      altImage: 'https://i.imgur.com/ciXY67v.png',
      headline: 'Piscina Cristalina e Deck com Privacidade Absoluta',
      description: 'A piscina do Chalé Maria Pitanga é posicionada para receber sol do amanhecer ao entardecer. Água tratada com padrão rigoroso, cercada por gramado tropical verdejante e espreguiçadeiras confortáveis.',
      highlights: [
        'Piscina privativa exclusiva para o seu grupo',
        'Cadeiras de sol e espreguiçadeiras ergonômicas',
        'Sombreiro para relaxar na sombra',
        'Chuveirão externo refrescante pós-cachoeira',
        'Iluminação aquática noturna mágica',
      ],
    },
    {
      id: 'gourmet',
      name: 'Área Gourmet & Cozinha',
      icon: UtensilsCrossed,
      badge: 'Churrasqueira Completa',
      image: 'https://i.imgur.com/v3CPlct.png',
      altImage: 'https://i.imgur.com/9zioQgP.png',
      headline: 'Estrutura Completa Para Refeições em Família',
      description: 'Cozinhe como um verdadeiro chef com todos os utensílios e eletrodomésticos modernos. A ampla mesa de madeira com 8 cadeiras e os bancos rústicos reúnem todos para momentos inesquecíveis.',
      highlights: [
        'Churrasqueira a carvão com kit de espetos e facas',
        'Geladeira Electrolux + Frigobar + Freezer',
        'Cooktop a gás e forno elétrico',
        'Airfryer, micro-ondas, liquidificador e sanduicheira',
        'Taças de vinho, copos de cerveja, pratos e talheres completos',
        'Mesa de jantar ampla para 8 pessoas',
      ],
    },
    {
      id: 'lareira',
      name: 'Lareira Externa & Gramado',
      icon: Flame,
      badge: 'Noites Estreladas',
      image: 'https://i.imgur.com/58Xk3II.png',
      altImage: 'https://i.imgur.com/h3PM963.png',
      headline: 'Fire Pit sob o Céu Mais Estrelado da Chapada',
      description: 'Ao cair da noite, acenda a lareira externa privativa no gramado. O clima de serra de Itaitú pede um bom vinho, risadas ao redor do fogo e marshmallows com as crianças.',
      highlights: [
        'Lareira ao ar livre segura (Fire Pit)',
        'Cadeiras de descanso ao redor da fogueira',
        'Rede para descanso embalado pela brisa',
        'Quintal gramado 100% cercado e privativo',
        'Cenário fotográfico deslumbrante à noite',
      ],
    },
    {
      id: 'banheiros',
      name: '4 Banheiros & Conforto',
      icon: Bath,
      badge: 'Sem Filas no Banho',
      image: 'https://i.imgur.com/hToZexf.png',
      altImage: 'https://i.imgur.com/pbbpJzf.png',
      headline: '4 Banheiros Completos Com Água Quente',
      description: 'Sabemos que alugar em grupo exige praticidade. O Chalé Maria Pitanga conta com 4 banheiros, garantindo que todos tomem um banho quente e relaxante após um dia de trilhas e cachoeiras sem esperar.',
      highlights: [
        '4 banheiros higienizados e equipados',
        'Chuveiros elétricos com água quente e forte pressão',
        'Chuveiro externo adicional na área da piscina',
        'Produtos de higiene e limpeza disponíveis',
        'Varal amplo para secagem rápida de toalhas e sungas',
      ],
    },
    {
      id: 'estacionamento',
      name: 'Estacionamento & Segurança',
      icon: Car,
      badge: 'Vagas Privativas',
      image: 'https://i.imgur.com/q6o22Pb.png',
      altImage: 'https://i.imgur.com/poz7QsQ.png',
      headline: 'Paz de Espírito Total Para Você e Seus Veículos',
      description: 'Localização tranquila em Itaitú com portão de acesso exclusivo, vagas internas para 3 carros e câmeras de monitoramento na parte externa.',
      highlights: [
        'Estacionamento privativo para 3 carros no local',
        'Entrada privativa e independente',
        'Câmeras de segurança externas na área da piscina e gourmet',
        'Wi-Fi Fibra de alta velocidade em toda a propriedade',
        'Sistema de som com Bluetooth para suas músicas',
      ],
    },
  ];

  const currentSpace = spaces.find((s) => s.id === activeSpaceTab) || spaces[0];

  return (
    <section id="espacos" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-800 border border-orange-500/30">
            Tour Pelos Espaços
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Projetado Para Momentos Inesquecíveis
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Descubra a estrutura completa do Chalé Maria Pitanga. Clique em cada ambiente para ver fotos e diferenciais exclusivos.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {spaces.map((space) => {
            const Icon = space.icon;
            const isActive = activeSpaceTab === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceTab(space.id as typeof activeSpaceTab)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xl shadow-stone-900/20 scale-102 border border-stone-800'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-orange-600'}`} />
                <span>{space.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Space Content Card */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Details and checklist */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              {currentSpace.badge}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              {currentSpace.headline}
            </h3>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {currentSpace.description}
            </p>

            <div className="pt-2 space-y-2.5">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                O que você encontra neste espaço:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSpace.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-800 font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Images preview */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white group relative h-60 sm:h-72">
              <img
                src={currentSpace.image}
                alt={currentSpace.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-bold font-serif">
                Vista Principal
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white group relative h-60 sm:h-72">
              <img
                src={currentSpace.altImage}
                alt={`${currentSpace.name} detalhes`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-bold font-serif">
                Detalhes & Conforto
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
