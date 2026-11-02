import React from 'react';

interface AnimalSVGProps {
  patientId: string;
  healthPercent: number; // 0 - 100
  isPetting?: boolean;
  size?: number;
  className?: string;
}

export const AnimalSVG: React.FC<AnimalSVGProps> = ({
  patientId,
  healthPercent,
  isPetting = false,
  size = 200,
  className = '',
}) => {
  const isHealed = healthPercent >= 100;
  const isImproving = healthPercent >= 50 && healthPercent < 100;

  // Render Toby (Puppy)
  if (patientId === 'toby') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${isPetting ? 'scale-110' : ''} ${className}`}
      >
        <defs>
          <filter id="pet-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Tail */}
        <path
          d={isHealed ? "M 180 140 Q 220 110 210 80 Q 195 90 175 125" : "M 180 140 Q 200 160 190 175"}
          fill="#D97706"
          stroke="#B45309"
          strokeWidth="3"
          className={isHealed ? "animate-wiggle origin-bottom-left" : ""}
        />

        {/* Body */}
        <ellipse cx="140" cy="150" rx="55" ry="45" fill="#FBBF24" stroke="#D97706" strokeWidth="3" filter="url(#pet-shadow)" />

        {/* Back Leg */}
        <ellipse cx="170" cy="175" rx="18" ry="14" fill="#F59E0B" />

        {/* Left Front Leg (Healed or with Bandage) */}
        <g>
          <rect x="95" y="155" width="16" height="35" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
          {/* Paw */}
          <ellipse cx="103" cy="190" rx="11" ry="8" fill="#F59E0B" />
        </g>

        {/* Right Front Leg (Injured/Bandaged) */}
        <g>
          <rect x="125" y="155" width="16" height="35" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
          <ellipse cx="133" cy="190" rx="11" ry="8" fill="#F59E0B" />
          
          {/* Bandage */}
          {!isHealed && (
            <g>
              <rect x="122" y="165" width="22" height="18" rx="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.5" />
              {/* Red cross on bandage */}
              <line x1="133" y1="169" x2="133" y2="179" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              <line x1="128" y1="174" x2="138" y2="174" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {isHealed && (
            <g>
              {/* Shiny star of complete healing! */}
              <circle cx="133" cy="174" r="6" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
              <text x="133" y="177" fontSize="8" textAnchor="middle" fill="#CA8A04">★</text>
            </g>
          )}
        </g>

        {/* Ears (floppy dog ears) */}
        <ellipse cx="60" cy="95" rx="16" ry="32" fill="#B45309" transform="rotate(-15 60 95)" />
        <ellipse cx="130" cy="95" rx="16" ry="32" fill="#B45309" transform="rotate(15 130 95)" />

        {/* Head */}
        <circle cx="95" cy="95" r="42" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />

        {/* Snout / Muzzle */}
        <ellipse cx="95" cy="112" rx="22" ry="16" fill="#FEF3C7" />
        <ellipse cx="95" cy="105" rx="8" ry="6" fill="#1E293B" /> {/* Nose */}

        {/* Eyes */}
        {!isHealed && !isImproving && (
          // Sad droopy eyes when sick
          <g>
            <path d="M 75 92 Q 83 97 89 92" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 101 92 Q 107 97 115 92" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Little tear drop */}
            <circle cx="73" cy="100" r="3" fill="#60A5FA" />
          </g>
        )}

        {(isImproving || isHealed) && (
          // Happy sparkling eyes
          <g>
            <circle cx="82" cy="92" r="6" fill="#1E293B" />
            <circle cx="80" cy="90" r="2.2" fill="#FFFFFF" />
            <circle cx="108" cy="92" r="6" fill="#1E293B" />
            <circle cx="106" cy="90" r="2.2" fill="#FFFFFF" />
          </g>
        )}

        {/* Mouth */}
        {!isHealed ? (
          <path d="M 90 120 Q 95 116 100 120" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        ) : (
          <g>
            <path d="M 88 116 Q 95 125 102 116" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Little cute tongue sticking out */}
            <path d="M 92 121 Q 95 128 98 121 Z" fill="#FB7185" />
          </g>
        )}

        {/* Rosy Cheeks */}
        <circle cx="75" cy="108" r="6" fill="#F43F5E" fillOpacity="0.35" />
        <circle cx="115" cy="108" r="6" fill="#F43F5E" fillOpacity="0.35" />

        {/* Floating Hearts if Happy or Petting */}
        {(isHealed || isPetting) && (
          <g className="animate-bounce">
            <path
              d="M 170 60 C 170 50 160 45 152 52 C 144 45 134 50 134 60 C 134 75 152 85 152 85 C 152 85 170 75 170 60 Z"
              fill="#F43F5E"
            />
          </g>
        )}
      </svg>
    );
  }

  // Render Misi (Kitten)
  if (patientId === 'misi') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${isPetting ? 'scale-110' : ''} ${className}`}
      >
        {/* Cat Tail curled */}
        <path
          d={isHealed ? "M 175 155 Q 215 130 200 95 Q 185 105 170 145" : "M 175 155 Q 195 170 185 185"}
          fill="#FB923C"
          stroke="#EA580C"
          strokeWidth="3"
        />

        {/* Body */}
        <ellipse cx="130" cy="155" rx="50" ry="42" fill="#FDBA74" stroke="#EA580C" strokeWidth="3" />

        {/* Paws */}
        <ellipse cx="98" cy="188" rx="10" ry="7" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
        <ellipse cx="125" cy="188" rx="10" ry="7" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
        <ellipse cx="152" cy="188" rx="10" ry="7" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />

        {/* Cat Ears */}
        <polygon points="65,90 55,45 92,68" fill="#FB923C" stroke="#EA580C" strokeWidth="3" />
        <polygon points="68,82 62,55 86,70" fill="#FDA4AF" />
        <polygon points="115,68 150,45 142,90" fill="#FB923C" stroke="#EA580C" strokeWidth="3" />
        <polygon points="120,70 144,55 138,82" fill="#FDA4AF" />

        {/* Head */}
        <circle cx="102" cy="98" r="42" fill="#FDBA74" stroke="#EA580C" strokeWidth="3" />

        {/* Calico patches */}
        <path d="M 72 70 Q 85 85 70 100 Q 60 85 72 70 Z" fill="#9A3412" />
        <path d="M 125 75 Q 140 85 130 105 Q 118 90 125 75 Z" fill="#475569" />

        {/* Cozy Scarf */}
        <path
          d="M 70 132 C 85 140 120 140 135 132 C 145 138 140 152 130 152 C 105 152 80 152 68 144 Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="2"
        />
        {/* Scarf tail */}
        <path d="M 120 140 L 126 168 L 112 168 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />

        {/* Nose & Mouth */}
        <polygon points="102,108 97,103 107,103" fill="#F43F5E" />

        {/* Thermometer in mouth if sick */}
        {!isHealed && (
          <g>
            <rect x="100" y="112" width="28" height="6" rx="3" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" transform="rotate(-15 100 112)" />
            <circle cx="126" cy="105" r="4" fill="#EF4444" />
          </g>
        )}

        {/* Whiskers */}
        <line x1="68" y1="108" x2="50" y2="105" stroke="#78350F" strokeWidth="1.5" />
        <line x1="68" y1="113" x2="48" y2="116" stroke="#78350F" strokeWidth="1.5" />
        <line x1="134" y1="108" x2="152" y2="105" stroke="#78350F" strokeWidth="1.5" />
        <line x1="134" y1="113" x2="154" y2="116" stroke="#78350F" strokeWidth="1.5" />

        {/* Eyes */}
        {!isHealed ? (
          // Squinty sneezing eyes
          <g stroke="#1E293B" strokeWidth="3" strokeLinecap="round">
            <path d="M 82 96 L 92 96" />
            <path d="M 112 96 L 122 96" />
            <text x="135" y="85" fontSize="12" fill="#38BDF8">Achu!</text>
          </g>
        ) : (
          // Happy big anime kitten eyes
          <g>
            <ellipse cx="86" cy="94" rx="7" ry="9" fill="#047857" />
            <circle cx="84" cy="91" r="3" fill="#FFFFFF" />
            <ellipse cx="118" cy="94" rx="7" ry="9" fill="#047857" />
            <circle cx="116" cy="91" r="3" fill="#FFFFFF" />
          </g>
        )}

        {/* Bell Collar if healed */}
        {isHealed && (
          <circle cx="102" cy="144" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        )}
      </svg>
    );
  }

  // Render Tambor (Rabbit)
  if (patientId === 'tambor') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${isPetting ? 'scale-110' : ''} ${className}`}
      >
        {/* Rabbit Ears */}
        <g>
          {/* Left ear */}
          <ellipse cx="80" cy="55" rx="14" ry="40" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" transform="rotate(-10 80 55)" />
          <ellipse cx="80" cy="55" rx="7" ry="28" fill="#FBCFE8" transform="rotate(-10 80 55)" />
          {/* Right ear */}
          <ellipse cx="130" cy="55" rx="14" ry="40" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" transform="rotate(10 130 55)" />
          <ellipse cx="130" cy="55" rx="7" ry="28" fill="#FBCFE8" transform="rotate(10 130 55)" />
        </g>

        {/* Fluffy Tail */}
        <circle cx="180" cy="165" r="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

        {/* Body */}
        <ellipse cx="130" cy="155" rx="46" ry="40" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

        {/* Big Paws */}
        <ellipse cx="100" cy="188" rx="14" ry="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <ellipse cx="140" cy="188" rx="14" ry="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

        {/* Head */}
        <circle cx="105" cy="110" r="38" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

        {/* Nose & Twitchy Mouth */}
        <polygon points="105,116 101,112 109,112" fill="#F43F5E" />
        <path d="M 101 120 Q 105 124 109 120" stroke="#64748B" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Cheeks */}
        <circle cx="85" cy="120" r="6" fill="#FDA4AF" fillOpacity="0.5" />
        <circle cx="125" cy="120" r="6" fill="#FDA4AF" fillOpacity="0.5" />

        {/* Eyes */}
        {!isHealed ? (
          // Dizzy swirl eyes
          <g stroke="#64748B" strokeWidth="2.5" fill="none">
            <circle cx="88" cy="106" r="6" strokeDasharray="3 3" />
            <circle cx="122" cy="106" r="6" strokeDasharray="3 3" />
            <text x="135" y="90" fontSize="14">💫</text>
          </g>
        ) : (
          <g>
            <circle cx="88" cy="106" r="6" fill="#1E293B" />
            <circle cx="86" cy="103" r="2.2" fill="#FFFFFF" />
            <circle cx="122" cy="106" r="6" fill="#1E293B" />
            <circle cx="120" cy="103" r="2.2" fill="#FFFFFF" />
          </g>
        )}

        {/* Crunchy Carrot in paws if healed */}
        {isHealed && (
          <g transform="translate(115, 145) rotate(20)">
            <polygon points="0,0 20,-6 24,6" fill="#F97316" />
            <path d="M 22,0 L 28,-3 M 22,0 L 30,0 M 22,0 L 28,3" stroke="#22C55E" strokeWidth="2" />
          </g>
        )}
      </svg>
    );
  }

  // Render Pipo (Hedgehog)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${isPetting ? 'scale-110' : ''} ${className}`}
    >
      {/* Hedgehog Spines / Back */}
      <g fill="#78350F" stroke="#451A03" strokeWidth="2">
        <path d="M 70 145 Q 40 100 85 60 Q 140 40 185 85 Q 210 135 170 170 Q 110 185 70 145 Z" />
        {/* Extra spikes */}
        <polygon points="65,95 45,90 60,110" />
        <polygon points="90,55 85,35 105,50" />
        <polygon points="135,45 145,25 155,50" />
        <polygon points="175,65 195,50 185,80" />
        <polygon points="195,100 215,95 195,120" />
        <polygon points="180,145 200,155 175,165" />
      </g>

      {/* Twigs and leaves tangled if sick */}
      {!isHealed && (
        <g stroke="#92400E" strokeWidth="3" strokeLinecap="round">
          <line x1="120" y1="40" x2="140" y2="60" />
          <line x1="130" y1="50" x2="145" y2="45" />
          <ellipse cx="150" cy="70" rx="8" ry="4" fill="#65A30D" stroke="#365314" strokeWidth="1" transform="rotate(30 150 70)" />
          <ellipse cx="90" cy="75" rx="7" ry="4" fill="#B45309" stroke="#78350F" strokeWidth="1" transform="rotate(-20 90 75)" />
        </g>
      )}

      {/* Belly / Face */}
      <ellipse cx="95" cy="140" rx="35" ry="26" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />

      {/* Tiny Snout */}
      <ellipse cx="65" cy="142" rx="14" ry="10" fill="#FDE68A" />
      <circle cx="56" cy="140" r="4.5" fill="#1E293B" /> {/* Nose */}

      {/* Little Paws */}
      <ellipse cx="85" cy="170" rx="7" ry="5" fill="#D97706" />
      <ellipse cx="120" cy="170" rx="7" ry="5" fill="#D97706" />

      {/* Cheeks */}
      <circle cx="80" cy="146" r="5" fill="#FB7185" fillOpacity="0.4" />

      {/* Eyes */}
      {!isHealed ? (
        <circle cx="78" cy="136" r="4" fill="#1E293B" />
      ) : (
        <g>
          <circle cx="78" cy="136" r="5" fill="#1E293B" />
          <circle cx="77" cy="134" r="2" fill="#FFFFFF" />
        </g>
      )}

      {/* Shiny apple reward if healed */}
      {isHealed && (
        <g transform="translate(130, 110)">
          <circle cx="15" cy="15" r="12" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <path d="M 15 5 Q 18 0 20 2" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="20" cy="3" rx="3" ry="1.5" fill="#22C55E" />
        </g>
      )}
    </svg>
  );
};
