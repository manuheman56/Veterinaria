import React, { useState, useEffect } from 'react';
import { 
  AvatarConfig, 
  LevelInfo, 
  SanctuaryToy, 
  GameSaveState, 
  AnimalPatient 
} from './types/game';
import { 
  DEFAULT_AVATAR, 
  INITIAL_LEVELS, 
  SANCTUARY_TOYS, 
  PATIENTS 
} from './data/curricularBank';
import { TopBar } from './components/TopBar';
import { LevelMap } from './components/LevelMap';
import { ClinicScreen } from './components/ClinicScreen';
import { RefugioSanctuary } from './components/RefugioSanctuary';
import { SpaMinigame } from './components/SpaMinigame';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { CelebrationModal } from './components/CelebrationModal';
import { GDDModal } from './components/GDDModal';
import { ExplorationMinigame } from './components/ExplorationMinigame';
import { sounds } from './audio/soundEffects';

const STORAGE_KEY = 'julia_vet_save_v1';

export default function App() {
  // Game persistent state
  const [avatar, setAvatar] = useState<AvatarConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (parsed.avatar) return parsed.avatar;
      }
    } catch {}
    return DEFAULT_AVATAR;
  });

  const [levels, setLevels] = useState<LevelInfo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (parsed.levels) return parsed.levels;
      }
    } catch {}
    return INITIAL_LEVELS;
  });

  const [huellitas, setHuellitas] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (typeof parsed.huellitas === 'number') return parsed.huellitas;
      }
    } catch {}
    return 45; // Initial welcoming balance
  });

  const [dailyStreak, setDailyStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (typeof parsed.dailyStreak === 'number') return parsed.dailyStreak;
      }
    } catch {}
    return 1;
  });

  const [lastLoginDate, setLastLoginDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (parsed.lastLoginDate) return parsed.lastLoginDate;
      }
    } catch {}
    return '';
  });

  const [curedAnimalIds, setCuredAnimalIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (Array.isArray(parsed.curedAnimals)) return parsed.curedAnimals;
      }
    } catch {}
    return [];
  });

  const [toys, setToys] = useState<SanctuaryToy[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (Array.isArray(parsed.toys)) return parsed.toys;
      }
    } catch {}
    return SANCTUARY_TOYS;
  });

  const [animalHappiness, setAnimalHappiness] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSaveState;
        if (parsed.animalHappiness) return parsed.animalHappiness;
      }
    } catch {}
    return { toby: 85, misi: 80, tambor: 90, pipo: 75 };
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Screen & Navigation state
  const [currentScreen, setCurrentScreen] = useState<'map' | 'clinic' | 'sanctuary' | 'spa' | 'exploration'>('map');
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [activeSpaPatient, setActiveSpaPatient] = useState<AnimalPatient>(PATIENTS[0]);
  const [hasCraftedRemedy, setHasCraftedRemedy] = useState<boolean>(false);

  // Modals state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isGDDModalOpen, setIsGDDModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    patient: AnimalPatient;
    stars: number;
    huellitas: number;
  } | null>(null);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      const stateToSave: GameSaveState = {
        avatar,
        currentLevelId: activeLevelId,
        levels,
        huellitas,
        dailyStreak,
        lastLoginDate,
        curedAnimals: curedAnimalIds,
        toys,
        animalHappiness,
        soundEnabled,
        voiceReadEnabled: true,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {}
  }, [
    avatar,
    activeLevelId,
    levels,
    huellitas,
    dailyStreak,
    lastLoginDate,
    curedAnimalIds,
    toys,
    animalHappiness,
    soundEnabled,
  ]);

  // Total stars earned
  const totalStars = levels.reduce((acc, lvl) => acc + lvl.starsEarned, 0);

  // Daily streak check
  const todayStr = new Date().toISOString().slice(0, 10);
  const hasClaimedDailyToday = lastLoginDate === todayStr;

  const handleClaimDaily = () => {
    setHuellitas((h) => h + 25);
    setDailyStreak((s) => s + 1);
    setLastLoginDate(todayStr);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.soundEnabled = next;
  };

  const handleSelectLevel = (levelId: number) => {
    setActiveLevelId(levelId);
    setCurrentScreen('clinic');
  };

  const handleCompleteLevel = (stars: number, huellitasReward: number) => {
    const currentLvl = levels.find((l) => l.id === activeLevelId);
    const patient = PATIENTS.find((p) => p.id === currentLvl?.patientId) || PATIENTS[0];

    // Update levels: record stars and unlock next level if threshold met
    const updatedStars = Math.max(currentLvl?.starsEarned || 0, stars);
    const nextTotalStars = totalStars - (currentLvl?.starsEarned || 0) + updatedStars;

    const newLevels = levels.map((lvl) => {
      if (lvl.id === activeLevelId) {
        return {
          ...lvl,
          starsEarned: updatedStars,
        };
      }
      // Unlock if total stars meet requirement
      if (!lvl.unlocked && nextTotalStars >= lvl.requiredStars) {
        return {
          ...lvl,
          unlocked: true,
        };
      }
      return lvl;
    });

    setLevels(newLevels);
    setHuellitas((h) => h + huellitasReward);

    // Add animal to sanctuary if not yet cured
    if (!curedAnimalIds.includes(patient.id)) {
      setCuredAnimalIds((prev) => [...prev, patient.id]);
    }

    // Set celebration modal
    setCelebrationData({
      patient,
      stars,
      huellitas: huellitasReward,
    });
  };

  const handleBuyToy = (toy: SanctuaryToy) => {
    if (huellitas >= toy.price) {
      setHuellitas((h) => h - toy.price);
      setToys((prev) =>
        prev.map((t) => (t.id === toy.id ? { ...t, bought: true } : t))
      );
    }
  };

  const handleFeedAnimal = (patientId: string, cost: number) => {
    if (huellitas >= cost) {
      setHuellitas((h) => h - cost);
      setAnimalHappiness((prev) => ({
        ...prev,
        [patientId]: Math.min(100, (prev[patientId] ?? 80) + 15),
      }));
    }
  };

  const handlePetAnimal = (patientId: string) => {
    setAnimalHappiness((prev) => ({
      ...prev,
      [patientId]: Math.min(100, (prev[patientId] ?? 80) + 5),
    }));
  };

  const activeLevel = levels.find((l) => l.id === activeLevelId) || levels[0];
  const activePatient = PATIENTS.find((p) => p.id === activeLevel.patientId) || PATIENTS[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-teal-50/40 to-emerald-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-200">
      {/* 3-Zone Top Navigation Contract */}
      <TopBar
        currentScreen={currentScreen}
        huellitas={huellitas}
        totalStars={totalStars}
        soundEnabled={soundEnabled}
        avatar={avatar}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenAvatar={() => setIsAvatarModalOpen(true)}
        onOpenGDD={() => setIsGDDModalOpen(true)}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-12">
        {currentScreen === 'map' && (
          <LevelMap
            levels={levels}
            avatar={avatar}
            totalStars={totalStars}
            onSelectLevel={handleSelectLevel}
            onOpenSanctuary={() => setCurrentScreen('sanctuary')}
            onOpenAvatar={() => setIsAvatarModalOpen(true)}
            onOpenGDD={() => setIsGDDModalOpen(true)}
            onStartExploration={() => setCurrentScreen('exploration')}
          />
        )}

        {currentScreen === 'clinic' && (
          <ClinicScreen
            patient={activePatient}
            avatar={avatar}
            levelNumber={activeLevel.id}
            hasCraftedRemedy={hasCraftedRemedy}
            onExit={() => setCurrentScreen('map')}
            onCompleteLevel={(stars, reward) => {
              handleCompleteLevel(stars, reward);
              setHasCraftedRemedy(false); // Reset remedy once used
            }}
          />
        )}

        {currentScreen === 'exploration' && (
          <ExplorationMinigame
            avatar={avatar}
            onExit={() => setCurrentScreen('map')}
            onCompleteExpedition={(remedyName, bonusHuellitas) => {
              setHuellitas((h) => h + bonusHuellitas);
              setHasCraftedRemedy(true);
            }}
            onGoDirectToClinic={(patientTargetId) => {
              const targetLvl = levels.find((l) => l.patientId === patientTargetId) || levels[3] || levels[0];
              setActiveLevelId(targetLvl.id);
              setCurrentScreen('clinic');
            }}
          />
        )}

        {currentScreen === 'sanctuary' && (
          <RefugioSanctuary
            curedAnimalIds={curedAnimalIds}
            huellitas={huellitas}
            dailyStreak={dailyStreak}
            avatar={avatar}
            toys={toys}
            animalHappiness={animalHappiness}
            onBuyToy={handleBuyToy}
            onFeedAnimal={handleFeedAnimal}
            onPetAnimal={handlePetAnimal}
            onExit={() => setCurrentScreen('map')}
            onClaimDailyStreak={handleClaimDaily}
            hasClaimedDailyToday={hasClaimedDailyToday}
          />
        )}

        {currentScreen === 'spa' && (
          <SpaMinigame
            patient={activeSpaPatient}
            onFinish={(bonusHuellitas) => {
              setHuellitas((h) => h + bonusHuellitas);
              setCurrentScreen('sanctuary');
            }}
            onExit={() => setCurrentScreen('map')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/80 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span>🐾</span>
          <span className="font-bold text-slate-700">Julia: Pequeña Veterinaria</span>
          <span>· Diseñado para 2º de Educación Primaria (6-8 años)</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setIsGDDModalOpen(true)}
            className="hover:text-emerald-700 underline"
          >
            Guía Curricular & GDD
          </button>
          <button
            onClick={() => setIsAvatarModalOpen(true)}
            className="hover:text-emerald-700 underline"
          >
            Cambiar Uniforme
          </button>
        </div>
      </footer>

      {/* Modals */}
      <AvatarCustomizerModal
        currentConfig={avatar}
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={(newCfg) => setAvatar(newCfg)}
      />

      <GDDModal
        isOpen={isGDDModalOpen}
        onClose={() => setIsGDDModalOpen(false)}
      />

      {celebrationData && (
        <CelebrationModal
          patient={celebrationData.patient}
          starsEarned={celebrationData.stars}
          huellitasEarned={celebrationData.huellitas}
          onGoToSanctuary={() => {
            setCelebrationData(null);
            setCurrentScreen('sanctuary');
          }}
          onPlaySpa={() => {
            setActiveSpaPatient(celebrationData.patient);
            setCelebrationData(null);
            setCurrentScreen('spa');
          }}
          onNextLevel={() => {
            const nextLvlId = Math.min(levels.length, activeLevelId + 1);
            setActiveLevelId(nextLvlId);
            setCelebrationData(null);
            setCurrentScreen('clinic');
          }}
        />
      )}
    </div>
  );
}
