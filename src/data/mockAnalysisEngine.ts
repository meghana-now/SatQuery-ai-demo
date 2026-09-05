import type { AnalysisResult, SampleImage, WorkflowStage } from '../types';


export const DEFAULT_PIPELINE_STAGES: WorkflowStage[] = [
  {
    id: 'stage-1',
    title: 'USER QUERY',
    subtitle: 'Multimodal Query Parsing',
    iconName: 'MessageSquare',
    status: 'idle',
    logMessage: 'Tokenizing natural-language prompt & registering image spatial reference coordinates.'
  },
  {
    id: 'stage-2',
    title: 'QUERY UNDERSTANDING',
    subtitle: 'Geospatial Intent Mapping',
    iconName: 'Cpu',
    status: 'idle',
    logMessage: 'Resolving analytical intent: Target focus classified as Land-Cover & Structural Inventory.'
  },
  {
    id: 'stage-3',
    title: 'IMAGE ANALYSIS',
    subtitle: 'Radiometric & Spectral Calibration',
    iconName: 'Eye',
    status: 'idle',
    logMessage: 'Executing ViT-RS backbone: atmospheric correction, false-color NDWI & NDVI band synthesis.'
  },
  {
    id: 'stage-4',
    title: 'FEATURE DETECTION',
    subtitle: 'Zero-Shot Segment Proposals',
    iconName: 'Crosshair',
    status: 'idle',
    logMessage: 'Segment Anything Remote-Sensing (SAM-RS) generated 4 distinct georeferenced bounding proposals.'
  },
  {
    id: 'stage-5',
    title: 'CHANGE/SCENE REASONING',
    subtitle: 'Spatial Context Synthesis',
    iconName: 'Share2',
    status: 'idle',
    logMessage: 'Chain-of-Thought agent evaluating temporal delta, density distribution, and terrain vulnerability.'
  },
  {
    id: 'stage-6',
    title: 'AI RESPONSE',
    subtitle: 'Multimodal Synthesis Verified',
    iconName: 'CheckCircle2',
    status: 'idle',
    logMessage: 'Synthesized multimodal analytical report with 96.4% confidence rating.'
  }
];

