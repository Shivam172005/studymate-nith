import React from 'react';
import { GraduationCap, Heart, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenUploadModal, onSelectTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight">Peerly NIT Hamirpur</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md text-xs">
              A comprehensive open platform built for students of National Institute of Technology Hamirpur (NITH) to access past Mid-Term & End-Term papers, analyze frequently repeated PYQs, and review high-probability predicted questions.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Created for Hackathon Presentation • NIT Hamirpur Edition</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('papers')} className="hover:text-white transition-colors">
                  Mid & End Term Papers Archive
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('repeated')} className="hover:text-white transition-colors">
                  🔥 Most Repeated PYQs Radar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('expected')} className="hover:text-white transition-colors">
                  🎯 Expected PYQs Predictor
                </button>
              </li>
              <li>
                <button onClick={onOpenUploadModal} className="hover:text-indigo-400 transition-colors font-semibold">
                  + Contribute a Question Paper
                </button>
              </li>
            </ul>
          </div>

          {/* Academic disclaimer */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">NITH Departments</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              CSE • ECE • EE • ME • CE • CHE • MnC • MSE • Architecture & Dual Degree.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-bold block text-white mb-0.5">Note:</span>
              Curated by students for academic peer study and revision purposes.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Study Mate NIT Hamirpur. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for NIT Hamirpur Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
