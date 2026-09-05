
import { Satellite, MessageSquare, Eye, Cpu, Sparkles } from 'lucide-react';


export const MultimodalOverview: React.FC = () => {
  return (
    <section id="multimodal" className="py-12 border-b border-slate-800/80 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>MULTIMODAL SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            Multimodal Remote-Sensing Convergence
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            How SATQUERY AI seamlessly synthesizes earth observation data streams and linguistic reasoning into actionable geospatial intelligence.
          </p>
        </div>

        {/* 4 Pillars Grid with Convergence Center */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Pillar 1: Satellite Imagery */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Satellite className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase block">
                MODALITY 01
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-1">
                Satellite Imagery
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Optical RGB, NIR, and SWIR spectral band rasters ingested from Sentinel-2, Landsat-9, and sub-meter WorldView constellations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>GSD: 0.31m - 10m Multispectral</span>
            </div>
          </div>

          {/* Pillar 2: Natural Language Queries */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider uppercase block">
                MODALITY 02
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-1">
                Natural-Language Queries
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Free-form conversational inquiries tokenized and mapped to geospatial intent vectors (land cover, change, hazard mitigation, infrastructure).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Zero-Shot Prompt Disambiguation</span>
            </div>
          </div>

          {/* Pillar 3: Vision Analysis */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider uppercase block">
                CORE ENGINE 03
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-1">
                Vision Analysis
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Fine-tuned ViT-RS backbone paired with SAM-RS zero-shot segmentation to extract precise bounding boxes and pixel masks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Multi-Scale Object Proposal</span>
            </div>
          </div>

          {/* Pillar 4: AI Reasoning */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-semibold tracking-wider uppercase block">
                CORE ENGINE 04
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-1">
                AI Agentic Reasoning
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Multi-step Chain-of-Thought agent synthesizes spatial relationships, calculates surface statistics, and verifies analytical outputs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Chain-of-Thought Geospatial Logic</span>
            </div>
          </div>
        </div>

        {/* Multimodal Flow Summary Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-slate-300">
              <strong className="text-cyan-400">UNIFIED PIPELINE:</strong> Satellite Raster + User Prompt → ViT/SAM Feature Extraction → Agentic Reasoning → Verified Report
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            COMPETITION-READY FRAMEWORK
          </span>
        </div>
      </div>
    </section>
  );
};
