import React, { useState, useEffect } from 'react';
import { CurricularQuestion, AnimalPatient, AvatarConfig } from '../types/game';
import { CURRICULAR_QUESTIONS } from '../data/curricularBank';
import { AnimalSVG } from './AnimalSVG';
import { AvatarSVG } from './AvatarSVG';
import { sounds } from '../audio/soundEffects';
import { 
  Volume2, 
  Lightbulb, 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Repeat
} from 'lucide-react';

interface ClinicScreenProps {
  patient: AnimalPatient;
  avatar: AvatarConfig;
  levelNumber: number;
  hasCraftedRemedy?: boolean;
  onExit: () => void;
  onCompleteLevel: (stars: number, huellitasEarned: number) => void;
}

export const ClinicScreen: React.FC<ClinicScreenProps> = ({
  patient,
  avatar,
  levelNumber,
  hasCraftedRemedy = false,
  onExit,
  onCompleteLevel,
}) => {
  const initialBaseHealth = hasCraftedRemedy ? Math.min(60, patient.initialHealth + 25) : patient.initialHealth;

  // Select 3 varied questions for this patient session (1 Lengua, 1 Mates, 1 Inglés)
  const [questions, setQuestions] = useState<CurricularQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [healthPercent, setHealthPercent] = useState(initialBaseHealth);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [friendlyFeedback, setFriendlyFeedback] = useState<{
    type: 'correct' | 'try_again';
    message: string;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [clapsCount, setClapsCount] = useState(0);
  const [mistakesThisLevel, setMistakesThisLevel] = useState(0);

  // Initialize questions on mount
  useEffect(() => {
    // Pick 1 language, 1 math, 1 english question suited for level
    const poolLengua = CURRICULAR_QUESTIONS.filter((q) => q.subject === 'lengua');
    const poolMates = CURRICULAR_QUESTIONS.filter((q) => q.subject === 'mates');
    const poolIngles = CURRICULAR_QUESTIONS.filter((q) => q.subject === 'ingles');

    const randomPick = (arr: CurricularQuestion[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    const selected = [
      randomPick(poolLengua),
      randomPick(poolMates),
      randomPick(poolIngles),
    ];
    setQuestions(selected);
    setCurrentIdx(0);
    setHealthPercent(initialBaseHealth);
  }, [patient, levelNumber, initialBaseHealth]);

  const currentQ = questions[currentIdx];

  // Text to speech auto or button
  const handleReadQuestion = () => {
    if (!currentQ) return;
    if (currentQ.subject === 'ingles' && currentQ.visualData?.englishWord) {
      sounds.speakText(`Listen: ${currentQ.visualData.englishWord}`, 'en-US');
    } else {
      sounds.speakText(`${currentQ.prompt}`);
    }
  };

  const handleClap = () => {
    sounds.playClap();
    setClapsCount((c) => c + 1);
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (isEvaluating) return;
    setSelectedOptionId(optionId);
    setIsEvaluating(true);

    if (isCorrect) {
      // Correct!
      sounds.playSuccess();
      sounds.playMagic();
      setFriendlyFeedback({
        type: 'correct',
        message: `¡Excelente, Doctora ${avatar.name}! ${currentQ.explanation}`,
      });

      // Advance animal health
      const newHealth = Math.min(100, Math.round(patient.initialHealth + ((currentIdx + 1) / questions.length) * (100 - patient.initialHealth)));
      setHealthPercent(newHealth);

      // Advance to next question or complete
      setTimeout(() => {
        setFriendlyFeedback(null);
        setSelectedOptionId(null);
        setShowHint(false);
        setClapsCount(0);
        setIsEvaluating(false);

        if (currentIdx + 1 < questions.length) {
          setCurrentIdx((i) => i + 1);
        } else {
          // All 3 treatments finished! Patient is 100% cured!
          setHealthPercent(100);
          const stars = mistakesThisLevel === 0 ? 3 : mistakesThisLevel <= 2 ? 2 : 1;
          const huellitasReward = 35 + stars * 10;
          onCompleteLevel(stars, huellitasReward);
        }
      }, 2000);
    } else {
      // Kind retry system - NO point deduction, gentle encouragement
      sounds.playGentleTryAgain();
      setMistakesThisLevel((m) => m + 1);
      setFriendlyFeedback({
        type: 'try_again',
        message: `¡Casi casi! ${patient.name} dice: "¡No te preocupes, inténtalo otra vez!"`,
      });
      setShowHint(true); // Automatically reveal helpful clue to avoid frustration

      setTimeout(() => {
        setIsEvaluating(false);
        setSelectedOptionId(null);
      }, 1800);
    }
  };

  if (!currentQ) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-600">
        Preparando la consulta...
      </div>
    );
  }

  const subjectBadge = {
    lengua: { label: 'Lengua Castellana', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    mates: { label: 'Matemáticas Divertidas', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    ingles: { label: 'English Time', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  }[currentQ.subject];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-4">
      {/* Top Bar Navigation & Health progress */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-emerald-200 shadow-md">
        <button
          onClick={() => {
            sounds.playBubble();
            onExit();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors text-sm self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Mapa</span>
        </button>

        {/* Health bar */}
        <div className="flex-1 max-w-md w-full">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Salud de {patient.name}</span>
            </span>
            <span className="text-emerald-700">{healthPercent}% Curado</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-300 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 rounded-full transition-all duration-700 relative"
              style={{ width: `${healthPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl text-amber-900">
          <span>Tratamiento:</span>
          <span className="font-black text-amber-700">Paso {currentIdx + 1} de {questions.length}</span>
        </div>
      </div>

      {/* Main Clinic Layout: Patient on Exam Table + Challenge Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Examination Table & Animal (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-teal-50 to-emerald-50 rounded-3xl p-6 border-4 border-emerald-200 shadow-lg flex flex-col justify-between relative overflow-hidden">
          {/* Vet standing by patient */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AvatarSVG config={avatar} size={50} />
              <div>
                <span className="text-xs font-bold text-slate-500 block">Veterinaria</span>
                <span className="text-sm font-black text-slate-800">{avatar.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-bold text-slate-600 border border-slate-200">
              <span>{currentQ.treatmentStep.toolIcon}</span>
              <span>{currentQ.treatmentStep.toolName}</span>
            </div>
          </div>

          {/* Exam Table with Animal */}
          <div className="relative flex flex-col items-center justify-center my-4 py-6 bg-white/60 rounded-3xl border border-white shadow-inner">
            <AnimalSVG
              patientId={patient.id}
              healthPercent={healthPercent}
              size={180}
            />

            {/* Exam table cushion shadow */}
            <div className="w-48 h-6 bg-slate-300/40 rounded-full filter blur-sm -mt-2" />

            {/* Current Treatment Action Bubble */}
            <div className="mt-4 px-4 py-2 bg-white rounded-2xl shadow-md border border-emerald-100 flex items-center gap-2 max-w-xs text-center">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-bold text-slate-700">
                {currentQ.treatmentStep.actionDesc}
              </span>
            </div>
          </div>

          {/* Active Crafted Remedy Bonus Badge */}
          {hasCraftedRemedy && (
            <div className="mb-2 p-2.5 bg-gradient-to-r from-amber-100 to-emerald-100 border-2 border-amber-300 rounded-2xl text-xs font-black text-amber-950 flex items-center gap-2 shadow-sm animate-gentle-pulse">
              <span className="text-xl">🧪</span>
              <div>
                <span className="block leading-tight">¡Bálsamo Silvestre Activo!</span>
                <span className="text-[10px] font-normal text-emerald-800">
                  Ingredientes del bosque aplicados (+25% salud inicial)
                </span>
              </div>
            </div>
          )}

          {/* Patient Card Summary */}
          <div className="bg-white/90 rounded-2xl p-3 border border-emerald-100 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Paciente: {patient.name}</span>
              <span className="text-slate-500">{patient.species}</span>
            </div>
            <p className="text-slate-600 italic">"{patient.symptomTitle}"</p>
          </div>
        </div>

        {/* Right Column: Interactive Curricular Challenge Deck (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-200 shadow-xl flex flex-col justify-between space-y-6">
          {/* Header of Question */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`text-xs font-black px-3 py-1 rounded-full border ${subjectBadge.color}`}
              >
                {subjectBadge.label} · {currentQ.competence}
              </span>

              <button
                onClick={handleReadQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold rounded-xl text-xs transition-colors"
                title="Escuchar en voz alta"
              >
                <Volume2 className="w-4 h-4" />
                <span>Leer / Escuchar</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
              {currentQ.prompt}
            </h2>
          </div>

          {/* Interactive Supporting Visuals (Syllable Clapper, Math Blocks, Groups) */}
          {currentQ.type === 'syllable_claps' && (
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-3 text-center">
              <span className="text-xs font-bold text-rose-800 block">
                ¡Da palmadas con el botón y cuenta las sílabas!
              </span>
              <div className="flex items-center justify-center gap-3">
                {currentQ.visualData?.syllables?.map((syl, i) => (
                  <span
                    key={syl}
                    className={`px-4 py-2 rounded-xl text-lg font-black transition-all ${
                      i < clapsCount
                        ? 'bg-rose-500 text-white scale-110 shadow-md ring-2 ring-rose-300'
                        : 'bg-white text-rose-900 border-2 border-rose-200'
                    }`}
                  >
                    {syl}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleClap}
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 active:scale-95 text-white font-black rounded-2xl shadow-md text-sm flex items-center gap-2"
                >
                  <span>👏</span>
                  <span>¡Dar Palmada! ({clapsCount})</span>
                </button>
                {clapsCount > 0 && (
                  <button
                    onClick={() => setClapsCount(0)}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl"
                    title="Reiniciar palmadas"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {currentQ.type === 'math_blocks' && (
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-2">
              <span className="text-xs font-bold text-blue-800">
                Apoyo gráfico: Decenas (barras de 10) y Unidades (cuadraditos de 1)
              </span>
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-600">2 Decenas:</span>
                  <div className="flex gap-1">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-black rounded">10</span>
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-black rounded">10</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-600">7 Unidades:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((u) => (
                      <span key={u} className="w-4 h-4 bg-amber-400 border border-amber-500 rounded-sm inline-block" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentQ.visualData?.multiplicationGroup && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
              <span className="text-xs font-bold text-amber-900 block">
                Agrupación visual: {currentQ.visualData.multiplicationGroup.count} montones de {currentQ.visualData.multiplicationGroup.itemsPerGroup}
              </span>
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: currentQ.visualData.multiplicationGroup.count }).map((_, groupIdx) => (
                  <div key={groupIdx} className="p-2 bg-white rounded-xl border border-amber-300 shadow-sm flex items-center gap-1">
                    {Array.from({ length: currentQ.visualData?.multiplicationGroup?.itemsPerGroup || 2 }).map((__, itemIdx) => (
                      <span key={itemIdx} className="text-xl">
                        {currentQ.visualData?.multiplicationGroup?.itemIcon}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentQ.visualData?.englishWord && (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇬🇧</span>
                <div>
                  <span className="text-xs text-emerald-800 font-bold block">Word to find:</span>
                  <span className="text-lg font-black text-emerald-950 uppercase tracking-wide">
                    {currentQ.visualData.englishWord}
                  </span>
                </div>
              </div>
              <button
                onClick={() => sounds.speakText(currentQ.visualData?.englishWord || '', 'en-US')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear English</span>
              </button>
            </div>
          )}

          {/* Options Grid (Large, tactile touch targets >= 56px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  disabled={isEvaluating}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  className={`min-h-[56px] p-4 rounded-2xl font-black text-base text-left flex items-center justify-between gap-3 border-2 transition-all active:scale-98 ${
                    isSelected
                      ? opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg'
                        : 'border-amber-400 bg-amber-100 text-amber-950 animate-wiggle'
                      : 'border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Kind Hint Area */}
          <div className="space-y-3 pt-2">
            {friendlyFeedback && (
              <div
                className={`p-4 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-md animate-fadeIn ${
                  friendlyFeedback.type === 'correct'
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-amber-100 text-amber-950 border border-amber-300'
                }`}
              >
                <span className="text-2xl">
                  {friendlyFeedback.type === 'correct' ? '🎉' : '💡'}
                </span>
                <span>{friendlyFeedback.message}</span>
              </div>
            )}

            {/* Hint toggle (non-punitive scaffolding) */}
            {!friendlyFeedback && (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    sounds.playBubble();
                    setShowHint((s) => !s);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>{showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}</span>
                </button>
              </div>
            )}

            {showHint && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pista de la Dra. {avatar.name}: {currentQ.hint}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