export function generateAnalysisResult(
  image: SampleImage,
  query: string,
  customImageUrl?: string
): AnalysisResult {
  const q = query.toLowerCase();
  const isChangeQuery = q.includes('change') || q.includes('delta') || q.includes('temporal') || q.includes('signs');
  const isLandUseQuery = q.includes('land') || q.includes('use') || q.includes('pattern') || q.includes('coverage') || q.includes('urban');
  const isHazardQuery = q.includes('hazard') || q.includes('flood') || q.includes('risk') || q.includes('damage') || q.includes('emergency');


  // Logic tailored to Image category and User query
  if (image.category === 'urban') {
    let aiAnswer = '';
    let execSummary = '';
    const observations: string[] = [];

    if (isChangeQuery) {
      aiAnswer = `Temporal analysis of the Rotterdam port facility reveals high maritime turnover. Compared to historical baseline data, berth occupancy is operating at 89% capacity with an observed +14% surge in laden container stack density in Terminal Yard 4B. Quay infrastructure shows no mechanical deformation or structural fatigue.`;
      execSummary = `High-throughput logistics activity detected with heightened container stacking density and continuous feeder vessel cycling. No infrastructure deterioration observed.`;
      observations.push('Container marshalling stacks exceed standard baseline volume by ~14% in eastern quadrant 4B.');
      observations.push('2 Ultra-Large Container Vessels (ULCV) actively berthed alongside with dual-spreader gantry operations.');
      observations.push('Rail freight departure corridor operating without choke points or anomalous intermodal delays.');
      observations.push('Channel hydrodynamics show normal wake dispersion with zero sediment accumulation along berth revetments.');
    } else if (isLandUseQuery) {
      aiAnswer = `The captured scene represents a specialized heavy intermodal logistics zone. The surface breakdown indicates 52% deepwater navigable channel, 31% paved reinforced concrete aprons & container terminals, 12% rail and expressway transport links, and 5% ancillary support structures.`;
      execSummary = `Strictly commercial/industrial maritime port layout with optimized intermodal rail-water transfer interfaces.`;
      observations.push('Zero residential or natural canopy presence within the designated high-security perimeter.');
      observations.push('High-albedo reflective rooftop structures indicating automated cold-chain warehousing.');
      observations.push('Clear segregation between bulk liquid handling and containerized intermodal transfer sectors.');
    } else {
      aiAnswer = `SATQUERY AI detected a high-density coastal deepwater port facility. Key identified elements include 3 automated gantry crane quays, 2 moored container freighters (estimated length 360m-400m), intensive multi-colored container stacks, and an electrified intermodal freight railway leading inland.`;
      execSummary = `Active Tier-1 intermodal marine terminal featuring heavy transport vessels, container storage yards, and rail connectivity.`;
      observations.push('Primary container terminal yards exhibit strict orthogonal grid stacking for automated AGV retrieval.');
      observations.push('Moored cargo vessel draught reflects near-maximum payload weight (approx 16.5m water immersion).');
      observations.push('Deep-water fairway exhibits maintained 20m dredging depth with clear navigational buoys.');
      observations.push('Rail staging yards show double-stacked spine cars staged for departure.');
    }

    return {
      id: `res-${Date.now()}`,
      query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      imageId: image.id,
      imageName: image.name,
      imageThumb: customImageUrl || image.imageUrl,
      aiAnswer,
      executiveSummary: execSummary,
      keyObservations: observations,
      detectedFeatures: image.features,
      metrics: {
        overallConfidence: 97.2,
        spectralClarity: 'Optimal (Pan-Sharpened 0.31m)',
        cloudCoverPct: 0.8,
        surfaceBreakdown: [
          { label: 'Navigable Waterway', percentage: 52, color: '#0284c7' },
          { label: 'Container Terminals', percentage: 31, color: '#f59e0b' },
          { label: 'Rail / Highway', percentage: 12, color: '#8b5cf6' },
          { label: 'Port Facilities', percentage: 5, color: '#64748b' }
        ],
        anomalyIndex: 0.12
      },
      agentTrace: [
        { stage: 'Query Parser', details: 'Extracted keywords: [infrastructure, maritime, vessels, land-use]', durationMs: 180 },
        { stage: 'Spectral Analyzer', details: 'Processed WorldView-3 Pan-Sharpened 8-band bundle. Contrast stretch 2.4%', durationMs: 340 },
        { stage: 'Object Segmentation', details: 'SAM-RS identified 4 high-confidence spatial instances (IoU > 0.88)', durationMs: 510 },
        { stage: 'Reasoning Synthesis', details: 'Cross-referenced AIS maritime records with visual footprint', durationMs: 290 }
      ],
      changeDetected: isChangeQuery,
      status: 'VERIFIED'
    };
  }

  if (image.category === 'environmental') {
    let aiAnswer = '';
    let execSummary = '';
    const observations: string[] = [];

    if (isChangeQuery) {
      aiAnswer = `CRITICAL ALERT: Detected active deforestation and recent canopy severance. A fresh 4.6 km² agricultural clearing exhibits elevated SWIR signatures characteristic of slash-and-burn burn scars. Fishbone road incursions have advanced approximately 1.2 km further into primary rainforest compared to the seasonal baseline.`;
      execSummary = `Severe anthropogenic canopy disturbance identified: rapid expansion of fishbone access spurs and active 4.6 km² clearing with burn signatures.`;
      observations.push('High-intensity burn scar confirmed via Sentinel-2 SWIR-1/SWIR-2 band ratio (NBR anomaly -0.42).');
      observations.push('Fishbone feeder logging corridors actively dissecting previously contiguous mature canopy.');
      observations.push('Sediment discharge plumes observed downstream in the alluvial river system, indicating riparian erosion.');
      observations.push('Regrowth scrubland represents only 8% of cleared acreage, indicating permanent pastoral conversion.');
    } else if (isLandUseQuery) {
      aiAnswer = `Land-use analysis reveals a fragmented frontier ecosystem. Pristine primary tropical rainforest constitutes 63% of the scene, active cattle pasture/industrial soybean plots cover 24%, unpaved logging spines account for 7%, and riparian waterways comprise 6%.`;
      execSummary = `Fragmented tropical rainforest biome undergoing systematic agricultural conversion and canopy fragmentation.`;
      observations.push('Classic "fishbone" land tenure pattern originating from national colonization arterial highway.');
      observations.push('Dense unbroken forest canopy displays high NDVI (>0.82) while cleared zones average NDVI < 0.28.');
      observations.push('Erosion gullies visible along newly exposed lateral borders with zero vegetative buffers.');
    } else {
      aiAnswer = `SATQUERY AI identified a tropical forest frontier under active anthropogenic pressure in Rondônia, Brazil. The scene highlights dense unbroken evergreen canopy bordered by an aggressive fishbone network of logging roads, open pastoral plots, and an alluvial river exhibiting high silt turbidity.`;
      execSummary = `Multispectral scan demonstrates stark interface between virgin rainforest biomass and industrial cattle pasture clearings.`;
      observations.push('Intact forest canopy covers approximately 12.8 km² in the northern and western quadrants.');
      observations.push('Large-scale rectangular clearing in upper-right sector demonstrates industrial cattle ranching geometry.');
      observations.push('River oxbows and meanders carry high suspended particulate matter due to topsoil runoff.');
      observations.push('Atmospheric cirrus attenuation is minimal (<2.4%) allowing high radiometric precision.');
    }

    return {
      id: `res-${Date.now()}`,
      query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      imageId: image.id,
      imageName: image.name,
      imageThumb: customImageUrl || image.imageUrl,
      aiAnswer,
      executiveSummary: execSummary,
      keyObservations: observations,
      detectedFeatures: image.features,
      metrics: {
        overallConfidence: 96.5,
        spectralClarity: 'Multispectral (10m SWIR-Enhanced)',
        cloudCoverPct: 2.4,
        surfaceBreakdown: [
          { label: 'Primary Forest Canopy', percentage: 63, color: '#10b981' },
          { label: 'Cleared Pastoral Land', percentage: 24, color: '#d97706' },
          { label: 'Logging / Feeder Roads', percentage: 7, color: '#eab308' },
          { label: 'Alluvial River Channel', percentage: 6, color: '#06b6d4' }
        ],
        anomalyIndex: 0.78,
        vegetationHealthNDVI: 0.74
      },
      agentTrace: [
        { stage: 'Query Parser', details: 'Parsed ecological & deforestation inquiry; prioritized NIR/SWIR bands', durationMs: 210 },
        { stage: 'Spectral Analyzer', details: 'Calculated NDVI, NBR (Normalized Burn Ratio) and NDWI indices', durationMs: 410 },
        { stage: 'Object Segmentation', details: 'Segmented forest boundaries and road spurs with SAM-RS', durationMs: 480 },
        { stage: 'Reasoning Synthesis', details: 'Assessed canopy fragmentation metrics and biomass loss index', durationMs: 310 }
      ],
      changeDetected: true,
      status: 'MONITORING_ALERT'
    };
  }

  if (image.category === 'disaster') {
    let aiAnswer = '';
    let execSummary = '';
    const observations: string[] = [];

    if (isHazardQuery || isChangeQuery) {
      aiAnswer = `EMERGENCY DISASTER REPORT: Satellite analysis identifies an active major flood inundation event. A catastrophic 80-meter breach along the primary western river embankment has diverted floodwaters eastward, inundating approximately 18.4 km² of agricultural cropland and marooning at least two rural settlements.`;
      execSummary = `Severe breach of river levee has led to extensive 18.4 km² agricultural flooding and humanitarian cut-offs for multiple settlements.`;
      observations.push('Critical levee breach confirmed at coordinates 27°19\'44"N 68°21\'06"E with continuous torrent flow.');
      observations.push('18.4 km² of standing floodwaters impacting cotton and cereal crops, depth estimated 1.2m to 2.8m.');
      observations.push('Raised national highway corridor remains above waterline and serves as key staging area.');
      observations.push('Marooned village cluster at eastern perimeter isolated with all surface access roads underwater.');
    } else if (isLandUseQuery) {
      aiAnswer = `The disaster has drastically transformed the local land-use configuration: 64% of the agricultural plain is submerged under standing floodwaters, 21% remains as un-inundated agricultural terrace, 11% constitutes the primary river channel, and 4% comprises elevated transit embankments and marooned built-up zones.`;
      execSummary = `Catastrophic displacement of agricultural and settlement land cover by extensive flood ponding.`;
      observations.push('Agricultural productivity entirely interrupted across inundated parcels.');
      observations.push('Silt deposits will likely degrade immediate planting cycles but may enrich soil post-recession.');
      observations.push('Elevated transportation corridor represents the sole operational logistics route.');
    } else {
      aiAnswer = `SATQUERY AI detected extensive monsoonal inundation across the Indus Basin plain. The scene is dominated by a swollen river channel, an active embankment breach discharging into low-lying agrarian fields, multiple marooned residential hamlets, and an elevated transportation highway corridor.`;
      execSummary = `Multimodal flood impact assessment: levee failure leading to massive agricultural inundation and settlement isolation.`;
      observations.push('Direct flow vector detected from river breach heading southeast into populated farmland.');
      observations.push('Temporary emergency shelters visible as linear cluster along highway shoulders.');
      observations.push('Spectral NDWI index > 0.65 across flooded zones indicating high water depth.');
      observations.push('Cloud cover post-storm has decreased to 4.1%, providing clear optical assessment.');
    }

    return {
      id: `res-${Date.now()}`,
      query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      imageId: image.id,
      imageName: image.name,
      imageThumb: customImageUrl || image.imageUrl,
      aiAnswer,
      executiveSummary: execSummary,
      keyObservations: observations,
      detectedFeatures: image.features,
      metrics: {
        overallConfidence: 98.1,
        spectralClarity: 'Pan-Sharpened Multispectral 15m',
        cloudCoverPct: 4.1,
        surfaceBreakdown: [
          { label: 'Inundated Agricultural Land', percentage: 64, color: '#1d4ed8' },
          { label: 'Dry Agrarian Plain', percentage: 21, color: '#ca8a04' },
          { label: 'Main River Channel', percentage: 11, color: '#0284c7' },
          { label: 'Elevated Corridor & Built-up', percentage: 4, color: '#f43f5e' }
        ],
        anomalyIndex: 0.94
      },
      agentTrace: [
        { stage: 'Query Parser', details: 'Identified disaster mitigation and flood extent query vectors', durationMs: 190 },
        { stage: 'Spectral Analyzer', details: 'Applied Modified NDWI (MNDWI) to segment water vs soil boundary', durationMs: 380 },
        { stage: 'Object Segmentation', details: 'Extracted breach geometry and inundated cropland boundary masks', durationMs: 520 },
        { stage: 'Reasoning Synthesis', details: 'Calculated exposed population and infrastructure cutoff risks', durationMs: 340 }
      ],
      changeDetected: true,
      status: 'MONITORING_ALERT'
    };
  }

  // Fallback / Custom uploaded image
  return {
    id: `res-${Date.now()}`,
    query,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    imageId: image.id,
    imageName: image.name || 'User Custom Satellite Asset',
    imageThumb: customImageUrl || image.imageUrl,
    aiAnswer: `SATQUERY AI completed multimodal analysis of the custom remote-sensing asset in response to: "${query}". Vision-language backbone detected heterogeneous land cover patterns including built-up structures, vegetative canopies, and transport corridors with 94.5% classification confidence.`,
    executiveSummary: `User-provided remote sensing scene successfully indexed, segmented, and evaluated across multispectral dimensions.`,
    keyObservations: [
      'Multi-spectral contrast normalized; spatial resolution suitable for 1:10,000 scale cartographic analysis.',
      'Distinct spectral signatures detected separating built structures from permeable vegetative surfaces.',
      'No critical sensor artifacts or cloud obstruction identified in the region of interest.',
      'Surface texture variations indicate mixed anthropogenic and natural land-use patterns.'
    ],
    detectedFeatures: [
      {
        id: 'feat-custom-1',
        label: 'Primary Anthropogenic Cluster',
        category: 'urban',
        confidence: 94.6,
        color: '#3b82f6',
        bbox: { x: 25, y: 25, width: 45, height: 40 },
        areaKm2: 3.2,
        description: 'Concentrated urban/industrial infrastructure footprint with high edge density.'
      },
      {
        id: 'feat-custom-2',
        label: 'Vegetative Canopy Perimeter',
        category: 'vegetation',
        confidence: 91.2,
        color: '#10b981',
        bbox: { x: 5, y: 5, width: 30, height: 40 },
        areaKm2: 2.1,
        description: 'Permeable green cover exhibiting healthy chlorophyll absorption.'
      },
      {
        id: 'feat-custom-3',
        label: 'Linear Transportation Corridor',
        category: 'infrastructure',
        confidence: 93.8,
        color: '#f59e0b',
        bbox: { x: 0, y: 65, width: 100, height: 18 },
        areaKm2: 0.8,
        description: 'Continuous transit corridor traversing the lower sector of the scene.'
      }
    ],
    metrics: {
      overallConfidence: 94.5,
      spectralClarity: 'Standard High-Resolution RGB/NIR',
      cloudCoverPct: 1.2,
      surfaceBreakdown: [
        { label: 'Built Environment', percentage: 48, color: '#3b82f6' },
        { label: 'Vegetation Canopy', percentage: 34, color: '#10b981' },
        { label: 'Transportation & Paved', percentage: 14, color: '#f59e0b' },
        { label: 'Other Surfaces', percentage: 4, color: '#64748b' }
      ],
      anomalyIndex: 0.25
    },
    agentTrace: [
      { stage: 'Query Parser', details: 'Tokenized custom query with geospatial intent weights', durationMs: 220 },
      { stage: 'Spectral Analyzer', details: 'Extracted RGB histogram and high-frequency edge gradients', durationMs: 360 },
      { stage: 'Object Segmentation', details: 'Generated zero-shot bounding boxes and class probabilities', durationMs: 490 },
      { stage: 'Reasoning Synthesis', details: 'Synthesized multimodal observations and summary', durationMs: 280 }
    ],
    changeDetected: isChangeQuery,
    status: 'VERIFIED'
  };
}
