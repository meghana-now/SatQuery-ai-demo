
import { ArrowRight, Satellite, Sparkles, Cpu, Eye, BarChart3 } from 'lucide-react';


interface HeroLandingProps {
  onStartAnalysis: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ onStartAnalysis, onSelectSample }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/80 bg-radar-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-sm shadow-cyan-950">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC COMPETITION INNOVATION PROTOTYPE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400">REMOTE SENSING + VLM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            SATQUERY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-200 tracking-wide font-sans">
            Agentic Vision-Language Assistant for Remote-Sensing Analysis
          </p>

          {/* Short Explanation */}
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A next-generation multimodal remote sensing framework bridging satellite earth-observation imagery 
            with agentic reasoning. Ask freeform natural language questions to perform instant 
            land-cover classification, infrastructure detection, flood impact mapping, and environmental change reasoning.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Start Analysis Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#multimodal"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all hover:border-slate-600"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Explore Agentic Architecture</span>
            </a>
          </div>

          {/* Quick Preset Selector Chips */}
          <div className="mt-10 pt-6 border-t border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Explore Preset Remote-Sensing Scenarios:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => { onSelectSample('port-logistics'); onStartAnalysis(); }}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-200 transition-all text-left"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                <span className="font-semibold">Rotterdam Port:</span>
                <span className="text-slate-400">Maritime & Logistics</span>
              </button>

              <button
                onClick={() => { onSelectSample('forest-deforestation'); onStartAnalysis(); }}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-emerald-200 transition-all text-left"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
                <span className="font-semibold">Amazon Canopy:</span>
                <span className="text-slate-400">Deforestation Frontier</span>
              </button>

              <button
                onClick={() => { onSelectSample('flood-inundation'); onStartAnalysis(); }}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/40 text-xs text-slate-300 hover:text-blue-200 transition-all text-left"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:animate-ping" />
                <span className="font-semibold">Indus Basin:</span>
                <span className="text-slate-400">Flood Inundation & Hazards</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
              <Satellite className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono">Multimodal Fusion</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Fuses high-resolution optical and SWIR satellite telemetry with natural language semantic embeddings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono">SAM-RS Vision Engine</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Zero-shot segmentation identifying vessels, clear-cuts, levees, roads, and waterways at sub-meter accuracy.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono">Chain-of-Thought Agent</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              6-stage reasoning pipeline executing step-by-step geospatial deduction before generating the final report.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono">Instant Hazard Intelligence</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Produces verified quantitative land cover breakdowns, NDVI vegetation health, and disaster exposure metrics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
