import React from 'react';
import { ShieldCheck, Cpu, Zap, Eye, AlertTriangle } from 'lucide-react';

export default function PresentationHeader() {
  return (
    <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border-b border-cyan-500/20 px-4 py-3 text-xs">
      <div className="max-w-7xl mx-mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>PHARMASCAN DEMO (40% DELIVERABLE COMPLETE)</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <strong className="text-white">Single-Image ML:</strong> Client-Side Vision
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <strong className="text-white">Heatmap:</strong> Anomaly Diagnostic View
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <strong className="text-white">Smart Advisory:</strong> Pharmacovigilance Dossier
          </span>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-full font-mono text-[11px]">
          100% Offline AI Execution Active
        </div>
      </div>
    </div>
  );
}
