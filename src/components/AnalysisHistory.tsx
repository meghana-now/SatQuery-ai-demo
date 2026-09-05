
import type { AnalysisResult } from '../types';
import { History, Trash2, ArrowRight, Clock } from 'lucide-react';


interface AnalysisHistoryProps {
  history: AnalysisResult[];
  onSelectHistoryItem: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  activeResultId?: string;
}

export const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
  activeResultId
}) => {
  return (
    <section id="history" className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Analysis Session History ({history.length})
          </h3>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear all session history"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 px-4 text-slate-500 font-mono text-xs">
          <Clock className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
          <p>No queries executed yet.</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Run an analysis from the query box above to record turns in session history.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {history.map((item) => {
            const isActive = activeResultId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectHistoryItem(item)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                  isActive
                    ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      {item.metrics.overallConfidence}% CONF
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img src={item.imageThumb} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-200 line-clamp-2 leading-tight">
                        "{item.query}"
                      </p>
                      <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                        Scene: {item.imageName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400 font-mono font-medium group-hover:text-cyan-300">
                  <span>Restore Session</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
