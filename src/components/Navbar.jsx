import React from 'react';
import { Pill, Scan, BookOpen, History, ShieldAlert, WifiOff, Flashlight } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, torchOn, setTorchOn }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Pill className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                PharmaScan
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                AI Vision
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Real-Time Offline Counterfeit Medicine Detector</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Scan className="w-4 h-4" />
            ML Scanner
          </button>

          <button
            onClick={() => setActiveTab('advisory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'advisory'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Smart Advisory
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <History className="w-4 h-4" />
            Scan Logs
          </button>
        </nav>

        {/* Right Tools & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTorchOn(!torchOn)}
            className={`p-2 rounded-lg border transition-all ${
              torchOn
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Inspection Torch"
          >
            <Flashlight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400">
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">OFFLINE MODE</span>
          </div>
        </div>

      </div>

      {/* Mobile Tab bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-900/95 py-2 px-2">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
            activeTab === 'scanner' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400'
          }`}
        >
          <Scan className="w-4 h-4" />
          Scanner
        </button>
        <button
          onClick={() => setActiveTab('advisory')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
            activeTab === 'advisory' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Advisory
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
            activeTab === 'history' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400'
          }`}
        >
          <History className="w-4 h-4" />
          History
        </button>
      </div>
    </header>
  );
}
