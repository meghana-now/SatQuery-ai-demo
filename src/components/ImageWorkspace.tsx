import { useState, useRef } from 'react';
import type { SampleImage } from '../types';
import { SAMPLE_IMAGES } from '../data/sampleImages';
import { InteractiveImageCanvas } from './InteractiveImageCanvas';
import { Upload, Satellite, Calendar, CloudRain, CheckCircle, Info } from 'lucide-react';


interface ImageWorkspaceProps {
  currentImage: SampleImage;
  onSelectImage: (image: SampleImage) => void;
  onCustomImageUploaded: (customImage: SampleImage) => void;
  selectedFeatureId: string | null;
  onSelectFeature: (featureId: string | null) => void;
  isAnalyzing: boolean;
}

export const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({
  currentImage,
  onSelectImage,
  onCustomImageUploaded,
  selectedFeatureId,
  onSelectFeature,
  isAnalyzing
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPEG, TIFF, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const customImg: SampleImage = {
        id: `custom-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        category: 'custom',
        description: `Custom user-uploaded remote sensing asset: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        imageUrl: dataUrl,
        sensor: 'User Remote-Sensing Upload',
        resolution: 'User Native Resolution',
        coordinates: '37°46\'29"N, 122°25\'09"W (Default Datum)',
        date: new Date().toISOString().split('T')[0],
        cloudCover: '< 1.5% (Estimated)',
        spectralBands: ['Band 1 (Red)', 'Band 2 (Green)', 'Band 3 (Blue)', 'Band 4 (Alpha)'],
        features: [
          {
            id: 'feat-user-1',
            label: 'Detected Primary Surface Feature',
            category: 'urban',
            confidence: 94.2,
            color: '#38bdf8',
            bbox: { x: 25, y: 25, width: 50, height: 45 },
            areaKm2: 2.4,
            description: 'Central region of interest identified by the vision backbone.'
          },
          {
            id: 'feat-user-2',
            label: 'Boundary / Margin Interface',
            category: 'infrastructure',
            confidence: 91.8,
            color: '#eab308',
            bbox: { x: 10, y: 70, width: 80, height: 20 },
            areaKm2: 1.1,
            description: 'Linear perimeter structure or transport corridor.'
          }
        ]
      };
      onCustomImageUploaded(customImg);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preset Satellite Scenes Selector */}
      <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 text-cyan-400" />
            SELECT REMOTE-SENSING SCENE OR UPLOAD CUSTOM ASSET:
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            3 High-Resolution Datasets Pre-Loaded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          {SAMPLE_IMAGES.map((sample) => {
            const isSelected = currentImage.id === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSelectImage(sample)}
                className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500/80 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-950 shrink-0 border border-slate-700">
                  <img src={sample.imageUrl} alt={sample.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {sample.category === 'urban' && 'Rotterdam Port'}
                      {sample.category === 'environmental' && 'Amazon Basin'}
                      {sample.category === 'disaster' && 'Indus Flood'}
                    </span>
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{sample.sensor}</p>
                  <p className="text-[9px] font-mono text-cyan-400/80 truncate">{sample.resolution}</p>
                </div>
              </button>
            );
          })}

          {/* Upload Button */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center justify-center gap-2 p-2 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
              isDragging
                ? 'border-cyan-400 bg-cyan-950/30'
                : 'border-slate-700/80 hover:border-cyan-500/50 bg-slate-950/40 hover:bg-slate-900/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <Upload className="w-4 h-4 text-cyan-400" />
            <div className="text-left">
              <div className="text-xs font-medium text-slate-200">Upload Image</div>
              <div className="text-[10px] text-slate-400">PNG, JPG, GeoTIFF</div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Image Display Canvas */}
      <InteractiveImageCanvas
        imageUrl={currentImage.imageUrl}
        imageName={currentImage.name}
        features={currentImage.features}
        selectedFeatureId={selectedFeatureId}
        onSelectFeature={onSelectFeature}
        isAnalyzing={isAnalyzing}
        baseCoordinates={currentImage.coordinates}
      />

      {/* Telemetry & Metadata Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <Satellite className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] text-slate-400 block">SENSOR PLATFORM</span>
            <span className="text-slate-200 font-semibold truncate block">{currentImage.sensor}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] text-slate-400 block">ACQUISITION TIME</span>
            <span className="text-slate-200 font-semibold truncate block">{currentImage.date}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] text-slate-400 block">CLOUD COVERAGE</span>
            <span className="text-slate-200 font-semibold truncate block">{currentImage.cloudCover}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] text-slate-400 block">GROUND RESOLUTION</span>
            <span className="text-slate-200 font-semibold truncate block">{currentImage.resolution}</span>
          </div>
        </div>
      </div>

      {/* Spectral Bands Tags */}
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/40 border border-slate-800/60 text-[11px] font-mono">
        <span className="text-slate-400 font-medium mr-1">SPECTRAL BANDS REGISTERED:</span>
        {currentImage.spectralBands.map((band, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/80 text-cyan-300 text-[10px]"
          >
            {band}
          </span>
        ))}
      </div>
    </div>
  );
};
