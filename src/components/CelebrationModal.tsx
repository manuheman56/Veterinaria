import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimalPatient } from '../types/game';
import { AnimalSVG } from './AnimalSVG';
import { sounds } from '../audio/soundEffects';
import { Star, Sparkles, Home, Bath, ArrowRight } from 'lucide-react';

interface CelebrationModalProps {
  patient: AnimalPatient;
  starsEarned: number;
  huellitasEarned: number;
  onGoToSanctuary: () => void;
  onPlaySpa: () => void;
  onNextLevel: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  patient,
  starsEarned,
  huellitasEarned,
  onGoToSanctuary,
  onPlaySpa,
  onNextLevel,
}) => {
  useEffect(() => {
    sounds.playFanfare();

    // Multicolored confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34D399', '#FBBF24', '#F43F5E', '#60A5FA', '#A78BFA'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);

      return () => clearTimeout(timer);
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center space-y-6">
        {/* Sparkle decorative icons */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-amber-400 rounded-full shadow-xl border-4 border-white text-3xl">
          🌟
        </div>

        <div className="pt-4 space-y-2">
          <span className="text-xs font-black tracking-wider uppercase text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
            ¡Misión Veterinaria Cumplida!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            ¡{patient.name} está curado y muy feliz!
          </h2>
          <p className="text-slate-600 text-sm">
            Gracias a tus diagnósticos y curas, ha recuperado toda su energía y salud.
          </p>
        </div>

        {/* Cured Animal Showcase with Hearts */}
        <div className="py-2 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-emerald-50 rounded-2xl border border-amber-100 relative">
          <AnimalSVG
            patientId={patient.id}
            healthPercent={100}
            size={160}
          />
        </div>

        {/* Rewards Row: Stars & Huellitas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col items-center">
            <span className="text-xs font-bold text-amber-900 mb-1">Estrellas Ganadas</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-6 h-6 ${
                    s <= starsEarned
                      ? 'fill-amber-400 text-amber-400 animate-bounce'
                      : 'text-slate-300'
                  }`}
                  style={{ animationDelay: `${s * 150}ms` }}
                />
              ))}
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col items-center">
            <span className="text-xs font-bold text-emerald-900 mb-1">Huellitas 🐾</span>
            <span className="text-2xl font-black text-emerald-700">
              +{huellitasEarned}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              sounds.playSuccess();
              onPlaySpa();
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
          >
            <Bath className="w-5 h-5" />
            <span>Minijuego de Spa: Bañar y Cepillar a {patient.name}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sounds.playBubble();
                onGoToSanctuary();
              }}
              className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-colors text-xs"
            >
              <Home className="w-4 h-4" />
              <span>Ver en el Refugio</span>
            </button>

            <button
              onClick={() => {
                sounds.playSuccess();
                onNextLevel();
              }}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-colors text-xs shadow-md"
            >
              <span>Siguiente Nivel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
