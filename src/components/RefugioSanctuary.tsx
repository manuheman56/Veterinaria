import React, { useState } from 'react';
import { AnimalPatient, SanctuaryToy, AvatarConfig } from '../types/game';
import { PATIENTS } from '../data/curricularBank';
import { AnimalSVG } from './AnimalSVG';
import { AvatarSVG } from './AvatarSVG';
import { sounds } from '../audio/soundEffects';
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  BookOpen, 
  ShoppingBag, 
  Flame, 
  Info,
  Gift
} from 'lucide-react';

interface RefugioSanctuaryProps {
  curedAnimalIds: string[];
  huellitas: number;
  dailyStreak: number;
  avatar: AvatarConfig;
  toys: SanctuaryToy[];
  animalHappiness: Record<string, number>;
  onBuyToy: (toy: SanctuaryToy) => void;
  onFeedAnimal: (patientId: string, cost: number) => void;
  onPetAnimal: (patientId: string) => void;
  onExit: () => void;
  onClaimDailyStreak: () => void;
  hasClaimedDailyToday: boolean;
}

export const RefugioSanctuary: React.FC<RefugioSanctuaryProps> = ({
  curedAnimalIds,
  huellitas,
  dailyStreak,
  avatar,
  toys,
  animalHappiness,
  onBuyToy,
  onFeedAnimal,
  onPetAnimal,
  onExit,
  onClaimDailyStreak,
  hasClaimedDailyToday,
}) => {
  const [selectedAnimalForCard, setSelectedAnimalForCard] = useState<AnimalPatient | null>(null);
  const [activeTab, setActiveTab] = useState<'garden' | 'shop' | 'album'>('garden');
  const [pettingId, setPettingId] = useState<string | null>(null);
  const [feedNotification, setFeedNotification] = useState<string | null>(null);

  const curedPatients = PATIENTS.filter((p) => curedAnimalIds.includes(p.id));

  const handlePet = (id: string) => {
    sounds.playPetting();
    setPettingId(id);
    onPetAnimal(id);
    setTimeout(() => setPettingId(null), 1200);
  };

  const handleFeed = (patient: AnimalPatient) => {
    const cost = 10;
    if (huellitas < cost) {
      sounds.playLocked();
      setFeedNotification(`¡Necesitas ${cost} 🐾 Huellitas para comprar ${patient.foodIcon}!`);
      setTimeout(() => setFeedNotification(null), 2500);
      return;
    }
    sounds.playSuccess();
    sounds.playMagic();
    onFeedAnimal(patient.id, cost);
    setFeedNotification(`¡${patient.name} ha disfrutado su ${patient.favoriteFood}! (+Felicidad ❤️)`);
    setTimeout(() => setFeedNotification(null), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Friendly Notification */}
      {feedNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-2xl border-2 border-emerald-300 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>{feedNotification}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-amber-200 shadow-md">
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              sounds.playBubble();
              setActiveTab('garden');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'garden'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏡 Jardín del Refugio
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              setActiveTab('shop');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'shop'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🛍️ Tienda de Juguetes
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              setActiveTab('album');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'album'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📖 Álbum de Fichas
          </button>
        </div>

        {/* Resources: Huellitas & Daily Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl text-amber-900 font-black text-xs">
            <span>🐾</span>
            <span>{huellitas} Huellitas</span>
          </div>

          <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-2xl text-rose-900 font-black text-xs">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Racha: {dailyStreak} días</span>
          </div>
        </div>
      </div>

      {/* Daily streak claim box if not claimed yet */}
      {!hasClaimedDailyToday && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-4 sm:p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border-4 border-amber-200">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="p-3 bg-white/20 rounded-2xl text-3xl">🎁</span>
            <div>
              <h3 className="text-base font-black">¡Bonus Diario de Cuidados del Refugio!</h3>
              <p className="text-xs text-amber-100">
                Entra cada día a alimentar y cuidar a tus rescatados para mantener tu racha.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playSuccess();
              onClaimDailyStreak();
            }}
            className="px-5 py-2.5 bg-white hover:bg-amber-50 active:scale-95 text-amber-950 font-black rounded-2xl shadow-md text-xs whitespace-nowrap transition-all"
          >
            ¡Reclamar +25 🐾 Huellitas!
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 1: EL JARDÍN DEL REFUGIO                                  */}
      {/* ============================================================== */}
      {activeTab === 'garden' && (
        <div className="space-y-6">
          {/* Main Scenic Garden Arena */}
          <div className="relative bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200 rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl min-h-[460px] overflow-hidden">
            {/* Scenery details */}
            <div className="absolute top-4 left-6 text-4xl opacity-80 animate-float">☁️</div>
            <div className="absolute top-8 right-12 text-3xl opacity-80 animate-float" style={{ animationDelay: '1.5s' }}>☁️</div>
            <div className="absolute top-3 right-48 text-2xl animate-spin" style={{ animationDuration: '30s' }}>☀️</div>

            {/* Little wooden fence & flowers */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-xl opacity-60 pointer-events-none">
              <span>🌸</span><span>🌼</span><span>🪵</span><span>🌷</span><span>🌺</span><span>🪵</span><span>🌻</span><span>🌸</span>
            </div>

            {/* Purchased Sanctuary Toys rendered in garden */}
            <div className="absolute top-20 right-8 flex flex-wrap gap-3 max-w-[200px] z-10">
              {toys.filter((t) => t.bought).map((toy) => (
                <div
                  key={toy.id}
                  className="p-2.5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-amber-200 flex items-center gap-1.5 animate-bounce text-xs font-bold text-slate-700"
                  style={{ animationDuration: '3s' }}
                >
                  <span className="text-xl">{toy.icon}</span>
                  <span className="text-[10px] hidden sm:inline">{toy.name}</span>
                </div>
              ))}
            </div>

            {/* Julia Avatar in Garden */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col items-center">
              <AvatarSVG config={avatar} size={100} />
              <span className="text-xs font-black bg-white/90 px-3 py-1 rounded-full shadow text-emerald-900 border border-emerald-200 mt-1">
                Dra. {avatar.name}
              </span>
            </div>

            {/* Free-roaming Cured Animals */}
            {curedPatients.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 text-center space-y-3 z-10 relative">
                <span className="text-6xl">🏡</span>
                <h3 className="text-xl font-black text-slate-800">
                  ¡El Refugio está listo para recibir amigos!
                </h3>
                <p className="text-sm text-slate-600 max-w-md">
                  Aún no has curado a ningún animalito. ¡Vuelve al mapa, supera los retos del Nivel 1 y Toby vendrá aquí a vivir feliz!
                </p>
                <button
                  onClick={onExit}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg transition-all"
                >
                  ¡Ir a Curar a Toby!
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-12 pb-24 z-10 relative">
                {curedPatients.map((patient) => {
                  const happiness = animalHappiness[patient.id] ?? 80;
                  const isBeingPetted = pettingId === patient.id;

                  return (
                    <div
                      key={patient.id}
                      className="bg-white/85 backdrop-blur-md rounded-3xl p-4 border-2 border-emerald-200 shadow-md flex flex-col items-center justify-between space-y-3 hover:shadow-xl transition-all"
                    >
                      {/* Name & Happiness bar */}
                      <div className="w-full flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-800 font-black text-sm">{patient.name}</span>
                        <span className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                          <span>{happiness}%</span>
                        </span>
                      </div>

                      {/* Interactive SVG animal (Tap to pet!) */}
                      <div
                        onClick={() => handlePet(patient.id)}
                        className="cursor-pointer relative group"
                        title="¡Toca para acariciar!"
                      >
                        <AnimalSVG
                          patientId={patient.id}
                          healthPercent={100}
                          isPetting={isBeingPetted}
                          size={130}
                        />
                        <div className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-slate-200">
                          ¡Acaríciame!
                        </div>
                      </div>

                      {/* Care Actions: Feed & Card */}
                      <div className="w-full grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => handleFeed(patient)}
                          className="py-2 px-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
                          title={`Alimentar con ${patient.favoriteFood} (10 Huellitas)`}
                        >
                          <span>{patient.foodIcon}</span>
                          <span>Comer (10🐾)</span>
                        </button>

                        <button
                          onClick={() => {
                            sounds.playBubble();
                            setSelectedAnimalForCard(patient);
                          }}
                          className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Ficha</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: TIENDA DE JUGUETES PARA EL REFUGIO                      */}
      {/* ============================================================== */}
      {activeTab === 'shop' && (
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200">
            <h3 className="text-lg font-black text-slate-800 mb-1">
              🛍️ Tienda de Accesorios y Juguetes del Refugio
            </h3>
            <p className="text-xs text-slate-600">
              Usa las Huellitas 🐾 ganadas curando animales para equipar el jardín y hacer a tus mascotas aún más felices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {toys.map((toy) => {
              const canAfford = huellitas >= toy.price;

              return (
                <div
                  key={toy.id}
                  className={`rounded-3xl p-5 border-2 flex flex-col justify-between space-y-4 transition-all ${
                    toy.bought
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 bg-slate-100 rounded-2xl">{toy.icon}</span>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm">{toy.name}</h4>
                      <p className="text-xs text-slate-500">{toy.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="font-black text-amber-700 text-sm flex items-center gap-1">
                      <span>🐾</span>
                      <span>{toy.price} Huellitas</span>
                    </span>

                    {toy.bought ? (
                      <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-xl text-xs">
                        Comprado ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            sounds.playSuccess();
                            onBuyToy(toy);
                          } else {
                            sounds.playLocked();
                            setFeedNotification(`¡Te faltan ${toy.price - huellitas} 🐾 Huellitas!`);
                            setTimeout(() => setFeedNotification(null), 2500);
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-black shadow transition-all active:scale-95 ${
                          canAfford
                            ? 'bg-amber-400 hover:bg-amber-300 text-amber-950'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Comprar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: ÁLBUM DE FICHAS PEDAGÓGICAS                             */}
      {/* ============================================================== */}
      {activeTab === 'album' && (
        <div className="space-y-4">
          <div className="bg-teal-50 rounded-3xl p-6 border-2 border-teal-200">
            <h3 className="text-lg font-black text-slate-800 mb-1">
              📖 Fichas Curiosas del Reino Animal (2º Primaria)
            </h3>
            <p className="text-xs text-slate-600">
              Aprende datos científicos y curiosidades reales sobre cada paciente que has tratado en la clínica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PATIENTS.map((p) => {
              const isUnlocked = curedAnimalIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  className={`rounded-3xl p-5 border-2 flex gap-4 transition-all ${
                    isUnlocked
                      ? 'bg-white border-teal-200 shadow-md'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-2xl min-w-[100px]">
                    <AnimalSVG
                      patientId={p.id}
                      healthPercent={isUnlocked ? 100 : 0}
                      size={90}
                    />
                    <span className="text-xs font-black text-slate-700 mt-1">{p.name}</span>
                  </div>

                  <div className="space-y-2 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-sm">{p.species}</span>
                      <span className="text-amber-600 font-bold">{p.foodIcon} {p.favoriteFood}</span>
                    </div>

                    {isUnlocked ? (
                      <p className="text-slate-600 bg-teal-50/80 p-2.5 rounded-xl border border-teal-100 leading-relaxed">
                        {p.funFact}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">
                        🔒 Cura a este paciente en el Nivel {p.levelRequirement} para desbloquear su ficha coleccionable.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Ficha Detallada si se pulsa "Ficha" */}
      {selectedAnimalForCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-300 shadow-2xl space-y-4 text-center">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex justify-center">
              <AnimalSVG
                patientId={selectedAnimalForCard.id}
                healthPercent={100}
                size={140}
              />
            </div>
            <h3 className="text-2xl font-black text-slate-800">
              {selectedAnimalForCard.name} ({selectedAnimalForCard.species})
            </h3>
            <p className="text-sm text-slate-700 bg-sky-50 p-4 rounded-2xl border border-sky-200 leading-relaxed">
              {selectedAnimalForCard.funFact}
            </p>
            <div className="text-xs font-bold text-slate-600">
              Comida preferida: {selectedAnimalForCard.foodIcon} {selectedAnimalForCard.favoriteFood}
            </div>
            <button
              onClick={() => setSelectedAnimalForCard(null)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm"
            >
              Cerrar Ficha
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
