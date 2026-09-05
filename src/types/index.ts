export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

export interface DetectedFeature {
  id: string;
  label: string;
  category: 'infrastructure' | 'water' | 'vegetation' | 'hazard' | 'urban' | 'vessel';
  confidence: number;
  color: string;
  bbox: BoundingBox;
  areaKm2?: number;
  description: string;
}

export interface SampleImage {
  id: string;
  name: string;
  category: 'urban' | 'environmental' | 'disaster' | 'custom';
  description: string;
  imageUrl: string;
  sensor: string;
  resolution: string;
  coordinates: string;
  date: string;
  cloudCover: string;
  spectralBands: string[];
  features: DetectedFeature[];
}

export interface WorkflowStage {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  status: 'idle' | 'processing' | 'completed';
  latencyMs?: number;
  logMessage?: string;
}

export interface SurfaceBreakdown {
  label: string;
  percentage: number;
  color: string;
}

export interface AnalysisMetrics {
  overallConfidence: number;
  spectralClarity: string;
  cloudCoverPct: number;
  surfaceBreakdown: SurfaceBreakdown[];
  anomalyIndex: number;
  vegetationHealthNDVI?: number;
}

export interface AnalysisResult {
  id: string;
  query: string;
  timestamp: string;
  imageId: string;
  imageName: string;
  imageThumb: string;
  aiAnswer: string;
  executiveSummary: string;
  keyObservations: string[];
  detectedFeatures: DetectedFeature[];
  metrics: AnalysisMetrics;
  agentTrace: {
    stage: string;
    details: string;
    durationMs: number;
  }[];
  changeDetected: boolean;
  status: 'VERIFIED' | 'MONITORING_ALERT' | 'NOMINAL';
}

export type VisionOverlayMode = 'standard' | 'boxes' | 'ndvi' | 'edge';
