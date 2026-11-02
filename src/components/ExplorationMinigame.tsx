import React, { useState, useEffect, useRef } from 'react';
import { AvatarConfig, HiddenItem } from '../types/game';
import { FOREST_EXPLORATION_MISSION } from '../data/explorationData';
import { AvatarSVG } from './AvatarSVG';
import { sounds } from '../audio/soundEffects';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Sparkles, 
  Search, 
  Compass, 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  FlaskConical,
  Award
} from 'lucide-react';

interface ExplorationMinigameProps {
  avatar: AvatarConfig;
  onExit: () => void;
  onCompleteExpedition: (remedyName: string, bonusHuellitas: number) => void;
  onGoDirectToClinic: (patientId: string) => void;
}

export const ExplorationMinigame: React.FC<ExplorationMinigameProps> = ({
  avatar,
  onExit,
  onCompleteExpedition,
  onGoDirectToClinic,
}) => {
  // Player Position in percentage (0 - 100)
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState(false);

  // Mission Items
  const [items, setItems] = useState<HiddenItem[]>(FOREST_EXPLORATION_MISSION.items);
  const [nearbyItem, setNearbyItem] = useState<HiddenItem | null>(null);
  const [inspectingItem, setInspectingItem] = useState<HiddenItem | null>(null);

  // Micro-challenge feedback in modal
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Crafting Phase State (when all 5 items found)
  const [isCraftingStage, setIsCraftingStage] = useState(false);
  const [craftedIngredients, setCraftedIngredients] = useState<string[]>([]);
  const [isCraftingDone, setIsCraftingDone] = useState(false);

  const forestCanvasRef = useRef<HTMLDivElement>(null);

  const collectedCount = items.filter((i) => i.found).length;
  const allCollected = collectedCount === items.length;

  // Check proximity to items whenever player moves
  useEffect(() => {
    let closest: HiddenItem | null = null;
    let minDistance = 16; // proximity threshold in %

    items.forEach((item) => {
      if (!item.found) {
        const dx = playerPos.x - item.position.x;
        const dy = playerPos.y - item.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          minDistance = dist;
          closest = item;
        }
      }
    });

    if (closest !== nearbyItem) {
      if (closest && !nearbyItem) {
        sounds.playItemDiscover();
      }
      setNearbyItem(closest);
    }
  }, [playerPos, items, nearbyItem]);

  // Movement handler with boundary constraints
  const movePlayer = (deltaX: number, deltaY: number) => {
    sounds.playStep();
    setIsWalking(true);
    setTimeout(() => setIsWalking(false), 200);

    setPlayerPos((prev) => {
      const nextX = Math.max(8, Math.min(92, prev.x + deltaX));
      const nextY = Math.max(12, Math.min(88, prev.y + deltaY));

      if (deltaX < 0) setFacing('left');
      if (deltaX > 0) setFacing('right');

      return { x: nextX, y: nextY };
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inspectingItem || isCraftingStage) return;

      const step = 4;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        movePlayer(0, -step);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        movePlayer(0, step);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer(-step, 0);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer(step, 0);
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (nearbyItem) {
          setInspectingItem(nearbyItem);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyItem, inspectingItem, isCraftingStage]);

  // Tap-to-walk on forest canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inspectingItem || isCraftingStage) return;
    if (!forestCanvasRef.current) return;

    const rect = forestCanvasRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(8, Math.min(92, clickX));
    const clampedY = Math.max(12, Math.min(88, clickY));

    if (clampedX < playerPos.x) setFacing('left');
    else setFacing('right');

    sounds.playStep();
    setIsWalking(true);
    setPlayerPos({ x: clampedX, y: clampedY });
    setTimeout(() => setIsWalking(false), 300);
  };

  // Handle micro-challenge selection
  const handleAnswerChallenge = (optionIdx: number) => {
    if (!inspectingItem || isEvaluating) return;
    setSelectedOptionIdx(optionIdx);
    setIsEvaluating(true);

    const isCorrect = optionIdx === inspectingItem.curricularChallenge.correctIndex;

    if (isCorrect) {
      sounds.playSuccess();
      sounds.playMagic();
      setChallengeFeedback(inspectingItem.curricularChallenge.explanation);

      setTimeout(() => {
        // Mark item as found
        const updated = items.map((i) =>
          i.id === inspectingItem.id ? { ...i, found: true } : i
        );
        setItems(updated);
        setInspectingItem(null);
        setSelectedOptionIdx(null);
        setChallengeFeedback(null);
        setIsEvaluating(false);

        // Check if all found -> trigger crafting
        if (updated.every((i) => i.found)) {
          sounds.playFanfare();
          setIsCraftingStage(true);
        }
      }, 1800);
    } else {
      sounds.playGentleTryAgain();
      setChallengeFeedback('¡Casi lo tienes! Fíjate bien y prueba otra vez.');
      setTimeout(() => {
        setIsEvaluating(false);
        setSelectedOptionIdx(null);
      }, 1500);
    }
  };

  // Mortar & Pestle craft handler
  const handleAddIngredientToMortar = (itemId: string) => {
    if (craftedIngredients.includes(itemId)) return;
    sounds.playCrafting();
    const updated = [...craftedIngredients, itemId];
    setCraftedIngredients(updated);

    if (updated.length >= 3) {
      sounds.playFanfare();
      setIsCraftingDone(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#34D399', '#FBBF24', '#38BDF8', '#F43F5E'],
        });
      } catch {}
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-4">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-emerald-200 shadow-md">
        <button
          onClick={() => {
            sounds.playBubble();
            onExit();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Mapa</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-black tracking-wider uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            🌿 Minijuego de Exploración y Botánica
          </span>
          <h2 className="text-xl font-black text-slate-800">
            {FOREST_EXPLORATION_MISSION.title}
          </h2>
        </div>

        {/* Satchel Counter */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">
          <span className="text-xl">🎒</span>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Cesta de Julia</span>
            <span className="text-xs font-black text-amber-950">
              {collectedCount} de {items.length} objetos
            </span>
          </div>
        </div>
      </div>

      {/* Main Mode: 2D Forest Exploration OR Mortar Crafting */}
      {!isCraftingStage ? (
        <div className="space-y-4">
          {/* Mission Objective Callout */}
          <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-slate-700 font-medium">
                <strong>Misión:</strong> Explora el bosque con Julia (usa flechas, D-pad o toca el mapa) para hallar 5 ingredientes y preparar el <em>Bálsamo Silvestre</em> de {FOREST_EXPLORATION_MISSION.patientName}.
              </span>
            </div>

            {nearbyItem && (
              <button
                onClick={() => setInspectingItem(nearbyItem)}
                className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-xl text-xs shadow-md animate-bounce flex items-center gap-1.5 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>¡Examinar {nearbyItem.name}!</span>
              </button>
            )}
          </div>

          {/* 2D Forest Arena Canvas */}
          <div
            ref={forestCanvasRef}
            onClick={handleCanvasClick}
            className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-300 select-none cursor-pointer bg-[#86efac]/40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 30%, #bbf7d0 0%, #86efac 60%, #4ade80 100%)
              `,
            }}
          >
            {/* Scenic Elements: Gentle Creek / Stream */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Meandering river */}
              <path
                d="M 380 -20 C 440 120, 520 220, 480 340 C 450 420, 560 500, 600 580"
                stroke="#38BDF8"
                strokeWidth="60"
                fill="none"
                opacity="0.65"
              />
              <path
                d="M 380 -20 C 440 120, 520 220, 480 340 C 450 420, 560 500, 600 580"
                stroke="#BAE6FD"
                strokeWidth="10"
                fill="none"
                strokeDasharray="16 20"
                opacity="0.9"
              />
              {/* Stepping stones over the stream */}
              <ellipse cx="440" cy="180" rx="14" ry="10" fill="#94A3B8" />
              <ellipse cx="475" cy="220" rx="14" ry="10" fill="#94A3B8" />
            </svg>

            {/* Trees, bushes, rocks and flora */}
            <div className="absolute top-8 left-12 text-6xl pointer-events-none">🌳</div>
            <div className="absolute top-16 right-16 text-5xl pointer-events-none">🌲</div>
            <div className="absolute bottom-12 left-16 text-6xl pointer-events-none">🌲</div>
            <div className="absolute bottom-20 right-28 text-5xl pointer-events-none">🌳</div>
            <div className="absolute top-48 left-36 text-3xl pointer-events-none">🍄</div>
            <div className="absolute bottom-36 left-48 text-3xl pointer-events-none">🪵</div>
            <div className="absolute top-24 right-44 text-3xl pointer-events-none">🌸</div>
            <div className="absolute bottom-40 right-16 text-3xl pointer-events-none">🪨</div>

            {/* Fluttering butterflies */}
            <div className="absolute top-32 left-64 text-2xl animate-float pointer-events-none">🦋</div>
            <div className="absolute bottom-28 right-60 text-xl animate-float pointer-events-none" style={{ animationDelay: '1.2s' }}>🦋</div>

            {/* Hidden Botanical Items Scattered */}
            {items.map((item) => {
              const isFound = item.found;
              const isClose = nearbyItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectingItem(item);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all ${
                    isFound ? 'opacity-40 scale-75' : 'hover:scale-125'
                  }`}
                  title={`${item.name} (${item.clue})`}
                >
                  <div
                    className={`relative p-2 rounded-full cursor-pointer flex items-center justify-center ${
                      isClose && !isFound
                        ? 'bg-amber-300 ring-4 ring-amber-400 shadow-xl animate-bounce'
                        : isFound
                        ? 'bg-white/60'
                        : 'bg-white/80 shadow-md animate-gentle-pulse'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>

                    {/* Unfound sparkle badge */}
                    {!isFound && (
                      <span className="absolute -top-1 -right-1 text-xs">✨</span>
                    )}

                    {/* Found checkmark */}
                    {isFound && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute -top-1 -right-1" />
                    )}
                  </div>

                  <span className="text-[10px] font-black text-slate-800 bg-white/90 px-2 py-0.5 rounded-full shadow border border-emerald-200 block text-center whitespace-nowrap mt-1">
                    {item.name}
                  </span>
                </div>
              );
            })}

            {/* Julia Avatar (Player) */}
            <div
              style={{
                left: `${playerPos.x}%`,
                top: `${playerPos.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-200 ${
                isWalking ? 'animate-wiggle' : ''
              }`}
            >
              {/* Footstep search radius glow */}
              <div className="absolute -inset-10 bg-emerald-400/20 rounded-full filter blur-md pointer-events-none" />

              <div className={`transition-transform duration-200 ${facing === 'left' ? '-scale-x-100' : 'scale-x-100'}`}>
                <AvatarSVG config={avatar} size={84} />
              </div>

              {/* Name tag */}
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-white/95 text-emerald-950 font-black text-[10px] rounded-full shadow border border-emerald-300 whitespace-nowrap">
                Dra. {avatar.name} 🔍
              </span>
            </div>
          </div>

          {/* Bottom Bar: Touch D-Pad Controls & Satchel Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Satchel Shelf (8 cols) */}
            <div className="md:col-span-8 bg-white rounded-3xl p-4 border-2 border-emerald-200 shadow-sm">
              <span className="text-xs font-bold text-slate-600 mb-2 block">
                🎒 Botiquín de Campo (Recolectados para {FOREST_EXPLORATION_MISSION.patientName}):
              </span>
              <div className="grid grid-cols-5 gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                      item.found
                        ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                        : 'bg-slate-50 border-dashed border-slate-200 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-bold text-slate-700 truncate w-full mt-1">
                      {item.found ? item.name : '???'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* On-Screen D-Pad for Tablet & Touch (4 cols) */}
            <div className="md:col-span-4 bg-white rounded-3xl p-3 border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-500 mb-1">Control Táctil</span>
              <div className="grid grid-cols-3 gap-1 w-32">
                <div />
                <button
                  onClick={() => movePlayer(0, -6)}
                  className="p-2.5 bg-slate-100 hover:bg-emerald-100 active:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Arriba"
                >
                  <ChevronUp className="w-5 h-5 text-slate-700" />
                </button>
                <div />

                <button
                  onClick={() => movePlayer(-6, 0)}
                  className="p-2.5 bg-slate-100 hover:bg-emerald-100 active:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Izquierda"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
                <div className="flex items-center justify-center text-xs font-black text-emerald-600">
                  🐾
                </div>
                <button
                  onClick={() => movePlayer(6, 0)}
                  className="p-2.5 bg-slate-100 hover:bg-emerald-100 active:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Derecha"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>

                <div />
                <button
                  onClick={() => movePlayer(0, 6)}
                  className="p-2.5 bg-slate-100 hover:bg-emerald-100 active:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Abajo"
                >
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                </button>
                <div />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* STAGE 2: PREPARACIÓN DEL BÁLSAMO EN EL MORTERO MÁGICO         */
        /* ============================================================== */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              ¡Todos los Ingredientes Recolectados!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              Mortero Botánico: Elaboración del {FOREST_EXPLORATION_MISSION.remedyResult}
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Toca cada ingrediente silvestre para machacarlo en el mortero y preparar la medicina especial para {FOREST_EXPLORATION_MISSION.patientName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4">
            {/* Mortar Visual Area */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-emerald-50 rounded-3xl border-2 border-amber-200 relative">
              {/* Mortar Bowl SVG */}
              <div className="relative">
                <svg width="180" height="150" viewBox="0 0 180 150" fill="none">
                  {/* Pestle / Mano del mortero */}
                  <g className="animate-float" style={{ transformOrigin: 'top center' }}>
                    <rect x="78" y="10" width="24" height="70" rx="10" fill="#78350F" transform="rotate(-15 78 10)" />
                    <circle cx="86" cy="80" r="14" fill="#92400E" />
                  </g>
                  {/* Bowl */}
                  <path
                    d="M 20 60 Q 20 135 90 135 Q 160 135 160 60 Z"
                    fill="#D97706"
                    stroke="#78350F"
                    strokeWidth="4"
                  />
                  {/* Mortar Base */}
                  <rect x="60" y="132" width="60" height="14" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />

                  {/* Bubbling green potion inside */}
                  <ellipse cx="90" cy="65" rx="58" ry="18" fill="#34D399" />
                  <ellipse cx="90" cy="65" rx="48" ry="12" fill="#6EE7B7" />
                  <circle cx="75" cy="65" r="4" fill="#FFFFFF" className="animate-ping" />
                  <circle cx="105" cy="63" r="5" fill="#FFFFFF" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                </svg>

                {/* Floating sparkles */}
                <div className="absolute top-2 right-4 text-2xl animate-bounce">✨</div>
                <div className="absolute top-4 left-6 text-xl animate-float">🌿</div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-black text-amber-900 bg-white px-3 py-1 rounded-full shadow border border-amber-200">
                  {craftedIngredients.length} de 3 ingredientes añadidos
                </span>
              </div>
            </div>

            {/* Ingredients to Add */}
            <div className="space-y-3">
              <span className="text-xs font-black text-slate-700 block">
                Toca para añadir al mortero:
              </span>
              {[
                { id: 'herb_calendula', name: 'Flores de Caléndula Dorada', icon: '🌼', effect: 'Poder cicatrizante' },
                { id: 'herb_mint', name: 'Hojas de Menta Fresca', icon: '🌿', effect: 'Alivia el picor' },
                { id: 'water_dew', name: 'Gotas de Rocío Puro', icon: '💧', effect: 'Diluyente natural' },
              ].map((ing) => {
                const isAdded = craftedIngredients.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    disabled={isAdded}
                    onClick={() => handleAddIngredientToMortar(ing.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      isAdded
                        ? 'bg-emerald-50 border-emerald-300 opacity-60'
                        : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-300 shadow-sm active:scale-98'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-slate-100 rounded-xl">{ing.icon}</span>
                      <div className="text-left">
                        <span className="font-bold text-slate-800 text-sm block">{ing.name}</span>
                        <span className="text-xs text-slate-500">{ing.effect}</span>
                      </div>
                    </div>

                    {isAdded ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Añadido</span>
                      </span>
                    ) : (
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl">
                        + Mezclar
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Ready result notification & impact summary */}
              {isCraftingDone && (
                <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-300 space-y-3 animate-fadeIn text-emerald-950">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-700" />
                    <span className="font-black text-sm">
                      ¡Bálsamo Silvestre Creado con Éxito!
                    </span>
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li><strong>Impacto en la Cura:</strong> +25% de salud inicial para {FOREST_EXPLORATION_MISSION.patientName}.</li>
                    <li><strong>Herramientas:</strong> Peine de madera desbloqueado para desenredar púas.</li>
                    <li><strong>Recompensa de Exploración:</strong> +40 🐾 Huellitas para el Refugio.</li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        onCompleteExpedition(FOREST_EXPLORATION_MISSION.remedyResult, 40);
                        onGoDirectToClinic(FOREST_EXPLORATION_MISSION.patientTarget);
                      }}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md transition-all text-center"
                    >
                      ¡Ir a Curar a {FOREST_EXPLORATION_MISSION.patientName} con el Bálsamo!
                    </button>
                    <button
                      onClick={() => {
                        sounds.playBubble();
                        onCompleteExpedition(FOREST_EXPLORATION_MISSION.remedyResult, 40);
                        onExit();
                      }}
                      className="px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-100 font-bold rounded-xl text-xs transition-colors"
                    >
                      Volver al Mapa
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: MICRO-RETO PEDAGÓGICO AL ENCONTRAR UN OBJETO OCULTO     */}
      {/* ============================================================== */}
      {inspectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 space-y-4">
            {/* Top item badge */}
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl border border-amber-200">
              <span className="text-4xl p-2 bg-white rounded-2xl shadow-sm">{inspectingItem.icon}</span>
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">
                  ¡Objeto Oculto Encontrado!
                </span>
                <h3 className="text-lg font-black text-slate-800">{inspectingItem.name}</h3>
                <p className="text-xs text-slate-600">{inspectingItem.description}</p>
              </div>
            </div>

            {/* Curricular Question Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Reto de Recolección (2º Primaria)
                </span>
                <button
                  onClick={() => sounds.speakText(inspectingItem.curricularChallenge.question)}
                  className="p-1.5 text-sky-700 hover:bg-sky-100 rounded-xl"
                  title="Escuchar pregunta"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-black text-slate-800 leading-snug">
                {inspectingItem.curricularChallenge.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2 pt-1">
              {inspectingItem.curricularChallenge.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const isCorrect = idx === inspectingItem.curricularChallenge.correctIndex;

                return (
                  <button
                    key={opt}
                    disabled={isEvaluating}
                    onClick={() => handleAnswerChallenge(idx)}
                    className={`w-full p-3 rounded-2xl font-black text-sm text-left flex items-center justify-between border-2 transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                          : 'border-amber-400 bg-amber-100 text-amber-950 animate-wiggle'
                        : 'border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            {challengeFeedback && (
              <div className="p-3 bg-amber-100 rounded-2xl text-xs font-bold text-amber-950 flex items-center gap-2 animate-fadeIn">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{challengeFeedback}</span>
              </div>
            )}

            {/* Close button if needed */}
            {!isEvaluating && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setInspectingItem(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cerrar por ahora
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
