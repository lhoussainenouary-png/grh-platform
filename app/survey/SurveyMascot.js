'use client'

/**
 * Simple SVG mascots per wizard step — remounted with key={step} for entrance animation.
 */
export default function SurveyMascot({ step }) {
  const common = { className: 'surveyMascotSvg', viewBox: '0 0 120 140', role: 'img', 'aria-hidden': true }

  switch (step) {
    case 0:
      return (
        <svg {...common}>
          <title>Guide profil</title>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(26,26,46,0.08)" />
          <circle cx="60" cy="52" r="28" fill="#c9a84c" />
          <circle cx="52" cy="48" r="4" fill="#1a1a2e" />
          <circle cx="68" cy="48" r="4" fill="#1a1a2e" />
          <path d="M52 62 Q60 70 68 62" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="38" y="82" width="44" height="36" rx="8" fill="#4a6741" />
        </svg>
      )
    case 1:
      return (
        <svg {...common}>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(74,103,65,0.12)" />
          <circle cx="60" cy="50" r="26" fill="#8b3a3a" />
          <rect x="48" y="44" width="10" height="6" rx="1" fill="#f5f0e8" />
          <path d="M34 78 L86 78 L80 108 L40 108 Z" fill="#1a1a2e" />
          <path d="M50 78 L70 78 L66 95 L54 95 Z" fill="#c9a84c" />
        </svg>
      )
    case 2:
      return (
        <svg {...common}>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(201,168,76,0.15)" />
          <circle cx="60" cy="48" r="24" fill="#f5f0e8" stroke="#1a1a2e" strokeWidth="2" />
          <path d="M52 46 h6 M62 46 h6" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 58 Q60 64 68 58" stroke="#4a6741" strokeWidth="2" fill="none" />
          <ellipse cx="75" cy="55" rx="8" ry="12" fill="#c9a84c" opacity="0.9" />
        </svg>
      )
    case 3:
      return (
        <svg {...common}>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(139,58,58,0.1)" />
          <rect x="44" y="32" width="32" height="40" rx="10" fill="#1a1a2e" />
          <circle cx="54" cy="50" r="4" fill="#f5f0e8" />
          <circle cx="66" cy="50" r="4" fill="#f5f0e8" />
          <rect x="40" y="78" width="40" height="32" rx="6" fill="#c9a84c" />
          <rect x="52" y="88" width="16" height="14" rx="2" fill="#f5f0e8" opacity="0.4" />
        </svg>
      )
    case 4:
      return (
        <svg {...common}>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(26,26,46,0.08)" />
          <circle cx="60" cy="50" r="26" fill="#4a6741" />
          <path d="M48 48 L56 52 L48 56" stroke="#f5f0e8" strokeWidth="2" fill="none" />
          <path d="M72 48 L64 52 L72 56" stroke="#f5f0e8" strokeWidth="2" fill="none" />
          <rect x="42" y="82" width="36" height="28" rx="6" fill="#8b3a3a" />
        </svg>
      )
    case 5:
      return (
        <svg {...common}>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(74,103,65,0.12)" />
          <circle cx="60" cy="46" r="22" fill="#f5f0e8" stroke="#c9a84c" strokeWidth="3" />
          <circle cx="54" cy="44" r="3" fill="#1a1a2e" />
          <circle cx="66" cy="44" r="3" fill="#1a1a2e" />
          <path d="M38 88 Q60 72 82 88" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="102" r="6" fill="#c9a84c" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <ellipse cx="60" cy="118" rx="36" ry="10" fill="rgba(201,168,76,0.15)" />
          <circle cx="60" cy="50" r="24" fill="#1a1a2e" />
          <path d="M54 48 Q60 52 66 48" stroke="#f5f0e8" strokeWidth="2" fill="none" />
          <rect x="46" y="78" width="28" height="34" rx="6" fill="#c9a84c" />
          <path d="M40 72 L52 68 M80 72 L68 68" stroke="#4a6741" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
  }
}
