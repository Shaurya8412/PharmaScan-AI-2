import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Sparkles, AlertCircle, RefreshCw, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { DEMO_SAMPLE_PILLS } from '../data/samplePills.js';
import { MEDICINE_REGISTRY } from '../data/medicineDatabase.js';

export default function SingleImageScanner({
  onImageSelected,
  isAnalyzing,
  selectedBenchmark,
  setSelectedBenchmark,
  torchOn
}) {
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Stop camera when unmounted
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Handle live camera access
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert("Camera access denied or unavailable. Please upload a medicine image file or use the 1-click sample gallery below.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imgDataUrl = canvas.toDataURL('image/png');
    stopCamera();
    onImageSelected(imgDataUrl);
  };

  // Handle file drop / input
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        onImageSelected(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        onImageSelected(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run quick demo sample scan
  const handleSampleClick = (sample) => {
    setSelectedBenchmark(sample.benchmarkId);
    const dataUrl = sample.getImage();
    onImageSelected(dataUrl);
  };

  return (
    <div className="space-y-6">
      
      {/* Benchmark Target Selector */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-cyan-500/20">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Target Medicine Benchmark Standard
          </h2>
          <p className="text-xs text-slate-400">Select the drug standard for visual feature distance matching</p>
        </div>

        <select
          value={selectedBenchmark}
          onChange={(e) => setSelectedBenchmark(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-cyan-300 font-medium text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-cyan-400 w-full md:w-auto"
        >
          {Object.entries(MEDICINE_REGISTRY).map(([id, med]) => (
            <option key={id} value={id}>
              {med.brandName} ({med.form})
            </option>
          ))}
        </select>
      </div>

      {/* Main Single Image Capture / Upload Area */}
      <div className="relative">
        
        {/* Camera Live Viewfinder Mode */}
        {cameraActive ? (
          <div className="relative glass-panel rounded-2xl overflow-hidden aspect-video max-h-[420px] flex items-center justify-center bg-black border-2 border-cyan-500">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

            {/* Viewfinder HUD Target Reticle */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-dashed border-cyan-400/80 rounded-3xl relative animate-pulse flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-l-2 border-cyan-400 absolute top-2 left-2" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-cyan-400 absolute top-2 right-2" />
                <div className="w-4 h-4 border-b-2 border-l-2 border-cyan-400 absolute bottom-2 left-2" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-cyan-400 absolute bottom-2 right-2" />
                <span className="text-[11px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded">ALIGN SINGLE MEDICINE</span>
              </div>
            </div>

            {/* Torch overlay filter simulation */}
            {torchOn && (
              <div className="absolute inset-0 pointer-events-none bg-amber-400/10 mix-blend-overlay" />
            )}

            {/* Camera Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 z-20">
              <button
                onClick={captureCameraFrame}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold px-6 py-3 rounded-full shadow-lg shadow-cyan-500/30 flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Camera className="w-5 h-5" />
                Capture Single Image
              </button>
              <button
                onClick={stopCamera}
                className="bg-slate-900/90 text-slate-300 font-semibold px-4 py-3 rounded-full border border-slate-700 hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* File Drag & Drop / Upload Area */
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative glass-panel rounded-2xl p-8 border-2 border-dashed text-center transition-all ${
              dragActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Upload Single Medicine Image</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Drag & drop an image file of a single pill, capsule, or box packaging (PNG, JPG, WEBP up to 10MB)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-cyan-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-md shadow-cyan-500/20 text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Browse File
                </button>

                <button
                  onClick={startCamera}
                  className="bg-slate-900 border border-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                >
                  <Camera className="w-4 h-4 text-cyan-400" />
                  Use Camera Viewfinder
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 1-Click Presentation Demo Sample Gallery */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1-Click Presentation Demo Samples
            </h3>
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">Select a sample to run instant ML scan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEMO_SAMPLE_PILLS.map((sample) => {
            const isCounterfeit = sample.expectedVerdict === 'COUNTERFEIT';
            const imgDataUrl = sample.getImage();

            return (
              <div
                key={sample.id}
                onClick={() => handleSampleClick(sample)}
                className={`glass-card p-3 rounded-xl cursor-pointer border flex items-center gap-3 transition-all ${
                  isCounterfeit
                    ? 'hover:border-rose-500/50 hover:bg-rose-950/20'
                    : 'hover:border-emerald-500/50 hover:bg-emerald-950/20'
                }`}
              >
                <div className="w-14 h-14 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                  <img src={imgDataUrl} alt={sample.name} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-100 truncate">{sample.name}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{sample.description}</p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase font-mono ${
                      isCounterfeit
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {sample.expectedVerdict}
                    </span>
                    <span className="text-[10px] text-slate-400">({sample.type})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
