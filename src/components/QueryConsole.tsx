
import { Sparkles, HelpCircle, Terminal, Zap } from 'lucide-react';


interface QueryConsoleProps {
  query: string;
  onQueryChange: (query: string) => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
}

const SAMPLE_QUERIES = [
  'What is visible in this image?',
  'Are there any signs of change?',
  'Identify important features in this scene.',
  'Analyze this area for possible changes.',
  'What land-use patterns are visible?'
];

export const QueryConsole: React.FC<QueryConsoleProps> = ({
  query,
  onQueryChange,
  onRunAnalysis,
  isAnalyzing
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (query.trim() && !isAnalyzing) {
        onRunAnalysis();
      }
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Multimodal Remote-Sensing Query Box
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" />
          NATURAL LANGUAGE + SPATIAL PROMPT
        </span>
      </div>

      {/* Query Input Area */}
      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about this satellite scene (e.g. 'What is visible in this image?' or 'Identify key features and signs of change')..."
          rows={3}
          disabled={isAnalyzing}
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3.5 pr-28 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-sans resize-none disabled:opacity-60"
        />

        {/* ANALYZE Button */}
        <div className="absolute right-2.5 bottom-3.5">
          <button
            onClick={onRunAnalysis}
            disabled={!query.trim() || isAnalyzing}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer ${
              !query.trim() || isAnalyzing
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/25 active:scale-95'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>ANALYZING...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                <span>ANALYZE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="mt-3.5">
        <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-1.5">
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          <span>SUGGESTED REMOTE SENSING QUERIES:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUERIES.map((sampleQuery, idx) => (
            <button
              key={idx}
              onClick={() => onQueryChange(sampleQuery)}
              disabled={isAnalyzing}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-950/70 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all text-left flex items-center gap-1.5 disabled:opacity-50"
            >
              <span className="text-cyan-400/80 font-mono text-[10px]">#0{idx + 1}</span>
              <span>{sampleQuery}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
