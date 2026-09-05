import { useState, useRef } from 'react';
import type { DetectedFeature, VisionOverlayMode } from '../types';
import { ZoomIn, ZoomOut, Maximize2, Crosshair, Radio, Compass } from 'lucide-react';


interface InteractiveImageCanvasProps {
  imageUrl: string;
  imageName: string;
  features: DetectedFeature[];
  selectedFeatureId: string | null;
  onSelectFeature: (featureId: string | null) => void;
  isAnalyzing: boolean;
  baseCoordinates: string;
}

export const InteractiveImageCanvas: React.FC<InteractiveImageCanvasProps> = ({
  imageUrl,
  imageName,
  features,
  selectedFeatureId,
  onSelectFeature,
  isAnalyzing,
  baseCoordinates
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [overlayMode, setOverlayMode] = useState<VisionOverlayMode>('boxes');
  const [cursorPos, setCursorPos] = useState<{ xPct: number; yPct: number; pxX: number; pxY: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const xPct = Number(((x / rect.width) * 100).toFixed(1));
    const yPct = Number(((y / rect.height) * 100).toFixed(1));
    setCursorPos({ xPct, yPct, pxX: Math.round(x * 2.5), pxY: Math.round(y * 2.5) });
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  // Compute CSS filter based on overlayMode
  const getImageFilter = () => {
    switch (overlayMode) {
      case 'ndvi':
        // Simulated false-color infrared NDVI (shifts greens to vivid emerald and water to deep blue/cyan)
        return 'contrast(135%) saturate(180%) hue-rotate(25deg)';
      case 'edge':
        return 'contrast(200%) grayscale(80%) drop-shadow(0 0 1px #00f2fe)';
      case 'standard':
      case 'boxes':
      default:
        return 'none';
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 flex flex-col bg-slate-950' : 'w-full'
    }`}>
      {/* Top Header / Mode Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-slate-200 font-semibold tracking-wide truncate max-w-[240px] sm:max-w-xs">
            {imageName}
          </span>
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300">
            {features.length} FEATURES DETECTED
          </span>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => { setOverlayMode('standard'); setShowBoxes(false); }}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                overlayMode === 'standard' && !showBoxes
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Natural Optical Spectrum (RGB)"
            >
              Natural RGB
            </button>
            <button
              onClick={() => { setOverlayMode('boxes'); setShowBoxes(true); }}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 ${
                showBoxes
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Zero-Shot Bounding Boxes"
            >
              <Crosshair className="w-3 h-3" />
              AI BBoxes
            </button>
            <button
              onClick={() => { setOverlayMode('ndvi'); setShowBoxes(true); }}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                overlayMode === 'ndvi'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Simulated False-Color NDVI / Infrared"
            >
              False-Color NIR
            </button>
          </div>

          {/* Zoom and Fullscreen Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={handleZoomIn}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 hover:text-white"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Viewport Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden bg-slate-950 flex items-center justify-center cursor-crosshair select-none ${
          isFullscreen ? 'flex-1 h-full' : 'h-[360px] sm:h-[450px] lg:h-[500px]'
        }`}
      >
        {/* Background Radar Grid Pattern */}
        <div className="absolute inset-0 bg-radar-grid opacity-30 pointer-events-none" />

        {/* The Satellite Image Layer */}
        <div
          className="relative transition-transform duration-200 ease-out will-change-transform max-w-full max-h-full"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={imageUrl}
            alt={imageName}
            className="w-full h-auto object-contain max-h-[480px] rounded-lg shadow-inner pointer-events-none"
            style={{
              filter: getImageFilter()
            }}
          />

          {/* Active Radar Scanner Line when analyzing */}
          {isAnalyzing && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
              <div className="w-full h-8 bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 shadow-[0_0_20px_#00f2fe] animate-scanline" />
              <div className="absolute inset-0 bg-cyan-500/10 animate-pulse-glow" />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-slate-950/90 border border-cyan-400/60 text-cyan-300 font-mono text-[11px] flex items-center gap-2 shadow-lg">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>SAM-RS MULTIMODAL SCANNING...</span>
              </div>
            </div>
          )}

          {/* Bounding Box Overlays */}
          {showBoxes && !isAnalyzing && features.map((feat) => {
            const isSelected = selectedFeatureId === feat.id;
            return (
              <div
                key={feat.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFeature(isSelected ? null : feat.id);
                }}
                className={`absolute transition-all cursor-pointer group ${
                  isSelected
                    ? 'ring-2 ring-white shadow-[0_0_15px_rgba(255,255,255,0.7)] z-20'
                    : 'hover:ring-1 hover:ring-white/80 z-10'
                }`}
                style={{
                  left: `${feat.bbox.x}%`,
                  top: `${feat.bbox.y}%`,
                  width: `${feat.bbox.width}%`,
                  height: `${feat.bbox.height}%`,
                  border: `2px solid ${feat.color}`,
                  backgroundColor: isSelected ? `${feat.color}35` : `${feat.color}15`
                }}
              >
                {/* Corner Crosshair Reticles */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: feat.color }} />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: feat.color }} />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: feat.color }} />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: feat.color }} />

                {/* Tag Badge */}
                <div
                  className="absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-md flex items-center gap-1 transition-opacity pointer-events-none"
                  style={{
                    backgroundColor: '#090e1a',
                    border: `1px solid ${feat.color}`,
                    color: '#ffffff'
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feat.color }} />
                  <span className="font-semibold">{feat.label}</span>
                  <span className="opacity-80">({feat.confidence}%)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Coordinate HUD (Crosshair info at bottom-left) */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-3 shadow-lg pointer-events-none">
          <div className="flex items-center gap-1 text-cyan-400">
            <Compass className="w-3.5 h-3.5" />
            <span className="text-slate-400">DATUM:</span>
            <span className="text-slate-200">{baseCoordinates}</span>
          </div>
          {cursorPos && (
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3 text-slate-400">
              <span>LOC:</span>
              <span className="text-cyan-300">{cursorPos.xPct}% X, {cursorPos.yPct}% Y</span>
              <span className="text-slate-500">[{cursorPos.pxX}, {cursorPos.pxY} px]</span>
            </div>
          )}
        </div>

        {/* Spectral Band Mode Indicator (bottom right) */}
        <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none">
          {overlayMode === 'ndvi' && <span className="text-emerald-400">SPECTRAL NDVI INFRARED</span>}
          {overlayMode === 'edge' && <span className="text-cyan-400">CANNY EDGE GRADIENT</span>}
          {overlayMode === 'boxes' && <span className="text-sky-400">ZERO-SHOT REGION PROPOSALS (ON)</span>}
          {overlayMode === 'standard' && <span className="text-slate-300">STANDARD OPTICAL RGB</span>}
        </div>
      </div>
    </div>
  );
};
