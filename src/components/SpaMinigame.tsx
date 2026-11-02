import React, { useState } from 'react';
import { AnimalPatient } from '../types/game';
import { AnimalSVG } from './AnimalSVG';
import { sounds } from '../audio/soundEffects';
import { Bath, Wind, Sparkles, Check, ArrowLeft } from 'lucide-react';

interface SpaMinigameProps {
  patient: AnimalPatient;
  onFinish: (bonusHuellitas: number) => void;
  onExit: () => void;
}

interface BubbleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const SpaMinigame: React.FC<SpaMinigameProps> = ({
  patient,
  onFinish,
  onExit,
}) => {
  const [currentTool, setCurrentTool] = useState<'sponge' | 'shower' | 'dryer'>('sponge');
  const [bubbles, setBubbles] = useState<BubbleParticle[]>([]);
  const [cleanProgress, setCleanProgress] = useState(0); // 0 to 100
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnimalInteract = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'sponge') {
      sounds.playBubble();
      // Add bubble
      const newBubble: BubbleParticle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.floor(Math.random() * 20) + 16,
      };
      setBubbles((prev) => [...prev.slice(-18), newBubble]);
      setCleanProgress((p) => Math.min(100, p + 8));
    } else if (currentTool === 'shower') {
      sounds.playMagic();
      // Rinse away bubbles
      setBubbles((prev) => prev.slice(0, Math.max(0, prev.length - 4)));
      setCleanProgress((p) => Math.min(100, p + 10));
    } else if (currentTool === 'dryer') {
      sounds.playPetting();
      setBubbles([]);
      setCleanProgress((p) => Math.min(100, p + 12));
    }

    if (cleanProgress >= 90 && !isCompleted) {
      setIsCompleted(true);
      sounds.playSuccess();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-teal-200 shadow-md">
        <button
          onClick={() => {
            sounds.playBubble();
            onExit();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-black tracking-wider uppercase text-teal-600">
            Minijuego de Spa & Aseo
          </span>
          <h2 className="text-xl font-black text-slate-800">
            ¡Día de Mimos y Baño para {patient.name}!
          </h2>
        </div>

        <div className="px-3 py-1.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-black text-amber-900">
          +15 🐾 Bonus
        </div>
      </div>

      {/* Spa Tub Stage */}
      <div className="relative bg-gradient-to-b from-sky-100 via-teal-50 to-emerald-100 rounded-3xl p-8 border-4 border-teal-200 shadow-xl flex flex-col items-center justify-center min-h-[360px] overflow-hidden select-none">
        {/* Floating background bubbles */}
        <div className="absolute top-6 left-10 text-3xl animate-bounce opacity-50">🫧</div>
        <div className="absolute top-12 right-16 text-2xl animate-float opacity-50">🫧</div>
        <div className="absolute bottom-8 left-16 text-4xl animate-bounce opacity-40">🫧</div>

        {/* Animal in Bath Tub */}
        <div
          onClick={handleAnimalInteract}
          className="relative cursor-pointer transition-transform hover:scale-102 active:scale-98"
          title="Toca para aplicar la herramienta"
        >
          {/* Bathtub rim */}
          <div className="absolute -bottom-6 -left-8 -right-8 h-20 bg-white/90 border-4 border-sky-300 rounded-b-3xl shadow-lg z-10 flex items-center justify-center">
            <span className="text-xs font-black text-sky-700 tracking-wider">
              🛁 SPA DE LA DRA. JULIA
            </span>
          </div>

          <AnimalSVG
            patientId={patient.id}
            healthPercent={100}
            isPetting={true}
            size={220}
          />

          {/* Interactive spawned bubbles */}
          {bubbles.map((b) => (
            <div
              key={b.id}
              style={{
                left: `${b.x}px`,
                top: `${b.y}px`,
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
              className="absolute pointer-events-none rounded-full bg-gradient-to-tr from-sky-300/80 via-white/90 to-pink-200/80 border border-white shadow-sm flex items-center justify-center text-xs animate-ping"
            >
              ✨
            </div>
          ))}
        </div>

        {/* Instructions banner */}
        <div className="mt-10 z-20 text-center">
          <p className="text-sm font-bold text-slate-700 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-teal-200 inline-block">
            {currentTool === 'sponge' && '🧽 Toca a ' + patient.name + ' para llenarle de pompas de jabón'}
            {currentTool === 'shower' && '🚿 Toca para enjuagar las burbujas con agua tibia'}
            {currentTool === 'dryer' && '💨 Toca para secar y peinar su pelito suave'}
          </p>
        </div>
      </div>

      {/* Spa Tool Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              sounds.playBubble();
              setCurrentTool('sponge');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              currentTool === 'sponge'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-lg">🧽</span>
            <span>1. Enjabonar</span>
          </button>

          <button
            onClick={() => {
              sounds.playMagic();
              setCurrentTool('shower');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              currentTool === 'shower'
                ? 'bg-sky-400 text-white shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bath className="w-4 h-4" />
            <span>2. Enjuagar</span>
          </button>

          <button
            onClick={() => {
              sounds.playPetting();
              setCurrentTool('dryer');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              currentTool === 'dryer'
                ? 'bg-rose-400 text-white shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>3. Secar y Peinar</span>
          </button>
        </div>

        {isCompleted && (
          <button
            onClick={() => onFinish(15)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 text-sm animate-bounce"
          >
            <Check className="w-5 h-5" />
            <span>¡Pelaje Perfecto! Reclamar +15 🐾</span>
          </button>
        )}
      </div>
    </div>
  );
};
