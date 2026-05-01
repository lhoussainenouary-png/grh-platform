'use client'

/**
 * Polished SVG mascots per wizard step — remounted with key={step} for entrance animation.
 * Brand palette: #c9a84c gold · #1a1a2e navy · #4a6741 forest · #8b3a3a burgundy · #f5f0e8 cream
 */
export default function SurveyMascot({ step }) {
  const props = {
    className: 'surveyMascotSvg',
    viewBox: '0 0 120 140',
    role: 'img',
    'aria-hidden': true,
  }

  switch (step) {
    // ─── Step 0 · Bienvenue / Profil ─────────────────────────────────────────
    case 0:
      return (
        <svg {...props}>
          <title>Guide profil</title>

          {/* ground shadow */}
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(26,26,46,0.10)" />

          {/* waving arm (right) — drawn before head so head overlaps */}
          <line x1="83" y1="88" x2="108" y2="66" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />
          <circle cx="109" cy="63" r="8" fill="#c9a84c" />

          {/* left arm resting */}
          <line x1="37" y1="92" x2="20" y2="108" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />

          {/* body – forest green */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#4a6741" />
          {/* collar V */}
          <path d="M52 82 L60 94 L68 82" fill="#f5f0e8" opacity="0.85" />
          {/* nametag */}
          <rect x="44" y="96" width="20" height="14" rx="3" fill="#f5f0e8" />
          <rect x="47" y="100" width="8" height="2" rx="1" fill="#1a1a2e" opacity="0.45" />
          <rect x="47" y="104" width="12" height="2" rx="1" fill="#c9a84c" opacity="0.75" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#c9a84c" />

          {/* hair */}
          <path d="M34 46 Q37 24 60 22 Q83 24 86 46 Q78 36 60 36 Q42 36 34 46Z" fill="#1a1a2e" />

          {/* eye whites */}
          <ellipse cx="51" cy="48" rx="5.5" ry="6" fill="white" />
          <ellipse cx="69" cy="48" rx="5.5" ry="6" fill="white" />
          {/* pupils */}
          <circle cx="52" cy="49" r="3" fill="#1a1a2e" />
          <circle cx="70" cy="49" r="3" fill="#1a1a2e" />
          {/* shines */}
          <circle cx="53.5" cy="47.5" r="1.2" fill="white" />
          <circle cx="71.5" cy="47.5" r="1.2" fill="white" />

          {/* eyebrows (raised – happy) */}
          <path d="M46 40 Q51 37 56 39" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M64 39 Q69 37 74 40" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* big smile */}
          <path d="M50 58 Q60 70 70 58" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* cheeks */}
          <ellipse cx="43" cy="56" rx="6" ry="4" fill="#e8956d" opacity="0.30" />
          <ellipse cx="77" cy="56" rx="6" ry="4" fill="#e8956d" opacity="0.30" />
        </svg>
      )

    // ─── Step 1 · Expérience / Professionnel ────────────────────────────────
    case 1:
      return (
        <svg {...props}>
          <title>Expérience professionnelle</title>
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(74,103,65,0.12)" />

          {/* clipboard */}
          <rect x="12" y="70" width="24" height="30" rx="3" fill="#f5f0e8" />
          <rect x="20" y="66" width="8" height="7" rx="2" fill="#c9a84c" />
          <line x1="16" y1="79" x2="32" y2="79" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.40" />
          <line x1="16" y1="84" x2="32" y2="84" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.40" />
          <line x1="16" y1="89" x2="26" y2="89" stroke="#c9a84c" strokeWidth="1.5" opacity="0.70" />

          {/* left arm holding clipboard */}
          <line x1="36" y1="90" x2="22" y2="83" stroke="#f5f0e8" strokeWidth="9" strokeLinecap="round" />
          {/* right arm */}
          <line x1="84" y1="90" x2="98" y2="100" stroke="#f5f0e8" strokeWidth="9" strokeLinecap="round" />

          {/* body – burgundy */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#8b3a3a" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#f5f0e8" />

          {/* hair – short dark */}
          <path d="M35 44 Q37 24 60 22 Q83 24 85 44 Q76 34 60 34 Q44 34 35 44Z" fill="#1a1a2e" />
          <rect x="34" y="43" width="5" height="10" rx="2" fill="#1a1a2e" />
          <rect x="81" y="43" width="5" height="10" rx="2" fill="#1a1a2e" />

          {/* glasses frames */}
          <rect x="43" y="43" width="14" height="10" rx="4" fill="none" stroke="#8b3a3a" strokeWidth="2.2" />
          <rect x="63" y="43" width="14" height="10" rx="4" fill="none" stroke="#8b3a3a" strokeWidth="2.2" />
          <line x1="57" y1="47" x2="63" y2="47" stroke="#8b3a3a" strokeWidth="2" />
          <line x1="34" y1="46" x2="43" y2="46" stroke="#8b3a3a" strokeWidth="1.5" />
          <line x1="77" y1="46" x2="86" y2="46" stroke="#8b3a3a" strokeWidth="1.5" />

          {/* eyes (behind glasses) */}
          <circle cx="50" cy="48" r="2.5" fill="#1a1a2e" />
          <circle cx="70" cy="48" r="2.5" fill="#1a1a2e" />
          <circle cx="51" cy="47" r="1" fill="white" />
          <circle cx="71" cy="47" r="1" fill="white" />

          {/* eyebrows */}
          <path d="M44 41 Q50 39 56 41" stroke="#1a1a2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M64 41 Q70 39 76 41" stroke="#1a1a2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* confident smile */}
          <path d="M52 60 Q60 67 68 60" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* cheeks – subtle */}
          <ellipse cx="42" cy="57" rx="6" ry="4" fill="#e8956d" opacity="0.20" />
          <ellipse cx="78" cy="57" rx="6" ry="4" fill="#e8956d" opacity="0.20" />
        </svg>
      )

    // ─── Step 2 · Compétences / Idées ────────────────────────────────────────
    case 2:
      return (
        <svg {...props}>
          <title>Compétences</title>
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(201,168,76,0.15)" />

          {/* arms */}
          <line x1="36" y1="92" x2="20" y2="104" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />
          <line x1="84" y1="92" x2="100" y2="104" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />

          {/* body – navy */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#1a1a2e" />
          {/* pocket accent */}
          <rect x="56" y="88" width="16" height="10" rx="2" fill="#c9a84c" opacity="0.22" />

          {/* lightbulb */}
          <ellipse cx="96" cy="24" rx="10" ry="11" fill="#f5f0e8" stroke="#c9a84c" strokeWidth="1.5" />
          <path d="M91 28 Q96 21 101 28" stroke="#c9a84c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <line x1="92" y1="33" x2="100" y2="33" stroke="#1a1a2e" strokeWidth="1.5" />
          <line x1="93" y1="36" x2="99" y2="36" stroke="#1a1a2e" strokeWidth="1.5" />
          {/* glow ring */}
          <ellipse cx="96" cy="22" rx="14" ry="14" fill="#c9a84c" opacity="0.09" />
          {/* dot trail from head to bulb */}
          <circle cx="84" cy="30" r="2.5" fill="#c9a84c" opacity="0.50" />
          <circle cx="78" cy="38" r="2" fill="#c9a84c" opacity="0.35" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#c9a84c" />

          {/* hair – wavy */}
          <path d="M34 44 Q36 28 48 24 Q60 20 72 24 Q84 28 86 44" fill="#1a1a2e" />

          {/* eye whites */}
          <ellipse cx="51" cy="47" rx="5.5" ry="6" fill="white" />
          <ellipse cx="69" cy="47" rx="5.5" ry="6" fill="white" />
          {/* pupils – looking up-right */}
          <circle cx="53" cy="46" r="3" fill="#1a1a2e" />
          <circle cx="71" cy="46" r="3" fill="#1a1a2e" />
          <circle cx="54.5" cy="44.5" r="1.2" fill="white" />
          <circle cx="72.5" cy="44.5" r="1.2" fill="white" />

          {/* eyebrows (raised – thoughtful) */}
          <path d="M46 39 Q51 36 56 38" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M64 37 Q69 34 74 37" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* curious slight smile */}
          <path d="M52 60 Q60 67 68 60" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* cheeks */}
          <ellipse cx="43" cy="57" rx="6" ry="4" fill="#e8956d" opacity="0.28" />
          <ellipse cx="77" cy="57" rx="6" ry="4" fill="#e8956d" opacity="0.28" />
        </svg>
      )

    // ─── Step 3 · Domaine technique ──────────────────────────────────────────
    case 3:
      return (
        <svg {...props}>
          <title>Domaine technique</title>
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(139,58,58,0.10)" />

          {/* arms */}
          <line x1="36" y1="94" x2="22" y2="108" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round" />
          <line x1="84" y1="94" x2="98" y2="108" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round" />

          {/* body – dark hoodie */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#1a1a2e" />
          {/* hoodie center seam */}
          <line x1="60" y1="82" x2="60" y2="114" stroke="#c9a84c" strokeWidth="1" opacity="0.28" />
          {/* kangaroo pocket */}
          <path d="M47 110 Q60 106 73 110 L73 126 Q60 128 47 126Z" fill="#c9a84c" opacity="0.15" />

          {/* code symbol on chest */}
          <path d="M50 96 L46 100 L50 104" stroke="#c9a84c" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65" />
          <path d="M70 96 L74 100 L70 104" stroke="#c9a84c" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65" />
          <line x1="56" y1="94" x2="64" y2="106" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#f5f0e8" />

          {/* hair */}
          <path d="M34 45 Q36 24 60 22 Q84 24 86 45 Q78 34 60 34 Q42 34 34 45Z" fill="#1a1a2e" />
          <rect x="34" y="44" width="5" height="12" rx="2" fill="#1a1a2e" />
          <rect x="81" y="44" width="5" height="12" rx="2" fill="#1a1a2e" />

          {/* headband accent */}
          <path d="M34 42 Q60 34 86 42" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />

          {/* eye whites */}
          <ellipse cx="51" cy="48" rx="5.5" ry="5.5" fill="white" />
          <ellipse cx="69" cy="48" rx="5.5" ry="5.5" fill="white" />
          {/* pupils – focused straight */}
          <circle cx="52" cy="49" r="3" fill="#1a1a2e" />
          <circle cx="70" cy="49" r="3" fill="#1a1a2e" />
          <circle cx="53.5" cy="47.5" r="1.2" fill="white" />
          <circle cx="71.5" cy="47.5" r="1.2" fill="white" />

          {/* focused flat eyebrows */}
          <path d="M46 41 L56 40" stroke="#1a1a2e" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M64 40 L74 41" stroke="#1a1a2e" strokeWidth="2.2" strokeLinecap="round" />

          {/* neutral-focus mouth */}
          <path d="M53 60 Q60 63 67 60" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )

    // ─── Step 4 · Objectifs ──────────────────────────────────────────────────
    case 4:
      return (
        <svg {...props}>
          <title>Objectifs</title>
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(26,26,46,0.08)" />

          {/* target / bullseye */}
          <circle cx="108" cy="42" r="14" fill="none" stroke="#8b3a3a" strokeWidth="2" opacity="0.70" />
          <circle cx="108" cy="42" r="9" fill="none" stroke="#8b3a3a" strokeWidth="2" opacity="0.70" />
          <circle cx="108" cy="42" r="3.5" fill="#8b3a3a" opacity="0.80" />

          {/* pointing right arm */}
          <line x1="83" y1="88" x2="107" y2="76" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />
          <circle cx="108" cy="73" r="7.5" fill="#c9a84c" />
          {/* pointing finger */}
          <line x1="108" y1="65" x2="108" y2="55" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />

          {/* left arm */}
          <line x1="37" y1="92" x2="20" y2="102" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />

          {/* body – forest green */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#4a6741" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#c9a84c" />

          {/* hair – dark with burgundy tint */}
          <path d="M34 45 Q36 22 60 20 Q84 22 86 45" fill="#8b3a3a" />

          {/* eye whites */}
          <ellipse cx="51" cy="48" rx="5.5" ry="6" fill="white" />
          <ellipse cx="69" cy="48" rx="5.5" ry="6" fill="white" />
          {/* pupils – looking right */}
          <circle cx="53" cy="49" r="3" fill="#1a1a2e" />
          <circle cx="71" cy="49" r="3" fill="#1a1a2e" />
          <circle cx="54.5" cy="47.5" r="1.2" fill="white" />
          <circle cx="72.5" cy="47.5" r="1.2" fill="white" />

          {/* determined eyebrows */}
          <path d="M46 41 Q51 38 56 41" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M64 41 Q69 38 74 41" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* confident smile */}
          <path d="M51 59 Q60 69 69 59" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* cheeks */}
          <ellipse cx="43" cy="56" rx="6" ry="4" fill="#e8956d" opacity="0.28" />
          <ellipse cx="77" cy="56" rx="6" ry="4" fill="#e8956d" opacity="0.28" />
        </svg>
      )

    // ─── Step 5 · Terminé / Soumission ───────────────────────────────────────
    case 5:
      return (
        <svg {...props}>
          <title>Formulaire complété</title>
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(201,168,76,0.20)" />

          {/* confetti */}
          <rect x="13" y="28" width="6" height="6" rx="1" fill="#8b3a3a" opacity="0.80" transform="rotate(20,13,28)" />
          <rect x="100" y="30" width="6" height="6" rx="1" fill="#4a6741" opacity="0.80" transform="rotate(-15,100,30)" />
          <circle cx="24" cy="44" r="3.5" fill="#c9a84c" opacity="0.75" />
          <circle cx="96" cy="44" r="3.5" fill="#8b3a3a" opacity="0.75" />
          <rect x="17" y="58" width="5" height="5" rx="1" fill="#4a6741" opacity="0.70" transform="rotate(30,17,58)" />
          <rect x="98" y="56" width="5" height="5" rx="1" fill="#c9a84c" opacity="0.70" transform="rotate(-25,98,56)" />
          <path d="M10 50 L14 45 L18 50" stroke="#c9a84c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M102 52 L106 47 L110 52" stroke="#8b3a3a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* both arms raised */}
          <line x1="36" y1="88" x2="14" y2="68" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />
          <circle cx="11" cy="65" r="8" fill="#c9a84c" />
          <line x1="84" y1="88" x2="106" y2="68" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />
          <circle cx="109" cy="65" r="8" fill="#c9a84c" />

          {/* body – gold */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#c9a84c" />
          {/* checkmark */}
          <path d="M48 102 L56 112 L72 92" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#f5f0e8" stroke="#c9a84c" strokeWidth="3" />

          {/* hair */}
          <path d="M35 44 Q37 23 60 21 Q83 23 85 44 Q77 34 60 34 Q43 34 35 44Z" fill="#1a1a2e" />

          {/* eye whites – wider for big reaction */}
          <ellipse cx="51" cy="48" rx="6" ry="7" fill="white" />
          <ellipse cx="69" cy="48" rx="6" ry="7" fill="white" />
          <circle cx="52" cy="50" r="3.5" fill="#1a1a2e" />
          <circle cx="70" cy="50" r="3.5" fill="#1a1a2e" />
          <circle cx="53.5" cy="48" r="1.5" fill="white" />
          <circle cx="71.5" cy="48" r="1.5" fill="white" />

          {/* raised happy eyebrows */}
          <path d="M45 39 Q51 35 57 38" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M63 38 Q69 35 75 39" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* big grin */}
          <path d="M49 59 Q60 74 71 59" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* strong cheeks */}
          <ellipse cx="42" cy="57" rx="7" ry="5" fill="#e8956d" opacity="0.38" />
          <ellipse cx="78" cy="57" rx="7" ry="5" fill="#e8956d" opacity="0.38" />
        </svg>
      )

    // ─── Default ─────────────────────────────────────────────────────────────
    default:
      return (
        <svg {...props}>
          <title>Mascotte</title>
          <ellipse cx="60" cy="135" rx="32" ry="6" fill="rgba(201,168,76,0.15)" />

          {/* arms */}
          <line x1="36" y1="92" x2="20" y2="106" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />
          <line x1="84" y1="92" x2="100" y2="106" stroke="#c9a84c" strokeWidth="9" strokeLinecap="round" />

          {/* body */}
          <rect x="36" y="82" width="48" height="44" rx="10" fill="#1a1a2e" />

          {/* head */}
          <circle cx="60" cy="50" r="26" fill="#c9a84c" />

          {/* hair */}
          <path d="M34 45 Q36 24 60 22 Q84 24 86 45 Q78 34 60 34 Q42 34 34 45Z" fill="#1a1a2e" />

          {/* eye whites */}
          <ellipse cx="51" cy="48" rx="5.5" ry="6" fill="white" />
          <ellipse cx="69" cy="48" rx="5.5" ry="6" fill="white" />
          {/* pupils */}
          <circle cx="52" cy="49" r="3" fill="#1a1a2e" />
          <circle cx="70" cy="49" r="3" fill="#1a1a2e" />
          {/* shines */}
          <circle cx="53.5" cy="47.5" r="1.2" fill="white" />
          <circle cx="71.5" cy="47.5" r="1.2" fill="white" />

          {/* eyebrows */}
          <path d="M46 41 Q51 38 56 41" stroke="#1a1a2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M64 41 Q69 38 74 41" stroke="#1a1a2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* neutral smile */}
          <path d="M52 60 Q60 66 68 60" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* cheeks */}
          <ellipse cx="43" cy="57" rx="6" ry="4" fill="#e8956d" opacity="0.28" />
          <ellipse cx="77" cy="57" rx="6" ry="4" fill="#e8956d" opacity="0.28" />
        </svg>
      )
  }
}