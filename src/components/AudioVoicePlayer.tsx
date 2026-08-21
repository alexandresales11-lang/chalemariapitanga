import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Star, MapPin, Volume2 } from 'lucide-react';
import { TestimonialVoiceNote } from '../types';

interface AudioVoicePlayerProps {
  voiceNote: TestimonialVoiceNote;
}

export const AudioVoicePlayer: React.FC<AudioVoicePlayerProps> = ({ voiceNote }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setShowTranscript(true);

      // Play soft harmonic audio chirp to simulate voice note start
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } catch {
        // ignore
      }

      const totalSteps = 100;
      let currentStep = progress;

      timerRef.current = window.setInterval(() => {
        currentStep += 2;
        if (currentStep >= totalSteps) {
          currentStep = 0;
          setIsPlaying(false);
          if (timerRef.current) clearInterval(timerRef.current);
        }
        setProgress(currentStep);
      }, 250);
    }
  };

  return (
    <div className="bg-stone-900 text-white rounded-3xl p-5 sm:p-6 border border-stone-800 shadow-xl space-y-4 relative overflow-hidden group">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={voiceNote.avatar}
            alt={voiceNote.author}
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/80 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white leading-tight font-serif">
              {voiceNote.author}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-0.5">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>{voiceNote.location}</span>
              <span>•</span>
              <span className="text-amber-400/90 font-medium">{voiceNote.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* 5-Stars Badge */}
        <div className="flex items-center gap-0.5 bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-400/30">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>

      {/* Voice Note Audio Controller Box */}
      <div className="bg-stone-800/90 rounded-2xl p-3 sm:p-4 border border-stone-700/80 flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 shrink-0 shadow-md ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-600 to-orange-600 animate-pulse'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500'
          }`}
          aria-label={isPlaying ? 'Pausar áudio' : 'Ouvir depoimento em áudio'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        {/* Waveform Visualization Bars */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1 h-8">
            {[40, 65, 85, 30, 95, 55, 75, 40, 90, 60, 80, 45, 100, 70, 50, 85, 60, 40, 75, 50, 90, 65, 45].map(
              (height, i) => {
                const isPassed = (i / 23) * 100 <= progress;
                return (
                  <span
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-150 ${
                      isPassed ? 'bg-amber-400' : 'bg-stone-600'
                    } ${isPlaying ? 'animate-pulse' : ''}`}
                    style={{
                      height: `${isPlaying ? Math.max(20, Math.sin(i + progress) * 100) : height}%`,
                    }}
                  />
                );
              }
            )}
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
            <span>{isPlaying ? 'Ouvindo...' : '0:00'}</span>
            <span className="text-amber-400 font-bold">{voiceNote.duration}</span>
          </div>
        </div>
      </div>

      {/* Transcript Text Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[11px] border border-emerald-500/30">
            {voiceNote.highlightTag}
          </span>
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-stone-400 hover:text-amber-300 text-[11px] underline"
          >
            {showTranscript ? 'Ocultar transcrição' : 'Ler transcrição do áudio'}
          </button>
        </div>

        {showTranscript && (
          <p className="text-xs sm:text-sm text-stone-200 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800 italic leading-relaxed animate-in fade-in duration-200">
            {voiceNote.transcript}
          </p>
        )}
      </div>
    </div>
  );
};
