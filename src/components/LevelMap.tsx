import React, { useState } from 'react';
import { LevelInfo, AvatarConfig, AnimalPatient } from '../types/game';
import { PATIENTS } from '../data/curricularBank';
import { AnimalSVG } from './AnimalSVG';
import { AvatarSVG } from './AvatarSVG';
import { sounds } from '../audio/soundEffects';
import { Lock, Star, Play, Sparkles, AlertCircle } from 'lucide-react';

interface LevelMapProps {
  levels: LevelInfo[];
  avatar: AvatarConfig;
  totalStars: number;
  onSelectLevel: (levelId: number) => void;
  onOpenSanctuary: () => void;
  onOpenAvatar: () => void;
  onOpenGDD: () => void;
  onStartExploration: () => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({
  levels,
  avatar,
  totalStars,
  onSelectLevel,
  onOpenSanctuary,
  onOpenAvatar,
  onOpenGDD,
  onStartExploration,
}) => {
  const [lockedFeedback, setLockedFeedback] = useState<string | null>(null);

  const handleLevelClick = (lvl: LevelInfo) => {
    if (lvl.unlocked) {
      sounds.playSuccess();
      onSelectLevel(lvl.id);
    } else {
      sounds.playLocked();
      setLockedFeedback(`¡Nivel bloqueado! Necesitas ${lvl.requiredStars} estrellas (tienes ${totalStars} ⭐)`);
      setTimeout(() => setLockedFeedback(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Friendly Notification Banner if locked level clicked */}
      {lockedFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white font-bold px-6 py-3 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-2 animate-bounce">
          <AlertCircle className="w-5 h-5" />
          <span>{lockedFeedback}</span>
        </div>
      )}

      {/* Hero Welcome with Julia */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-white/60">
        {/* Soft decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-600/20 rounded-full blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <button
              onClick={onOpenAvatar}
              className="group relative p-1.5 bg-white rounded-3xl shadow-lg border-2 border-amber-200 transition-transform active:scale-95 hover:rotate-2"
              title="Haz clic para personalizar tu avatar"
            >
              <AvatarSVG config={avatar} size={90} />
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 bg-amber-400 text-amber-950 text-xs font-black rounded-full shadow border border-white">
                Editar
              </span>
            </button>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-sm font-semibold uppercase tracking-wider text-teal-100">
                  Veterinaria en Prácticas
                </span>
                <span className="text-amber-200 text-sm">★ 2º Primaria</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
                ¡Bienvenida a la Consulta, {avatar.name}!
              </h1>
              <p className="text-teal-50 text-sm max-w-md mt-1">
                Los animalitos del pueblo necesitan tu ayuda. Resuelve retos de Lengua, Matemáticas e Inglés para curarlos y llevarlos al refugio.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenSanctuary}
              className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black rounded-2xl shadow-lg transition-all"
            >
              <span className="text-xl">🏡</span>
              <span>Visitar Refugio</span>
            </button>
            <button
              onClick={onOpenGDD}
              className="flex items-center gap-1.5 px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/40 transition-all text-sm"
              title="Guía Pedagógica y Mecánicas de Juego"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>GDD & Currículo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expedition Mini-game Feature Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-3xl p-5 text-white shadow-lg border-4 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3 bg-white/20 rounded-2xl text-3xl shrink-0 animate-bounce" style={{ animationDuration: '2.5s' }}>
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                ¡Novedad! Minijuego de Exploración
              </span>
              <span className="text-xs text-emerald-100">🌿 Bosque Secreto</span>
            </div>
            <h3 className="text-lg font-black mt-0.5">
              Expedición Botánica: Búsqueda de Ingredientes Ocultos
            </h3>
            <p className="text-xs text-emerald-50 max-w-xl mt-0.5">
              Guía a Julia por el bosque para hallar caléndula, menta y rocío. ¡Fabrica el Bálsamo Silvestre para dar un impulso del +25% de salud en la consulta!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playSuccess();
            onStartExploration();
          }}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black rounded-2xl shadow-lg transition-all text-sm shrink-0 whitespace-nowrap flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-900" />
          <span>¡Iniciar Exploración!</span>
        </button>
      </div>

      {/* Level Route Map Heading */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          <h2 className="text-xl font-black text-slate-800">Ruta de Rescates y Cuidados</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span>{totalStars} Estrellas acumuladas</span>
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>
      </div>

      {/* Sequential Level Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {levels.map((lvl, index) => {
          const patient = PATIENTS.find((p) => p.id === lvl.patientId) as AnimalPatient;
          const isNextPlayable = lvl.unlocked && lvl.starsEarned === 0;

          return (
            <div
              key={lvl.id}
              onClick={() => handleLevelClick(lvl)}
              className={`relative rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                lvl.unlocked
                  ? 'bg-white border-emerald-300 shadow-lg hover:shadow-2xl hover:-translate-y-1'
                  : 'bg-slate-100/80 border-slate-300/80 shadow-sm opacity-80 hover:opacity-100'
              } ${isNextPlayable ? 'ring-4 ring-amber-400 ring-offset-2' : ''}`}
            >
              {/* Top badge with level sequence */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    lvl.unlocked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  Nivel {index + 1}
                </span>

                {/* Stars status */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx <= lvl.starsEarned
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Patient visual avatar */}
              <div className="flex flex-col items-center justify-center py-3 bg-gradient-to-b from-sky-50/50 to-emerald-50/50 rounded-2xl mb-4 border border-slate-100 relative overflow-hidden">
                {!lvl.unlocked && (
                  <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                    <div className="p-3 bg-amber-400 rounded-full shadow-lg text-slate-900 mb-1">
                      <Lock className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-black bg-slate-900/80 px-2.5 py-0.5 rounded-full mt-1">
                      {lvl.requiredStars} ⭐ necesarias
                    </span>
                  </div>
                )}

                <AnimalSVG
                  patientId={patient?.id || 'toby'}
                  healthPercent={lvl.starsEarned > 0 ? 100 : 20}
                  size={120}
                />

                <div className="mt-2 text-center">
                  <span className="text-sm font-black text-slate-800 block">
                    {patient?.name}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {patient?.species}
                  </span>
                </div>
              </div>

              {/* Title & description */}
              <div className="space-y-1 mb-4">
                <h3 className="font-black text-slate-800 text-base leading-snug">
                  {lvl.title.replace(/Nivel \d: /, '')}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {patient?.symptomTitle}: {patient?.symptomDescription}
                </p>
              </div>

              {/* Action Button */}
              {lvl.unlocked ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLevelClick(lvl);
                  }}
                  className={`w-full py-2.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                    lvl.starsEarned > 0
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{lvl.starsEarned > 0 ? 'Repetir Cura' : '¡Curar Ahora!'}</span>
                </button>
              ) : (
                <div className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs bg-slate-200 text-slate-600 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Requiere {lvl.requiredStars} estrellas</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
