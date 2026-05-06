/* ATHLYNK — SVG marks, ornaments and mini-iconography
   Hand-crafted, minimal, geometric — no AI slop ornaments. */

const Wordmark = ({ size = 24, color = 'currentColor' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--display)', fontSize: size, letterSpacing: '-0.01em' }}>
    <Sigil size={size * 0.95} color={color} />
    <span>Athlynk</span>
  </span>
);

// Sigil: Α inside a hexagonal seal — mark of Athlynk
const Sigil = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16 1.5 L29 9 L29 23 L16 30.5 L3 23 L3 9 Z" stroke={color} strokeWidth="1" />
    <path d="M16 7 L22 23 M16 7 L10 23 M12.5 18 H19.5" stroke={color} strokeWidth="1.1" strokeLinecap="square" />
  </svg>
);

// Cursor sigil — circular mark with concentric rings
const CursorSigil = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" stroke="#f4efe4" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="36" stroke="#f4efe4" strokeWidth="0.6" strokeDasharray="2 4" />
    <path d="M50 12 L56 50 L50 88 L44 50 Z" fill="#f4efe4" opacity="0.9" />
    <circle cx="50" cy="50" r="2" fill="#f4efe4" />
  </svg>
);

// Geometric meander frieze (key pattern) — a single repeatable unit
const Meander = ({ height = 18, color = 'currentColor', width = '100%', inverted = false }) => (
  <svg width={width} height={height} viewBox="0 0 240 18" preserveAspectRatio="xMinYMid" style={{ display: 'block' }} aria-hidden="true">
    <g stroke={color} strokeWidth="1" fill="none">
      {[0, 30, 60, 90, 120, 150, 180, 210].map((x) => (
        <path
          key={x}
          d={inverted
            ? `M${x} 1 H${x + 24} V17 H${x + 6} V8 H${x + 18} V14 H${x + 9} V11 H${x + 15}`
            : `M${x} 17 H${x + 24} V1 H${x + 6} V10 H${x + 18} V4 H${x + 9} V7 H${x + 15}`}
        />
      ))}
    </g>
  </svg>
);

// Laurel — abstract geometric, never literal
const Laurel = ({ size = 56, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <g stroke={color} strokeWidth="1" fill="none">
      <path d="M32 4 V60" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <g key={y}>
          <path d={`M32 ${y} Q ${22 - i * 0.6} ${y - 4}, ${20 - i} ${y + 2}`} />
          <path d={`M32 ${y} Q ${42 + i * 0.6} ${y - 4}, ${44 + i} ${y + 2}`} />
        </g>
      ))}
    </g>
  </svg>
);

// Trident — Poseidone, abstract
const Trident = ({ size = 44, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <g stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square">
      <path d="M24 4 V44" />
      <path d="M10 4 V14 Q 10 20 24 22 Q 38 20 38 14 V4" />
      <path d="M10 6 H4 M38 6 H44" />
      <path d="M22 44 H26 L24 47 Z" fill={color} />
    </g>
  </svg>
);

// Lightning — Zeus, abstract geometric
const Bolt = ({ size = 36, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 48" fill="none" aria-hidden="true">
    <path d="M18 2 L4 26 H14 L10 46 L28 20 H18 L22 2 Z" stroke={color} strokeWidth="1" fill="none" strokeLinejoin="miter" />
  </svg>
);

// Capital — Doric/Ionic abstract column head
const Capital = ({ size = 40, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <g stroke={color} strokeWidth="1" fill="none">
      <rect x="2" y="6" width="44" height="6" />
      <rect x="6" y="14" width="36" height="4" />
      <path d="M8 20 H40 M8 26 H40 M8 32 H40 M8 38 H40" strokeOpacity="0.6" />
      <rect x="10" y="20" width="28" height="22" />
    </g>
  </svg>
);

// Tiny check mark for pricing
const Check = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7 L6 11 L12 3" stroke={color} strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

// Plus/minus seal
const SealPlus = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="13" stroke={color} strokeWidth="1" />
    <path d="M14 7 V21 M7 14 H21" stroke={color} strokeWidth="1" />
  </svg>
);

// Wave — egean
const Wave = ({ width = 200, height = 30, color = 'currentColor' }) => (
  <svg width={width} height={height} viewBox="0 0 200 30" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <g stroke={color} strokeWidth="1" fill="none">
      <path d="M0 15 Q 12.5 5, 25 15 T 50 15 T 75 15 T 100 15 T 125 15 T 150 15 T 175 15 T 200 15" />
      <path d="M0 22 Q 12.5 12, 25 22 T 50 22 T 75 22 T 100 22 T 125 22 T 150 22 T 175 22 T 200 22" opacity="0.5" />
    </g>
  </svg>
);

// Star/asterism for FAQ ornaments
const Star = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 0 V12 M0 6 H12 M2 2 L10 10 M10 2 L2 10" stroke={color} strokeWidth="0.8" />
  </svg>
);

Object.assign(window, { Wordmark, Sigil, CursorSigil, Meander, Laurel, Trident, Bolt, Capital, Check, SealPlus, Wave, Star });
