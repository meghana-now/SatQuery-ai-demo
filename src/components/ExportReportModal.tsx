import { useState } from 'react';
import type { AnalysisResult } from '../types';
import { X, Copy, Check, Printer, Satellite } from 'lucide-react';


interface ExportReportModalProps {
  result: AnalysisResult | null;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ result, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!result) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <Satellite className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                SATQUERY AI • Competition Briefing Report
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Multimodal Remote-Sensing Intelligence Dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Copy as JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'JSON'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Print Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300 font-sans text-xs sm:text-sm">
          {/* Metadata Dossier */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">ASSET ID</span>
              <span className="text-slate-200 font-semibold">{result.imageId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">TIMESTAMP</span>
              <span className="text-slate-200 font-semibold">{result.timestamp}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">STATUS</span>
              <span className="text-emerald-400 font-semibold">{result.status}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">CONFIDENCE</span>
              <span className="text-cyan-400 font-semibold">{result.metrics.overallConfidence}%</span>
            </div>
          </div>

          {/* Query & Executive Summary */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
              1. Natural Language Query
            </h4>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono">
              "{result.query}"
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
              2. Executive Summary
            </h4>
            <p className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
              {result.executiveSummary}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
              3. Vision-Language Analysis & Deductions
            </h4>
            <p className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
              {result.aiAnswer}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
              4. Key Observations
            </h4>
            <ul className="space-y-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
              {result.keyObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
              5. Detected Features & Regions of Interest
            </h4>
            <div className="space-y-2">
              {result.detectedFeatures.map((feat) => (
                <div key={feat.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">{feat.label}</span>
                    <span className="text-[11px] text-slate-400">{feat.description}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                    {feat.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>ACADEMIC COMPETITION SUBMISSION REPORT</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
