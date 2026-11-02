import React from 'react';
import { AvatarConfig } from '../types/game';
import { sounds } from '../audio/soundEffects';
import { Volume2, VolumeX, Sparkles, Home, Map as MapIcon, User, BookOpen } from 'lucide-react';

interface TopBarProps {
  currentScreen: 'map' | 'clinic' | 'sanctuary' | 'spa' | 'exploration';
  huellitas: number;
  totalStars: number;
  soundEnabled: boolean;
  avatar: AvatarConfig;
  onNavigate: (screen: 'map' | 'sanctuary' | 'exploration') => void;
  onOpenAvatar: () => void;
  onOpenGDD: () => void;
  onToggleSound: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  huellitas,
  totalStars,
  soundEnabled,
  avatar,
  onNavigate,
  onOpenAvatar,
  onOpenGDD,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            sounds.playBubble();
            onNavigate('map');
          }}
          className="flex items-center gap-2.5 text-left text-slate-900 whitespace-nowrap shrink-0 group transition-transform active:scale-95"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">🐾</span>
          <div>
            <span className="text-lg font-black tracking-tight text-emerald-950 block leading-none">
              Julia: Pequeña Veterinaria
            </span>
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
              2º Primaria · Hospital de Animales
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text links with hover transitions) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <button
            onClick={() => {
              sounds.playBubble();
              onNavigate('map');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentScreen === 'map' ? 'text-emerald-700 underline underline-offset-4 decoration-2 decoration-emerald-500' : ''
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Mapa de Niveles</span>
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              onNavigate('sanctuary');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentScreen === 'sanctuary' ? 'text-emerald-700 underline underline-offset-4 decoration-2 decoration-emerald-500' : ''
            }`}
          >
            <Home className="w-4 h-4" />
            <span>El Refugio</span>
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              onNavigate('exploration');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentScreen === 'exploration' ? 'text-emerald-700 underline underline-offset-4 decoration-2 decoration-emerald-500' : ''
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>🌿 Expedición</span>
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              onOpenAvatar();
            }}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <User className="w-4 h-4" />
            <span>Dra. {avatar.name}</span>
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              onOpenGDD();
            }}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-teal-700"
          >
            <BookOpen className="w-4 h-4" />
            <span>Guía Didáctica</span>
          </button>
        </nav>

        {/* Zone 3: Status & Primary Audio Control */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick stats unboxed or quiet badge */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-black">
            <span className="flex items-center gap-1 text-amber-900 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
              <span>⭐</span>
              <span>{totalStars}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              <span>🐾</span>
              <span>{huellitas}</span>
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playBubble();
              onToggleSound();
            }}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            aria-label="Alternar audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
