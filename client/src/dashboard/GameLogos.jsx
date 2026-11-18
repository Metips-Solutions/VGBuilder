import React from 'react';

export function GenshinLogo({ size = 48, className = '' }) {
  return (
    <img
      src="/Images/Genshin Impact/gi_logo.webp"
      alt="Logo Genshin Impact"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function ZZZLogo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Zenless Zone Zero"
    >
      <defs>
        <linearGradient id="zzzYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
        <linearGradient id="zzzDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
      </defs>
      {/* CRT Retro TV Monitor */}
      <rect x="6" y="8" width="52" height="46" rx="10" fill="url(#zzzDark)" stroke="#facc15" strokeWidth="2.5" />
      {/* Antennas */}
      <line x1="20" y1="2" x2="28" y2="8" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="2" x2="36" y2="8" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      {/* CRT screen bezel */}
      <rect x="11" y="13" width="42" height="34" rx="6" fill="#27272a" />
      {/* ZZZ text graffiti style */}
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fill="url(#zzzYellow)"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="17"
        letterSpacing="1"
      >
        ZZZ
      </text>
      {/* Neon glitch accents */}
      <line x1="14" y1="20" x2="22" y2="20" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="42" y1="40" x2="50" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
      {/* Screen scanlines indicator */}
      <circle cx="16" cy="58" r="2" fill="#facc15" />
      <circle cx="23" cy="58" r="2" fill="#52525b" />
    </svg>
  );
}

export function HSRLogo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Honkai Star Rail"
    >
      <defs>
        <linearGradient id="hsrTrail" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Astral Express Orbit Ring */}
      <ellipse cx="32" cy="32" rx="27" ry="12" transform="rotate(-30 32 32)" stroke="url(#hsrTrail)" strokeWidth="2" strokeDasharray="3 2" />
      {/* Express Train Silhouette / Nose */}
      <path
        d="M10 44 Q 28 36 46 22 L54 18 L50 26 Q 34 38 18 48 Z"
        fill="url(#hsrTrail)"
      />
      {/* Central Astral Compass Star */}
      <path
        d="M32 8 L35 25 L52 28 L35 31 L32 48 L29 31 L12 28 L29 25 Z"
        fill="#ffffff"
      />
      <circle cx="32" cy="28" r="3" fill="#fbbf24" />
      <circle cx="48" cy="14" r="1.5" fill="#ffffff" />
      <circle cx="16" cy="46" r="1.5" fill="#38bdf8" />
    </svg>
  );
}

export function UmaMusumeLogo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Uma Musume Pretty Derby"
    >
      <defs>
        <linearGradient id="umaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="umaRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
      {/* Ribbon tails */}
      <path d="M22 46 L14 60 L24 54 Z" fill="url(#umaRibbon)" />
      <path d="M42 46 L50 60 L40 54 Z" fill="url(#umaRibbon)" />
      {/* Golden Horseshoe */}
      <path
        d="M20 16 C 14 26 14 42 24 50 C 30 55 34 55 40 50 C 50 42 50 26 44 16 L37 18 C 42 26 42 38 35 43 C 32 45 30 45 28 43 C 21 38 21 26 27 18 Z"
        fill="url(#umaGold)"
        stroke="#ffffff"
        strokeWidth="1"
      />
      {/* Horseshoe Nail holes */}
      <circle cx="20" cy="28" r="1.8" fill="#78350f" />
      <circle cx="21" cy="38" r="1.8" fill="#78350f" />
      <circle cx="44" cy="28" r="1.8" fill="#78350f" />
      <circle cx="43" cy="38" r="1.8" fill="#78350f" />
      {/* Crown Star at center */}
      <path
        d="M32 18 L34 25 L41 25 L35 29 L37 36 L32 32 L27 36 L29 29 L23 25 L30 25 Z"
        fill="#ffffff"
        stroke="url(#umaRibbon)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export function WuWaLogo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Wuthering Waves"
    >
      <defs>
        <linearGradient id="wuwaTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Waveform concentric sound arcs */}
      <circle cx="32" cy="32" r="26" stroke="url(#wuwaTeal)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
      <circle cx="32" cy="32" r="19" stroke="url(#wuwaTeal)" strokeWidth="2" strokeOpacity="0.75" />
      {/* Resonator Tacet Core Crest */}
      <path
        d="M32 14 C 22 22 22 42 32 50 C 42 42 42 22 32 14 Z"
        fill="url(#wuwaTeal)"
        fillOpacity="0.35"
        stroke="#ffffff"
        strokeWidth="1.2"
      />
      <circle cx="32" cy="32" r="4.5" fill="#ffffff" />
      {/* Resonance Frequency marks */}
      <path d="M12 32 H18 M46 32 H52" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
