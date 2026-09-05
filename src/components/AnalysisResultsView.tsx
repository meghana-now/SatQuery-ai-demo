
import type { AnalysisResult } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Crosshair, 
  Download, 
  BarChart2 
} from 'lucide-react';


interface AnalysisResultsViewProps {
  result: AnalysisResult;
  selectedFeatureId: string | null;
  onSelectFeature: (featureId: string | null) => void;
  onOpenExportModal: () => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  result,
  selectedFeatureId,
  onSelectFeature,
  onOpenExportModal
}) => {
  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl relative space-y-6">
      {/* Top Status & Confidence Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white font-mono">
                Multimodal AI Analysis Report
              </h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                result.status === 'MONITORING_ALERT'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {result.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Query: "{result.query}" • Generated {result.timestamp}
            </p>
          </div>
        </div>

        {/* Confidence & Export Button */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-mono">
            <span className="text-[10px] text-slate-400 block">CONFIDENCE SCORE</span>
            <span className="text-sm font-bold text-cyan-400">
              {result.metrics.overallConfidence}%
            </span>
          </div>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            title="Export Report for Competition PPT"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary AI Answer Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-inner relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VLM Chain-of-Thought Synthesis:</span>
        </div>

        <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-normal">
          {result.aiAnswer}
        </p>

        {/* Executive Summary Callout */}
        <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border-l-4 border-cyan-400 text-xs text-slate-300">
          <span className="font-mono text-cyan-300 font-semibold block mb-1">EXECUTIVE SUMMARY:</span>
          {result.executiveSummary}
        </div>
      </div>

      {/* Two Column Grid: Key Observations + Surface Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Key Observations */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Geospatial Observations</span>
          </h3>

          <ul className="space-y-2.5">
            {result.keyObservations.map((obs, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Surface Breakdown & Metrics */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-sky-400" />
            <span>Quantitative Surface Composition</span>
          </h3>

          <div className="space-y-3">
            {result.metrics.surfaceBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-200">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Spectral Clarity:</span>
            <span className="text-slate-200">{result.metrics.spectralClarity}</span>
          </div>
        </div>
      </div>

      {/* Detected Features Section (Interactive Bounding Box Links) */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-cyan-400" />
            <span>Detected Features & Segmented Regions ({result.detectedFeatures.length})</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            Click any feature card to highlight it on the satellite canvas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {result.detectedFeatures.map((feat) => {
            const isSelected = selectedFeatureId === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => onSelectFeature(isSelected ? null : feat.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: feat.color }} />
                    <span className="text-xs font-bold text-white truncate max-w-[130px]">
                      {feat.label}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${feat.color}25`, color: feat.color }}
                  >
                    {feat.confidence}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {feat.description}
                </p>

                {feat.areaKm2 && (
                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                    <span>EST. COVERAGE:</span>
                    <span className="text-cyan-300 font-semibold">{feat.areaKm2} km²</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
