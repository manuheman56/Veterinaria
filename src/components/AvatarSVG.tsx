import React from 'react';
import { AvatarConfig } from '../types/game';

interface AvatarSVGProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  animate?: boolean;
}

export const AvatarSVG: React.FC<AvatarSVGProps> = ({
  config,
  size = 120,
  className = '',
  animate = true,
}) => {
  const {
    hairStyle,
    hairColor,
    skinTone,
    coatColor,
    scrubsColor,
    accessory,
    glasses,
  } = config;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'hover:scale-105 transition-transform duration-300' : ''} ${className}`}
    >
      <defs>
        {/* Soft shadow for depth */}
        <filter id="avatar-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
        </filter>
        <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hair Behind (for pigtails and curls) */}
      {hairStyle === 'pigtails' && (
        <g>
          {/* Left pigtail */}
          <ellipse cx="45" cy="95" rx="20" ry="32" fill={hairColor} transform="rotate(20 45 95)" />
          <circle cx="58" cy="80" r="7" fill="#F43F5E" /> {/* Bow */}
          {/* Right pigtail */}
          <ellipse cx="155" cy="95" rx="20" ry="32" fill={hairColor} transform="rotate(-20 155 95)" />
          <circle cx="142" cy="80" r="7" fill="#F43F5E" /> {/* Bow */}
        </g>
      )}

      {hairStyle === 'braids' && (
        <g>
          {/* Left braid */}
          <path d="M 50 90 Q 40 120 45 150 Q 52 145 55 120 Z" fill={hairColor} />
          <circle cx="45" cy="148" r="6" fill="#3B82F6" />
          {/* Right braid */}
          <path d="M 150 90 Q 160 120 155 150 Q 148 145 145 120 Z" fill={hairColor} />
          <circle cx="155" cy="148" r="6" fill="#3B82F6" />
        </g>
      )}

      {hairStyle === 'curly' && (
        <g fill={hairColor}>
          <circle cx="48" cy="80" r="18" />
          <circle cx="42" cy="105" r="16" />
          <circle cx="152" cy="80" r="18" />
          <circle cx="158" cy="105" r="16" />
        </g>
      )}

      {/* Body / Scrubs Shirt */}
      <path
        d="M 60 160 L 60 200 L 140 200 L 140 160 Q 100 175 60 160 Z"
        fill={scrubsColor}
      />
      {/* V-neck */}
      <path d="M 85 160 L 100 178 L 115 160 Z" fill={skinTone} />

      {/* Lab Coat / Bata de Veterinaria */}
      <path
        d="M 52 165 C 50 175 48 190 48 200 L 76 200 L 78 165 Z"
        fill={coatColor}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <path
        d="M 148 165 C 150 175 152 190 152 200 L 124 200 L 122 165 Z"
        fill={coatColor}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      {/* Lapels of lab coat */}
      <path d="M 74 165 L 85 185 L 68 185 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M 126 165 L 115 185 L 132 185 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />

      {/* Paw pocket print */}
      <circle cx="70" cy="190" r="3" fill="#94A3B8" />
      <circle cx="66" cy="186" r="1.5" fill="#94A3B8" />
      <circle cx="74" cy="186" r="1.5" fill="#94A3B8" />

      {/* Neck */}
      <rect x="88" y="140" width="24" height="24" rx="6" fill={skinTone} />

      {/* Head / Face */}
      <ellipse cx="100" cy="100" rx="46" ry="48" fill={skinTone} filter="url(#avatar-shadow)" />

      {/* Rosy Cheeks */}
      <circle cx="76" cy="112" r="10" fill="url(#cheekGlow)" />
      <circle cx="124" cy="112" r="10" fill="url(#cheekGlow)" />

      {/* Happy Big Eyes */}
      <g>
        {/* Left eye */}
        <ellipse cx="80" cy="98" rx="7" ry="9" fill="#1E293B" />
        <circle cx="78" cy="95" r="2.8" fill="#FFFFFF" />
        <circle cx="82" cy="101" r="1.2" fill="#FFFFFF" />

        {/* Right eye */}
        <ellipse cx="120" cy="98" rx="7" ry="9" fill="#1E293B" />
        <circle cx="118" cy="95" r="2.8" fill="#FFFFFF" />
        <circle cx="122" cy="101" r="1.2" fill="#FFFFFF" />

        {/* Eyelashes / Eyebrows */}
        <path d="M 72 86 Q 80 82 88 86" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 112 86 Q 120 82 128 86" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Cute Button Nose */}
      <ellipse cx="100" cy="107" rx="3.5" ry="2" fill="#E2A684" />

      {/* Cheerful Smile */}
      <path
        d="M 90 118 Q 100 130 110 118"
        stroke="#E11D48"
        strokeWidth="3"
        strokeLinecap="round"
        fill="#FFE4E6"
      />

      {/* Hair (Front / Bangs) */}
      <path
        d="M 54 90 C 54 55 75 48 100 48 C 125 48 146 55 146 90 C 140 76 128 66 112 66 C 96 66 88 78 82 72 C 76 66 65 72 54 90 Z"
        fill={hairColor}
      />
      {hairStyle === 'straight' && (
        <path
          d="M 54 88 L 52 130 C 52 135 60 135 62 125 L 62 90 Z"
          fill={hairColor}
        />
      )}
      {hairStyle === 'straight' && (
        <path
          d="M 146 88 L 148 130 C 148 135 140 135 138 125 L 138 90 Z"
          fill={hairColor}
        />
      )}

      {/* Accessory: Hairband */}
      {accessory === 'hairband' && (
        <path
          d="M 56 75 C 68 55 132 55 144 75"
          stroke="#EC4899"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Accessory: Stethoscope */}
      {accessory === 'stethoscope' && (
        <g>
          {/* Tubing around neck */}
          <path
            d="M 75 148 C 75 178 125 178 125 148"
            stroke="#0284C7"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 100 170 L 100 188"
            stroke="#0284C7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bell / Diaphragm */}
          <circle cx="100" cy="192" r="7" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
          <circle cx="100" cy="192" r="3" fill="#38BDF8" />
        </g>
      )}

      {/* Accessory: Badge */}
      {accessory === 'badge' && (
        <g>
          <rect x="70" y="166" width="16" height="12" rx="2" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
          <text x="78" y="175" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#854D0E">🐾</text>
        </g>
      )}

      {/* Glasses */}
      {glasses === 'round' && (
        <g stroke="#334155" strokeWidth="2.5" fill="none">
          <circle cx="80" cy="98" r="14" fill="#FFFFFF" fillOpacity="0.25" />
          <circle cx="120" cy="98" r="14" fill="#FFFFFF" fillOpacity="0.25" />
          <path d="M 94 98 L 106 98" />
          {/* Frame sides */}
          <path d="M 66 98 L 56 94" />
          <path d="M 134 98 L 144 94" />
        </g>
      )}

      {glasses === 'star' && (
        <g stroke="#EAB308" strokeWidth="2" fill="#FEF08A" fillOpacity="0.3">
          <polygon points="80,85 84,94 93,95 86,102 88,111 80,106 72,111 74,102 67,95 76,94" />
          <polygon points="120,85 124,94 133,95 126,102 128,111 120,106 112,111 114,102 107,95 116,94" />
          <path d="M 92 98 L 108 98" stroke="#EAB308" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};
