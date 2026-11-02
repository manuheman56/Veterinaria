import React, { useState } from 'react';
import { AvatarConfig } from '../types/game';
import { AvatarSVG } from './AvatarSVG';
import { sounds } from '../audio/soundEffects';
import { Sparkles, Check, X } from 'lucide-react';

interface AvatarCustomizerModalProps {
  currentConfig: AvatarConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: AvatarConfig) => void;
}

const HAIR_COLORS = [
  { label: 'Castaño', hex: '#8D5B4C' },
  { label: 'Rubio', hex: '#EAB308' },
  { label: 'Moreno', hex: '#262626' },
  { label: 'Pelirrojo', hex: '#EA580C' },
  { label: 'Fantasía Rosa', hex: '#F43F5E' },
];

const SKIN_TONES = [
  { label: 'Claro', hex: '#FDE68A' },
  { label: 'Rosado', hex: '#FCD5B5' },
  { label: 'Dorado', hex: '#E0A96D' },
  { label: 'Moreno', hex: '#A16207' },
];

const SCRUBS_COLORS = [
  { label: 'Menta', hex: '#34D399' },
  { label: 'Celeste', hex: '#38BDF8' },
  { label: 'Lavanda', hex: '#C084FC' },
  { label: 'Coral', hex: '#FB7185' },
];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  currentConfig,
  isOpen,
  onClose,
  onSave,
}) => {
  const [draft, setDraft] = useState<AvatarConfig>(currentConfig);

  if (!isOpen) return null;

  const handleSelect = (key: keyof AvatarConfig, value: unknown) => {
    sounds.playBubble();
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    sounds.playSuccess();
    onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-emerald-100 px-6 py-4 flex items-center justify-between border-b border-amber-200">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white rounded-2xl shadow-sm text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Personaliza a tu Veterinaria</h2>
              <p className="text-xs text-slate-600">¡Elige tu peinado, accesorios y uniforme favorito!</p>
            </div>
          </div>
          <button
            onClick={() => { sounds.playBubble(); onClose(); }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body content with avatar preview & options */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Avatar Preview Spotlight */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-gradient-to-b from-sky-50 to-emerald-50 rounded-2xl border border-sky-100">
            <div className="relative p-2 bg-white rounded-3xl shadow-md border-2 border-amber-200">
              <AvatarSVG config={draft} size={130} />
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-amber-400 text-white rounded-full shadow-md text-xs">
                ★
              </div>
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-sm font-semibold text-slate-700">Nombre de la Doctora:</span>
              </div>
              <input
                type="text"
                value={draft.name}
                maxLength={14}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                className="px-4 py-2 text-lg font-bold text-slate-800 bg-white border-2 border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner text-center sm:text-left"
                placeholder="Nombre"
              />
              <p className="text-xs text-slate-500">Aparecerá en tu bata y en el diploma del refugio</p>
            </div>
          </div>

          {/* Peinado */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">1. Estilo de Peinado</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'pigtails', label: 'Coletas con lazos', icon: '👧' },
                { id: 'braids', label: 'Trenzas dobles', icon: '🎀' },
                { id: 'straight', label: 'Melena lisa', icon: '💁‍♀️' },
                { id: 'curly', label: 'Ricitos alegres', icon: '👩‍🦱' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleSelect('hairStyle', style.id)}
                  className={`p-3 rounded-2xl border-2 font-medium text-sm flex flex-col items-center gap-1 transition-all ${
                    draft.hairStyle === style.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm scale-102'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <span className="text-xl">{style.icon}</span>
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color de Pelo */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">2. Color del Cabello</label>
            <div className="flex flex-wrap gap-3">
              {HAIR_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleSelect('hairColor', color.hex)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all ${
                    draft.hairColor === color.hex
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tono de Piel */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">3. Tono de Piel</label>
            <div className="flex flex-wrap gap-3">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.hex}
                  onClick={() => handleSelect('skinTone', tone.hex)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all ${
                    draft.skinTone === tone.hex
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: tone.hex }}
                  />
                  <span>{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color del Pijama Médico / Scrubs */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">4. Color del Uniforme Veterinario</label>
            <div className="flex flex-wrap gap-3">
              {SCRUBS_COLORS.map((scrub) => (
                <button
                  key={scrub.hex}
                  onClick={() => handleSelect('scrubsColor', scrub.hex)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all ${
                    draft.scrubsColor === scrub.hex
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: scrub.hex }}
                  />
                  <span>{scrub.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accesorios y Gafas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">5. Accesorio de Veterinaria</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'stethoscope', label: 'Estetoscopio', icon: '🩺' },
                  { id: 'badge', label: 'Placa con Huella', icon: '🏷️' },
                  { id: 'hairband', label: 'Cinta de pelo', icon: '🎀' },
                  { id: 'none', label: 'Ninguno', icon: '✨' },
                ].map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelect('accessory', acc.id)}
                    className={`p-2 rounded-xl border-2 text-xs font-semibold flex items-center gap-2 transition-all ${
                      draft.accessory === acc.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span>{acc.icon}</span>
                    <span className="truncate">{acc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">6. Gafas Divertidas</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'Sin gafas', icon: '👀' },
                  { id: 'round', label: 'Redondas', icon: '👓' },
                  { id: 'star', label: 'Estrellitas', icon: '⭐' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleSelect('glasses', g.id)}
                    className={`p-2 rounded-xl border-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      draft.glasses === g.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span className="truncate">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => { sounds.playBubble(); onClose(); }}
            className="px-5 py-2.5 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-colors text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm active:scale-95"
          >
            <Check className="w-5 h-5" />
            <span>¡Guardar a {draft.name}!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
