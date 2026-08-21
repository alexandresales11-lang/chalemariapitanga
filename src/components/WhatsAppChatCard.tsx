import React from 'react';
import { WhatsAppReview } from '../types';
import { CheckCheck, Star, ShieldCheck, Heart } from 'lucide-react';

interface WhatsAppChatCardProps {
  review: WhatsAppReview;
}

export const WhatsAppChatCard: React.FC<WhatsAppChatCardProps> = ({ review }) => {
  return (
    <div className="bg-[#EFEAE2] dark:bg-stone-900 rounded-3xl p-4 sm:p-5 border border-stone-300 dark:border-stone-800 shadow-md flex flex-col justify-between space-y-4">
      {/* WhatsApp Header bar */}
      <div className="flex items-center justify-between border-b border-stone-300/60 dark:border-stone-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-sm`}
          >
            {review.senderName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white leading-tight">
                {review.senderName}
              </h4>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-[10px] text-stone-500">{review.senderPhoneMasked} • {review.groupType}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          {[...Array(review.stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
          ))}
        </div>
      </div>

      {/* Chat Messages Flow */}
      <div className="space-y-2.5 flex-1 text-xs sm:text-sm">
        {/* Guest Bubble (Left) */}
        <div className="flex justify-start">
          <div className="bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 p-3 rounded-2xl rounded-tl-xs shadow-xs max-w-[92%] border border-stone-200/50 dark:border-stone-700/50 relative space-y-1">
            <p className="leading-relaxed">{review.message}</p>
            <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 mt-1">
              <span>{review.time}</span>
              <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
            </div>
          </div>
        </div>

        {/* Host Reply Bubble (Right) */}
        {review.reply && (
          <div className="flex justify-end">
            <div className="bg-[#D9FDD3] dark:bg-emerald-950/80 text-stone-900 dark:text-emerald-100 p-3 rounded-2xl rounded-tr-xs shadow-xs max-w-[90%] border border-emerald-300/40 dark:border-emerald-800/40 space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                <span>Haylla (Anfitriã)</span>
                <Heart className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
              </div>
              <p className="leading-relaxed">{review.reply}</p>
              <div className="flex items-center justify-end text-[10px] text-emerald-700/80 dark:text-emerald-300/80 mt-1">
                <span>Respondido</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verified Guest Tag */}
      <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-200/80 dark:border-stone-800">
        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
          <CheckCheck className="w-3.5 h-3.5" /> Hóspede Verificado
        </span>
        <span className="text-[10px] text-stone-400">Mensagem via WhatsApp</span>
      </div>
    </div>
  );
};
