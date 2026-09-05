import type { SampleImage } from '../types';

// Helper to create detailed SVG remote sensing data-URIs
function createPortSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="deepWater" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a2540"/>
        <stop offset="50%" stop-color="#0e375d"/>
        <stop offset="100%" stop-color="#144973"/>
      </linearGradient>
      <linearGradient id="dockConcrete" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="50%" stop-color="#64748b"/>
        <stop offset="100%" stop-color="#334155"/>
      </linearGradient>
      <pattern id="containerGrid1" width="30" height="20" patternUnits="userSpaceOnUse">
        <rect x="1" y="1" width="12" height="6" fill="#ef4444" rx="1"/>
        <rect x="15" y="1" width="12" height="6" fill="#3b82f6" rx="1"/>
        <rect x="1" y="9" width="12" height="6" fill="#10b981" rx="1"/>
        <rect x="15" y="9" width="12" height="6" fill="#f59e0b" rx="1"/>
      </pattern>
      <pattern id="containerGrid2" width="24" height="16" patternUnits="userSpaceOnUse">
        <rect x="1" y="1" width="10" height="5" fill="#f97316" rx="0.5"/>
        <rect x="13" y="1" width="10" height="5" fill="#06b6d4" rx="0.5"/>
        <rect x="1" y="8" width="10" height="5" fill="#6366f1" rx="0.5"/>
        <rect x="13" y="8" width="10" height="5" fill="#84cc16" rx="0.5"/>
      </pattern>
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"/>
        <feComposite in2="SourceGraphic" in="gl" operator="over"/>
      </filter>
    </defs>

    <!-- Water body -->
    <rect width="1000" height="700" fill="url(#deepWater)"/>
    
    <!-- Coastal / Land mass -->
    <path d="M 0,0 L 450,0 L 520,180 L 480,320 L 600,450 L 580,700 L 0,700 Z" fill="#1e293b"/>
    <path d="M 0,0 L 430,0 L 500,170 L 460,310 L 580,440 L 560,700 L 0,700 Z" fill="#334155"/>
    <path d="M 0,0 L 410,0 L 480,160 L 440,300 L 550,430 L 530,700 L 0,700 Z" fill="#475569"/>

    <!-- Concrete Quay / Piers extending into water -->
    <!-- Pier 1 -->
    <path d="M 480,120 L 780,120 L 780,210 L 490,210 Z" fill="url(#dockConcrete)" stroke="#94a3b8" stroke-width="1.5"/>
    <!-- Pier 2 -->
    <path d="M 460,260 L 820,260 L 820,360 L 480,360 Z" fill="url(#dockConcrete)" stroke="#94a3b8" stroke-width="1.5"/>
    <!-- Pier 3 -->
    <path d="M 540,410 L 860,410 L 860,510 L 560,510 Z" fill="url(#dockConcrete)" stroke="#94a3b8" stroke-width="1.5"/>

    <!-- Container Terminals -->
    <rect x="50" y="40" width="320" height="150" fill="url(#containerGrid1)"/>
    <rect x="70" y="220" width="340" height="180" fill="url(#containerGrid2)"/>
    <rect x="80" y="430" width="380" height="220" fill="url(#containerGrid1)"/>

    <!-- Pier Container Stacks -->
    <rect x="510" y="130" width="220" height="65" fill="url(#containerGrid2)"/>
    <rect x="500" y="275" width="260" height="70" fill="url(#containerGrid1)"/>
    <rect x="570" y="425" width="240" height="70" fill="url(#containerGrid2)"/>

    <!-- Gantry Cranes (Yellow rails & booms) -->
    <g stroke="#eab308" stroke-width="3">
      <line x1="740" y1="110" x2="770" y2="110"/>
      <line x1="740" y1="220" x2="770" y2="220"/>
      <line x1="780" y1="250" x2="810" y2="250"/>
      <line x1="780" y1="370" x2="810" y2="370"/>
      <line x1="820" y1="400" x2="850" y2="400"/>
      <line x1="820" y1="520" x2="850" y2="520"/>
    </g>

    <!-- Cargo Ships / Vessels moored -->
    <!-- Ship 1 at Pier 1 -->
    <g transform="translate(800, 130)">
      <path d="M 0,15 L 140,0 L 160,25 L 140,50 L 0,35 Z" fill="#991b1b" stroke="#fca5a5" stroke-width="1"/>
      <rect x="25" y="6" width="100" height="38" fill="url(#containerGrid1)"/>
      <circle cx="15" cy="25" r="4" fill="#f8fafc"/>
    </g>

    <!-- Ship 2 at Pier 2 -->
    <g transform="translate(840, 275)">
      <path d="M 0,20 L 120,0 L 145,30 L 120,60 L 0,40 Z" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1"/>
      <rect x="20" y="8" width="90" height="44" fill="url(#containerGrid2)"/>
      <circle cx="12" cy="30" r="4" fill="#f8fafc"/>
    </g>

    <!-- Small vessels / Tugs in channel -->
    <ellipse cx="650" cy="50" rx="22" ry="7" fill="#dc2626" transform="rotate(-15 650 50)"/>
    <path d="M 620,55 Q 580,65 540,60" stroke="#bae6fd" stroke-width="2" fill="none" opacity="0.6"/>

    <ellipse cx="900" cy="620" rx="35" ry="10" fill="#0284c7" transform="rotate(30 900 620)"/>
    <path d="M 870,610 Q 820,590 770,600" stroke="#bae6fd" stroke-width="2.5" fill="none" opacity="0.6"/>

    <!-- Intermodal Rail & Highway tracks -->
    <path d="M 20,0 L 20,700 M 35,0 L 35,700" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2"/>
    <path d="M 420,0 Q 380,300 480,700" stroke="#64748b" stroke-width="6" fill="none"/>
    <path d="M 420,0 Q 380,300 480,700" stroke="#f8fafc" stroke-dasharray="10,10" stroke-width="1" fill="none"/>

    <!-- Grid lines / Sensor Telemetry overlay -->
    <g stroke="rgba(56, 189, 248, 0.2)" stroke-width="0.75">
      <line x1="250" y1="0" x2="250" y2="700"/>
      <line x1="500" y1="0" x2="500" y2="700"/>
      <line x1="750" y1="0" x2="750" y2="700"/>
      <line x1="0" y1="233" x2="1000" y2="233"/>
      <line x1="0" y1="466" x2="1000" y2="466"/>
    </g>

    <text x="20" y="685" fill="#38bdf8" font-family="monospace" font-size="12" opacity="0.8">WORLDVIEW-3 | 0.31m GSD | ROTTERDAM LOGISTICS HUB [51.9201°N, 4.2939°E]</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createForestSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="canopyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#064e3b"/>
        <stop offset="40%" stop-color="#065f46"/>
        <stop offset="100%" stop-color="#047857"/>
      </linearGradient>
      <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="#78350f"/>
        <stop offset="50%" stop-color="#92400e"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>
      <pattern id="denseCanopy" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="14" fill="#047857" opacity="0.8"/>
        <circle cx="28" cy="12" r="16" fill="#065f46" opacity="0.9"/>
        <circle cx="20" cy="30" r="15" fill="#022c22" opacity="0.95"/>
      </pattern>
      <pattern id="cropField" width="50" height="30" patternUnits="userSpaceOnUse">
        <rect width="48" height="28" fill="#d97706" opacity="0.35"/>
        <line x1="0" y1="5" x2="50" y2="5" stroke="#92400e" stroke-width="1"/>
        <line x1="0" y1="15" x2="50" y2="15" stroke="#92400e" stroke-width="1"/>
        <line x1="0" y1="25" x2="50" y2="25" stroke="#92400e" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Dense Primary RainForest Background -->
    <rect width="1000" height="700" fill="url(#canopyGreen)"/>
    <rect width="1000" height="700" fill="url(#denseCanopy)"/>

    <!-- Meandering Amazonian Muddy River -->
    <path d="M 0,220 C 250,150 220,420 500,380 C 700,350 820,550 1000,480 L 1000,560 C 800,640 680,420 480,450 C 220,490 200,240 0,300 Z" fill="url(#riverGrad)" stroke="#b45309" stroke-width="2"/>
    <!-- River Tributaries -->
    <path d="M 320,380 Q 260,540 180,680" stroke="#92400e" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M 680,410 Q 740,240 850,110" stroke="#92400e" stroke-width="18" fill="none" stroke-linecap="round"/>

    <!-- Fishbone Deforestation Cleared Parcels (Agricultural Expansion) -->
    <!-- Spine Road 1 -->
    <path d="M 120,0 L 120,240" stroke="#fed7aa" stroke-width="5"/>
    <path d="M 120,300 L 120,700" stroke="#fed7aa" stroke-width="5"/>
    <!-- Horizontal Feeder clear-cuts -->
    <g fill="#ca8a04" opacity="0.75">
      <rect x="130" y="320" width="160" height="40" rx="3"/>
      <rect x="20" y="380" width="90" height="50" rx="3"/>
      <rect x="130" y="440" width="180" height="60" rx="3" fill="url(#cropField)"/>
      <rect x="15" y="480" width="95" height="45" rx="3"/>
      <rect x="130" y="550" width="220" height="70" rx="3"/>
      <rect x="10" y="590" width="100" height="80" rx="3" fill="url(#cropField)"/>
    </g>

    <!-- Large Scale Industrial Ranching / Clear-Cut Sector (Upper Right) -->
    <path d="M 620,30 L 960,10 L 980,310 L 650,280 Z" fill="#b45309" opacity="0.65"/>
    <path d="M 640,50 L 940,30 L 960,290 L 670,260 Z" fill="url(#cropField)"/>
    
    <!-- Logging Access Paths -->
    <line x1="620" y1="30" x2="680" y2="410" stroke="#fdba74" stroke-width="3" stroke-dasharray="8,4"/>
    <line x1="800" y1="20" x2="820" y2="280" stroke="#fdba74" stroke-width="2.5"/>

    <!-- Burnt / Charcoal Degradation Patches -->
    <ellipse cx="780" cy="180" rx="45" ry="30" fill="#18181b" opacity="0.85"/>
    <ellipse cx="210" cy="340" rx="30" ry="18" fill="#27272a" opacity="0.7"/>

    <!-- Low Cloud & Cirrus Haze -->
    <ellipse cx="420" cy="110" rx="140" ry="35" fill="#f8fafc" opacity="0.3" filter="blur(15px)"/>
    <ellipse cx="880" cy="560" rx="110" ry="40" fill="#f8fafc" opacity="0.25" filter="blur(18px)"/>

    <!-- Grid & Coordinate Readout -->
    <g stroke="rgba(16, 185, 129, 0.2)" stroke-width="0.75">
      <line x1="333" y1="0" x2="333" y2="700"/>
      <line x1="666" y1="0" x2="666" y2="700"/>
      <line x1="0" y1="350" x2="1000" y2="350"/>
    </g>
    <text x="20" y="685" fill="#34d399" font-family="monospace" font-size="12" opacity="0.8">SENTINEL-2 MSI | 10m SWIR-COMPOSITE | RONDÔNIA DEFORESTATION FRONTIER [9.7411°S, 63.0555°W]</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createFloodSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="floodWater" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e3a8a"/>
        <stop offset="30%" stop-color="#172554"/>
        <stop offset="70%" stop-color="#1d4ed8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
      <linearGradient id="siltWater" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
      <pattern id="floodedFields" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="38" height="38" fill="#1e40af" opacity="0.7"/>
        <line x1="0" y1="0" x2="40" y2="40" stroke="#60a5fa" stroke-width="0.75" opacity="0.4"/>
      </pattern>
      <pattern id="dryCropland" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="#65a30d" opacity="0.6"/>
        <line x1="0" y1="15" x2="30" y2="15" stroke="#4d7c0f" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Base Alluvial Plain -->
    <rect width="1000" height="700" fill="#ca8a04" opacity="0.4"/>
    <rect width="1000" height="700" fill="url(#dryCropland)"/>

    <!-- Massive River Channel (Indus Basin) overflowing banks -->
    <path d="M 150,0 C 220,180 80,350 260,520 C 350,600 320,680 340,700 L 480,700 C 450,580 460,480 380,360 C 280,240 320,120 280,0 Z" fill="url(#floodWater)"/>

    <!-- Vast Inundation / Flood Overwash Swaths -->
    <!-- East Inundation Zone -->
    <path d="M 380,360 C 500,320 620,380 750,300 C 880,220 950,280 1000,260 L 1000,680 C 850,720 680,640 520,670 C 440,680 400,600 350,560 Z" fill="url(#floodWater)" opacity="0.85"/>
    <path d="M 400,380 C 520,340 640,400 770,320 C 890,250 940,300 980,280 L 980,660 C 840,700 660,620 500,650 Z" fill="url(#floodedFields)"/>

    <!-- West Pocket Flooding (Ponding behind embankments) -->
    <path d="M 0,380 C 60,360 140,400 180,470 C 220,530 160,620 140,680 L 0,700 Z" fill="url(#floodWater)" opacity="0.9"/>

    <!-- Breached Levee / Embankment failure point -->
    <g transform="translate(370, 360)">
      <circle cx="0" cy="0" r="18" fill="#ef4444" opacity="0.75"/>
      <circle cx="0" cy="0" r="8" fill="#ffffff"/>
      <path d="M -15,-15 L 15,15 M 15,-15 L -15,15" stroke="#ef4444" stroke-width="3"/>
    </g>

    <!-- Elevated Highway & Rail Embankment (Serving as emergency refuge spine) -->
    <path d="M 60,0 L 520,700" stroke="#f8fafc" stroke-width="5" fill="none"/>
    <path d="M 60,0 L 520,700" stroke="#0f172a" stroke-width="2" stroke-dasharray="6,4" fill="none"/>
    <!-- Clustered Displaced Tents / Emergency Shelters on high ground -->
    <g fill="#f43f5e">
      <circle cx="280" cy="335" r="3"/>
      <circle cx="288" cy="347" r="3"/>
      <circle cx="295" cy="358" r="3.5"/>
      <circle cx="304" cy="370" r="3"/>
      <circle cx="312" cy="382" r="3.5"/>
    </g>

    <!-- Isolated Villages (Marooned islands) -->
    <ellipse cx="620" cy="460" rx="35" ry="25" fill="#ca8a04"/>
    <rect x="605" y="448" width="10" height="8" fill="#f8fafc"/>
    <rect x="622" y="452" width="12" height="9" fill="#f8fafc"/>

    <ellipse cx="820" cy="510" rx="40" ry="30" fill="#ca8a04"/>
    <rect x="805" y="498" width="14" height="10" fill="#f8fafc"/>
    <rect x="825" y="505" width="12" height="8" fill="#f8fafc"/>

    <!-- Grid overlay -->
    <g stroke="rgba(59, 130, 246, 0.25)" stroke-width="0.75">
      <line x1="250" y1="0" x2="250" y2="700"/>
      <line x1="500" y1="0" x2="500" y2="700"/>
      <line x1="750" y1="0" x2="750" y2="700"/>
      <line x1="0" y1="350" x2="1000" y2="350"/>
    </g>

    <text x="20" y="685" fill="#60a5fa" font-family="monospace" font-size="12" opacity="0.85">LANDSAT-9 OLI-2 | 15m PAN-SHARP | INDUS BASIN CATASTROPHIC INUNDATION [27.3289°N, 68.3516°E]</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'port-logistics',
    name: 'Rotterdam Deepwater Port & Multi-Modal Terminal',
    category: 'urban',
    description: 'High-resolution pan-sharpened satellite capture of high-throughput container terminals, docking berths, and commercial cargo freighters.',
    imageUrl: createPortSvg(),
    sensor: 'WorldView-3 Optical Sensor',
    resolution: '0.31m GSD Pan-Sharpened',
    coordinates: '51°55\'12"N, 4°17\'38"E',
    date: '2026-04-12 UTC',
    cloudCover: '0.8%',
    spectralBands: ['Band 1 (Coastal)', 'Band 2 (Blue)', 'Band 3 (Green)', 'Band 5 (Red)', 'Band 7 (NIR-1)'],
    features: [
      {
        id: 'feat-101',
        label: 'Container Berth 4B',
        category: 'infrastructure',
        confidence: 98.4,
        color: '#06b6d4',
        bbox: { x: 48, y: 17, width: 31, height: 14 },
        areaKm2: 0.18,
        description: 'Automated container marshaling yard with high stacking density and active gantry tracks.'
      },
      {
        id: 'feat-102',
        label: 'Ultra-Large Container Vessel (ULCV)',
        category: 'vessel',
        confidence: 96.8,
        color: '#ef4444',
        bbox: { x: 79, y: 18, width: 17, height: 9 },
        areaKm2: 0.04,
        description: 'Moored 20,000+ TEU logistics freighter showing laden waterline displacement.'
      },
      {
        id: 'feat-103',
        label: 'Deepwater Navigation Channel',
        category: 'water',
        confidence: 99.1,
        color: '#3b82f6',
        bbox: { x: 62, y: 55, width: 36, height: 42 },
        areaKm2: 1.45,
        description: 'Main dredged shipping fairway exhibiting characteristic hydrodynamic vessel wakes.'
      },
      {
        id: 'feat-104',
        label: 'Intermodal Rail Concourse',
        category: 'infrastructure',
        confidence: 93.2,
        color: '#a855f7',
        bbox: { x: 2, y: 0, width: 6, height: 100 },
        areaKm2: 0.22,
        description: 'Dedicated double-track freight rail connecting container yards to European hinterland.'
      }
    ]
  },
  {
    id: 'forest-deforestation',
    name: 'Amazon Rainforest Deforestation & Incursion Frontier',
    category: 'environmental',
    description: 'Multispectral Sentinel-2 monitoring of fishbone feeder incursions, illegal canopy clearing, and agricultural conversion along the Rondônia frontier.',
    imageUrl: createForestSvg(),
    sensor: 'Sentinel-2B MSI (Multispectral Instrument)',
    resolution: '10m Spatial Resolution',
    coordinates: '9°44\'28"S, 63°03\'20"W',
    date: '2026-05-18 UTC',
    cloudCover: '2.4%',
    spectralBands: ['B2 (Blue)', 'B3 (Green)', 'B4 (Red)', 'B8 (VNIR)', 'B11 (SWIR-1)'],
    features: [
      {
        id: 'feat-201',
        label: 'Primary Rainforest Canopy (Dense)',
        category: 'vegetation',
        confidence: 99.4,
        color: '#10b981',
        bbox: { x: 34, y: 2, width: 63, height: 48 },
        areaKm2: 12.8,
        description: 'High biomass mature tropical canopy; NDVI index > 0.82 indicating vigorous photosynthetic health.'
      },
      {
        id: 'feat-202',
        label: 'Active Clear-cut Parcel (Burn Scar)',
        category: 'hazard',
        confidence: 95.8,
        color: '#f97316',
        bbox: { x: 62, y: 4, width: 36, height: 44 },
        areaKm2: 4.6,
        description: 'Freshly cleared biomass with high SWIR reflectance and thermal signature indicative of controlled slash-and-burn.'
      },
      {
        id: 'feat-203',
        label: 'Fishbone Logging Access Corridor',
        category: 'infrastructure',
        confidence: 94.2,
        color: '#eab308',
        bbox: { x: 11, y: 45, width: 25, height: 50 },
        areaKm2: 1.8,
        description: 'Secondary unpaved penetration road with perpendicular extraction parcels slicing into intact biome.'
      },
      {
        id: 'feat-204',
        label: 'Alluvial Meander & Silt Runoff',
        category: 'water',
        confidence: 97.3,
        color: '#06b6d4',
        bbox: { x: 0, y: 31, width: 100, height: 35 },
        areaKm2: 3.2,
        description: 'Turbid river system carrying suspended sediment loads from upstream soil destabilization.'
      }
    ]
  },
  {
    id: 'flood-inundation',
    name: 'Indus River Basin Monsoon Flood Inundation',
    category: 'disaster',
    description: 'Post-monsoon Landsat-9 emergency survey capturing widespread levee breaches, marooned agrarian settlements, and inundated croplands.',
    imageUrl: createFloodSvg(),
    sensor: 'Landsat-9 OLI-2 / TIRS-2',
    resolution: '15m Pan / 30m Multispectral',
    coordinates: '27°19\'44"N, 68°21\'06"E',
    date: '2026-08-22 UTC',
    cloudCover: '4.1%',
    spectralBands: ['Coastal/Aerosol', 'Visible RGB', 'Near-Infrared (NIR)', 'Shortwave IR (SWIR-2)'],
    features: [
      {
        id: 'feat-301',
        label: 'Catastrophic Levee Breach Point',
        category: 'hazard',
        confidence: 98.7,
        color: '#ef4444',
        bbox: { x: 34, y: 48, width: 8, height: 9 },
        areaKm2: 0.08,
        description: 'Structural failure along primary earthen flood-control berm causing continuous eastward discharge.'
      },
      {
        id: 'feat-302',
        label: 'Inundated Agricultural Cropland',
        category: 'hazard',
        confidence: 97.5,
        color: '#3b82f6',
        bbox: { x: 38, y: 38, width: 62, height: 58 },
        areaKm2: 18.4,
        description: 'Submerged paddy and cotton acreage with standing water depth estimated between 1.2m to 2.8m.'
      },
      {
        id: 'feat-303',
        label: 'Elevated Highway Refuge Spine',
        category: 'infrastructure',
        confidence: 92.6,
        color: '#f43f5e',
        bbox: { x: 5, y: 0, width: 50, height: 100 },
        areaKm2: 0.9,
        description: 'Intact raised national transit highway currently utilized as makeshift staging ground for displaced populations.'
      },
      {
        id: 'feat-304',
        label: 'Marooned Agrarian Settlement',
        category: 'urban',
        confidence: 94.1,
        color: '#eab308',
        bbox: { x: 59, y: 62, width: 9, height: 8 },
        areaKm2: 0.35,
        description: 'Isolated village island surrounded by standing floodwaters; ground vehicular access fully severed.'
      }
    ]
  }
];
