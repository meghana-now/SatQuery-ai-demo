import { Satellite, Radio, Sparkles, Layers, Activity, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  onNavigateTo: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar = ({ onReset, onNavigateTo, activeSection }: NavbarProps) => {

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-sky-950/60 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateTo('hero')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20 border border-cyan-400/40">
              <Satellite className="w-5 h-5 text-white animate-pulse-glow" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wider text-white font-mono flex items-center">
                  SAT<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">QUERY</span>
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    AI
                  </span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  v1.0-DEMO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide hidden sm:block">
                Multimodal Remote-Sensing Vision-Language Assistant
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onNavigateTo('hero')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeSection === 'hero'
                  ? 'bg-sky-500/20 text-cyan-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigateTo('workspace')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSection === 'workspace'
                  ? 'bg-sky-500/20 text-cyan-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Analysis Studio
            </button>
            <button
              onClick={() => onNavigateTo('multimodal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSection === 'multimodal'
                  ? 'bg-sky-500/20 text-cyan-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Architecture
            </button>
            <button
              onClick={() => onNavigateTo('history')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSection === 'history'
                  ? 'bg-sky-500/20 text-cyan-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              History
            </button>
          </nav>

          {/* Right Status & Action */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>ORBITAL SYNC:</span>
              <span className="text-emerald-400 font-semibold">ACTIVE</span>
            </div>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all hover:border-slate-600"
              title="Reset Analysis Session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => onNavigateTo('workspace')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-medium shadow-md shadow-cyan-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Live Demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
