
import type { WorkflowStage } from '../types';
import { 
  MessageSquare, 
  Cpu, 
  Eye, 
  Crosshair, 
  Share2, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Radio, 
  Terminal 
} from 'lucide-react';


interface AgentPipelineTrackerProps {
  stages: WorkflowStage[];
  currentStageIndex: number;
  isAnalyzing: boolean;
  overallElapsedMs: number;
}

export const AgentPipelineTracker: React.FC<AgentPipelineTrackerProps> = ({
  stages,
  currentStageIndex,
  isAnalyzing,
  overallElapsedMs
}) => {
  const getIcon = (name: string, status: string) => {
    const className = "w-4 h-4";
    if (status === 'processing') {
      return <Loader2 className={`${className} animate-spin text-cyan-400`} />;
    }
    if (status === 'completed') {
      return <CheckCircle2 className={`${className} text-emerald-400`} />;
    }

    switch (name) {
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Crosshair': return <Crosshair className={className} />;
      case 'Share2': return <Share2 className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background cyber accent */}
      <div className="absolute top-0 left-1/4 w-96 h-24 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header with Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Agentic Reasoning Pipeline Execution
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          {isAnalyzing ? (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <Radio className="w-3 h-3 text-cyan-400 animate-ping" />
              <span>STAGE {currentStageIndex + 1}/6 ACTIVE</span>
              <span className="text-slate-400">({(overallElapsedMs / 1000).toFixed(1)}s)</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>PIPELINE READY</span>
            </div>
          )}
        </div>
      </div>

      {/* Pipeline Stages Display (Horizontal on Desktop, Vertical on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 relative">
        {stages.map((stage, idx) => {
          const isCurrent = isAnalyzing && currentStageIndex === idx;
          const isDone = stage.status === 'completed';


          return (
            <div
              key={stage.id}
              className={`relative flex flex-col p-3 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_15px_rgba(0,242,254,0.15)] ring-1 ring-cyan-400/50'
                  : isDone
                  ? 'bg-slate-950/80 border-emerald-500/40'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60'
              }`}
            >
              {/* Top Node Indicator & Stage Number */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-500 font-semibold">
                  STEP 0{idx + 1}
                </span>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {getIcon(stage.iconName, stage.status)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h4 className={`text-xs font-mono font-bold tracking-tight uppercase ${
                isCurrent ? 'text-cyan-300' : isDone ? 'text-slate-200' : 'text-slate-400'
              }`}>
                {stage.title}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                {stage.subtitle}
              </p>

              {/* Status Badge */}
              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className={
                  isCurrent ? 'text-cyan-400 animate-pulse' : isDone ? 'text-emerald-400' : 'text-slate-500'
                }>
                  {isCurrent ? 'Processing...' : isDone ? 'Complete' : 'Queued'}
                </span>
                {stage.latencyMs && (
                  <span className="text-slate-500">{stage.latencyMs}ms</span>
                )}
              </div>

              {/* Connector Arrow (Desktop) */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Agent Terminal Log Output */}
      <div className="mt-4 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono flex items-start gap-2 text-slate-300">
        <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <span className="text-slate-500 mr-2">AGENT_LOG:</span>
          <span className={isAnalyzing ? 'text-cyan-300 animate-pulse' : 'text-slate-300'}>
            {stages[currentStageIndex]?.logMessage || 'System idle. Submit query to initialize vision-language reasoning agent.'}
          </span>
        </div>
      </div>
    </div>
  );
};
