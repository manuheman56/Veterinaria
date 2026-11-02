import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { X, BookOpen, Layers, Award, Sparkles, Code2, Heart } from 'lucide-react';

interface GDDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GDDModal: React.FC<GDDModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'pedagogia' | 'gdd' | 'json' | 'flujo'>('pedagogia');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white/20 rounded-2xl text-2xl">🎓</span>
            <div>
              <h2 className="text-xl font-black">Guía Didáctica & Game Design Document (GDD)</h2>
              <p className="text-xs text-teal-100">
                Arquitectura pedagógica para 2º de Educación Primaria (6-8 años)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playBubble();
              onClose();
            }}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-slate-50 overflow-x-auto">
          {[
            { id: 'pedagogia', label: '1. Arquitectura Pedagógica', icon: BookOpen },
            { id: 'gdd', label: '2. Mecánicas & Core Loop', icon: Layers },
            { id: 'flujo', label: '3. Flujo de Pantallas UI/UX', icon: Sparkles },
            { id: 'json', label: '4. Estructura de Datos JSON', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playBubble();
                  setActiveSection(tab.id as typeof activeSection);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition-all border-b-2 whitespace-nowrap ${
                  activeSection === tab.id
                    ? 'border-emerald-600 bg-white text-emerald-900 shadow-sm'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {activeSection === 'pedagogia' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h3 className="font-black text-emerald-950 text-base mb-1">
                  Público Objetivo y Fundamentos Neuroeducativos (6-8 años / 2º Primaria)
                </h3>
                <p className="text-xs text-emerald-900">
                  A los 7 años los niños transitan del pensamiento preoperacional al concreto. El aprendizaje se asienta cuando existe una fuerte carga emocional empática (el cuidado de animales) combinada con retroalimentación multisensorial inmediata.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
                  <h4 className="font-black text-rose-950 text-xs flex items-center gap-1.5">
                    <span>📖</span>
                    <span>Lengua Castellana</span>
                  </h4>
                  <ul className="text-xs space-y-1.5 list-disc list-inside text-rose-900">
                    <li><strong>Conciencia Fonológica:</strong> Separación silábica mediante aplausos rítmicos audibles.</li>
                    <li><strong>Clasificación:</strong> Monosílabas, bisílabas, trisílabas y polisílabas.</li>
                    <li><strong>Semántica:</strong> Reconocimiento de sinónimos de uso habitual.</li>
                    <li><strong>Ortografía Natural:</strong> Mayúscula en nombres propios y principio de frase.</li>
                    <li><strong>Abecedario:</strong> Ordenación alfabética y series de letras consecutivas.</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                  <h4 className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                    <span>📐</span>
                    <span>Matemáticas</span>
                  </h4>
                  <ul className="text-xs space-y-1.5 list-disc list-inside text-blue-900">
                    <li><strong>Aritmética:</strong> Sumas de dos cifras y restas sin llevadas.</li>
                    <li><strong>Representación Concreta:</strong> Bloques de decenas (barras de 10) y unidades (cubos).</li>
                    <li><strong>Cálculo Mental:</strong> Amigos del 10 y series numéricas (+2, +10).</li>
                    <li><strong>Resolución de Problemas:</strong> Problemas contextualizados de 1 sola operación en la clínica.</li>
                    <li><strong>Multiplicación:</strong> Tablas del 1, 2 y 10 con agrupaciones visuales.</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <h4 className="font-black text-amber-950 text-xs flex items-center gap-1.5">
                    <span>🇬🇧</span>
                    <span>Inglés (Classroom Objects)</span>
                  </h4>
                  <ul className="text-xs space-y-1.5 list-disc list-inside text-amber-900">
                    <li><strong>Vocabulario LOMLOE:</strong> Pencil, eraser/rubber, ruler, scissors, book, backpack, desk, chair.</li>
                    <li><strong>Pronunciación Sonora:</strong> Síntesis de voz en inglés nativo mediante Web Speech API.</li>
                    <li><strong>Asociación:</strong> Reconocimiento del objeto gráfico y colocación en la mochila de la veterinaria.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'gdd' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h3 className="font-black text-amber-950 text-base mb-1">
                  Bucle Principal (Core Loop) & Psicología de la Motivación
                </h3>
                <p className="text-xs text-amber-900">
                  1. Entrada del Paciente → 2. Diagnóstico del Síntoma → 3. Resolución de Micro-Retos Curriculares → 4. Aplicación de la Cura Mágica y Aumento de Salud → 5. Celebración con Confeti y Estrellas → 6. Metajuego de Cuidado en el Refugio.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="p-2 bg-emerald-100 rounded-xl text-lg">🛡️</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-xs">Sistema de Reintento Amable (Zero Punitive Design)</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      No hay penalización ni pérdida de puntos por fallo. Ante un error, el animal reacciona con simpatía diciendo "¡Casi lo tienes!" y se desbloquea una pista visual inmediata para evitar la frustración y fomentar la mentalidad de crecimiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="p-2 bg-amber-100 rounded-xl text-lg">🐾</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-xs">Economía Virtual de "Huellitas" y Rachas Diarias</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Las Huellitas obtenidas se canjean en la tienda del refugio por juguetes (pelotas, rascadores, camas) y comida nutritiva para los animales rescatados, fomentando hábitos de constancia mediante el bonus de racha diaria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="p-2 bg-emerald-100 rounded-xl text-lg">🌿</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-xs">Minijuego de Exploración Botánica (Control Dual & Impacto en Cura)</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Exploración en mapa 2D del Bosque Secreto con control dual (teclas de dirección / WASD y D-pad táctil en pantalla o clic directo). Julia busca 5 objetos botánicos ocultos (Caléndula, Menta, Gotas de Rocío, Peine de Roble y Bayas). Cada hallazgo activa un micro-reto de 2º de Primaria y al completarlos se pasa a la mesa de elaboración (Mortero Mágico), otorgando un +25% de salud inicial en la consulta médica y +40 Huellitas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="p-2 bg-sky-100 rounded-xl text-lg">🫧</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-xs">Minijuego de Recompensa Libre (Spa & Lavado)</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Minijuego sensorial de enjabonado con pompas dinámicas, ducha templada y secado suave, pensado como descompresión cognitiva sin evaluación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'flujo' && (
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 text-base">
                Especificación del Flujo de Pantallas (UI/UX Flow)
              </h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs space-y-2 leading-relaxed">
                <p className="text-emerald-700 font-bold">PANTALLA 1: AVATAR & BIENVENIDA</p>
                <p className="text-slate-600 pl-4">↳ Configuración de Julia (nombre, peinado, ropa, bata, estetoscopio, gafas) → Botón "¡A la consulta!"</p>

                <p className="text-blue-700 font-bold">PANTALLA 2: MAPA DE NIVELES PROGRESIVO</p>
                <p className="text-slate-600 pl-4">↳ Ruta secuencial: Nivel 1 (Toby: Abierto) ➔ Nivel 2 (Misi: 2★) ➔ Nivel 3 (Tambor: 5★) ➔ Nivel 4 (Pipo: 8★)</p>
                <p className="text-slate-600 pl-4">↳ Feedback con sonido de tok-tok y aviso táctil si se pulsa nivel bloqueado</p>

                <p className="text-amber-700 font-bold">PANTALLA 3: CONSULTA MÉDICA & RETOS</p>
                <p className="text-slate-600 pl-4">↳ Paciente en camilla + Pizarra de 3 tratamientos (Lengua, Mates, Inglés)</p>
                <p className="text-slate-600 pl-4">↳ Barra de salud: 15% ➔ 45% ➔ 75% ➔ 100% Curado</p>

                <p className="text-rose-700 font-bold">PANTALLA 4: CELEBRACIÓN & PREMIOS</p>
                <p className="text-slate-600 pl-4">↳ Fanfarria musical + Confeti multicolor + Reparto de Huellitas y Estrellas</p>

                <p className="text-purple-700 font-bold">PANTALLA 5: EL REFUGIO & METAGUEGO</p>
                <p className="text-slate-600 pl-4">↳ Jardín interactivo con animales paseando libremente (Acariciar / Alimentar / Ficha zoológica / Tienda)</p>
              </div>
            </div>
          )}

          {activeSection === 'json' && (
            <div className="space-y-3">
              <h3 className="font-black text-slate-800 text-base">
                Modelo de Datos JSON (Estructura de Retos y Pacientes)
              </h3>
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl text-xs overflow-x-auto font-mono">
{`{
  "id": "lengua_silabas_1",
  "subject": "lengua", // 'lengua' | 'mates' | 'ingles'
  "competence": "Separación Silábica con Ritmo",
  "level": 1,
  "title": "¡Palmadas del Veterinario!",
  "prompt": "¿Cuántas sílabas tiene la palabra 'PE-RRI-TO'?",
  "type": "syllable_claps",
  "visualData": {
    "word": "PERRITO",
    "syllables": ["PE", "RRI", "TO"]
  },
  "options": [
    { "id": "1", "label": "1 sílaba", "isCorrect": false },
    { "id": "2", "label": "2 sílabas", "isCorrect": false },
    { "id": "3", "label": "3 sílabas (Pe-rri-to)", "isCorrect": true }
  ],
  "hint": "Di la palabra despacio: Pe... rri... to.",
  "treatmentStep": {
    "toolName": "Esponja de burbujas",
    "toolIcon": "🧽",
    "actionDesc": "Limpia suavemente la herida con agua templada"
  }
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sounds.playBubble();
              onClose();
            }}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xs shadow-md transition-all"
          >
            Entendido, ¡volver al juego!
          </button>
        </div>
      </div>
    </div>
  );
};
