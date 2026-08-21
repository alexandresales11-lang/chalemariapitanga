import React, { useState } from 'react';
import { FAQ_ITEMS, CHALET_INFO } from '../data/chaletData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Tire Suas Dúvidas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Tudo o que você precisa saber sobre o Chalé Maria Pitanga antes de reservar.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl border border-stone-200/90 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-sm sm:text-base hover:text-amber-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-stone-700 text-xs sm:text-sm leading-relaxed border-t border-stone-200/50 pt-3 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? WhatsApp card */}
        <div className="mt-10 bg-amber-50/80 rounded-3xl p-6 border border-amber-200 text-center space-y-3">
          <h4 className="font-serif font-bold text-base text-stone-900">
            Ficou com alguma dúvida específica?
          </h4>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Fale diretamente com a anfitriã Haylla Yasmmin no WhatsApp para atendimento imediato e personalizado.
          </p>
          <a
            href={CHALET_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
