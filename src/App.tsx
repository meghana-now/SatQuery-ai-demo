import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { ImageWorkspace } from './components/ImageWorkspace';
import { QueryConsole } from './components/QueryConsole';
import { AgentPipelineTracker } from './components/AgentPipelineTracker';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { MultimodalOverview } from './components/MultimodalOverview';
import { AnalysisHistory } from './components/AnalysisHistory';
import { ExportReportModal } from './components/ExportReportModal';
import { SAMPLE_IMAGES } from './data/sampleImages';
import { DEFAULT_PIPELINE_STAGES, generateAnalysisResult } from './data/mockAnalysisEngine';
import type { SampleImage, AnalysisResult, WorkflowStage } from './types';
import { Satellite } from 'lucide-react';


export function App() {
  const [currentImage, setCurrentImage] = useState<SampleImage>(SAMPLE_IMAGES[0]);
  const [query, setQuery] = useState<string>('What is visible in this image?');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [stages, setStages] = useState<WorkflowStage[]>(DEFAULT_PIPELINE_STAGES);
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [overallElapsedMs, setOverallElapsedMs] = useState<number>(0);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize with a pre-computed demo result so the screen looks instantly alive and convincing
  useEffect(() => {
    const initialResult = generateAnalysisResult(SAMPLE_IMAGES[0], 'What is visible in this image?');
    setActiveResult(initialResult);
    setHistory([initialResult]);
    setStages(prev => prev.map(s => ({ ...s, status: 'completed' as const })));
  }, []);

  const handleSelectSample = (sampleId: string) => {
    const found = SAMPLE_IMAGES.find(s => s.id === sampleId);
    if (found) {
      setCurrentImage(found);
      setSelectedFeatureId(null);
    }
  };

  const handleCustomImageUploaded = (customImg: SampleImage) => {
    setCurrentImage(customImg);
    setSelectedFeatureId(null);
  };

  const handleNavigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'workspace') {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCurrentImage(SAMPLE_IMAGES[0]);
    setQuery('What is visible in this image?');
    setSelectedFeatureId(null);
    const initial = generateAnalysisResult(SAMPLE_IMAGES[0], 'What is visible in this image?');
    setActiveResult(initial);
    setStages(DEFAULT_PIPELINE_STAGES.map(s => ({ ...s, status: 'completed' as const })));
  };

  // Agentic pipeline execution simulation
  const handleRunAnalysis = () => {
    if (!query.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setCurrentStageIndex(0);
    setSelectedFeatureId(null);

    // Reset stages
    const freshStages: WorkflowStage[] = DEFAULT_PIPELINE_STAGES.map(s => ({
      ...s,
      status: 'idle',
      latencyMs: undefined
    }));
    setStages(freshStages);

    const stageDelays = [380, 450, 700, 600, 520, 400]; // total ~3 seconds
    let cumulativeDelay = 0;
    const startTime = Date.now();

    const timer = setInterval(() => {
      setOverallElapsedMs(Date.now() - startTime);
    }, 100);

    stageDelays.forEach((delay, idx) => {
      setTimeout(() => {
        setCurrentStageIndex(idx);
        setStages(prev => prev.map((s, i) => {
          if (i < idx) return { ...s, status: 'completed', latencyMs: stageDelays[i] };
          if (i === idx) return { ...s, status: 'processing' };
          return { ...s, status: 'idle' };
        }));
      }, cumulativeDelay);
      cumulativeDelay += delay;
    });

    // Complete all stages and produce result
    setTimeout(() => {
      clearInterval(timer);
      setStages(prev => prev.map((s, i) => ({
        ...s,
        status: 'completed',
        latencyMs: stageDelays[i]
      })));

      const newResult = generateAnalysisResult(currentImage, query);
      setActiveResult(newResult);
      setHistory(prev => [newResult, ...prev.filter(item => item.id !== newResult.id)].slice(0, 10));
      setIsAnalyzing(false);
      setOverallElapsedMs(0);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }, cumulativeDelay);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Navbar
        onReset={handleReset}
        onNavigateTo={handleNavigateTo}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Landing / Dashboard */}
        <HeroLanding
          onStartAnalysis={() => handleNavigateTo('workspace')}
          onSelectSample={handleSelectSample}
        />

        {/* Core Analysis Workspace Container */}
        <div ref={workspaceRef} id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                  SATQUERY AI Analysis Studio
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                Multimodal Remote-Sensing Vision-Language Inference Console
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                ACTIVE SCENE: <strong className="text-cyan-400">{currentImage.name}</strong>
              </span>
            </div>
          </div>

          {/* Grid Layout: Satellite Image Workspace & Query Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Prominent Image Canvas & Dataset Chooser */}
            <div className="lg:col-span-7 space-y-4">
              <ImageWorkspace
                currentImage={currentImage}
                onSelectImage={(img) => {
                  setCurrentImage(img);
                  setSelectedFeatureId(null);
                }}
                onCustomImageUploaded={handleCustomImageUploaded}
                selectedFeatureId={selectedFeatureId}
                onSelectFeature={setSelectedFeatureId}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Right 5 Columns: Query Box & Agentic Pipeline Tracker */}
            <div className="lg:col-span-5 space-y-5">
              {/* Query Box */}
              <QueryConsole
                query={query}
                onQueryChange={setQuery}
                onRunAnalysis={handleRunAnalysis}
                isAnalyzing={isAnalyzing}
              />

              {/* Agentic Workflow Pipeline Tracker */}
              <AgentPipelineTracker
                stages={stages}
                currentStageIndex={currentStageIndex}
                isAnalyzing={isAnalyzing}
                overallElapsedMs={overallElapsedMs}
              />
            </div>
          </div>

          {/* Results Panel */}
          <div ref={resultsRef} className="pt-4">
            {activeResult && (
              <AnalysisResultsView
                result={activeResult}
                selectedFeatureId={selectedFeatureId}
                onSelectFeature={setSelectedFeatureId}
                onOpenExportModal={() => setIsExportModalOpen(true)}
              />
            )}
          </div>

          {/* Multimodal Architecture Overview */}
          <MultimodalOverview />

          {/* Analysis History Section */}
          <AnalysisHistory
            history={history}
            onSelectHistoryItem={(item) => {
              setActiveResult(item);
              setQuery(item.query);
              const matchingImg = SAMPLE_IMAGES.find(img => img.id === item.imageId);
              if (matchingImg) {
                setCurrentImage(matchingImg);
              }
              resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            onClearHistory={() => setHistory([])}
            activeResultId={activeResult?.id}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Satellite className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-bold">SATQUERY AI</span>
            <span>—</span>
            <span>Agentic Vision-Language Assistant for Multimodal Remote Sensing</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ACADEMIC PPT DEMO SPECIFICATION</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">ALL SENSORS NOMINAL</span>
          </div>
        </div>
      </footer>

      {/* Export Report Modal */}
      <ExportReportModal
        result={isExportModalOpen ? activeResult : null}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
}

export default App;
