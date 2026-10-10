import React from 'react';
import { Search, Sparkles, BookOpen, Layers, CheckCircle2, Flame, Target } from 'lucide-react';
import { DEPARTMENTS, SEMESTERS, NITH_STATS } from '../data/nithData';

export default function HeroBanner({
  selectedDept,
  setSelectedDept,
  selectedSem,
  setSelectedSem,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/60 shadow-xl">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* NITH Student Community Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Curated for Students of National Institute of Technology Hamirpur</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Ace Your Mid-Term & End-Term Exams with{' '}
          <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-rose-300 bg-clip-text text-transparent">
            Peerly NIT Hamirpur
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Access verified past year question papers, discover <span className="text-rose-400 font-semibold">most repeated questions</span>, and prepare high-probability <span className="text-emerald-400 font-semibold">expected PYQs</span> predicted for upcoming semesters.
        </p>

        {/* Global Search Bar */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/30 transition-all">
            <Search className="w-5 h-5 text-indigo-300 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by subject (e.g. DSA, OS, Electronics), course code (CS-211), or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs bg-white/20 hover:bg-white/30 text-white rounded-lg px-2.5 py-1 mr-1 transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Department Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40 font-bold scale-105'
                    : 'bg-white/10 hover:bg-white/15 text-slate-300 border border-white/10'
                }`}
              >
                <span>{dept.icon || '📚'}</span>
                <span>{dept.short}</span>
              </button>
            );
          })}
        </div>

        {/* Semester Filter Row */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Semester:
          </span>
          {SEMESTERS.map((sem) => {
            const isSelected = selectedSem === sem.id;
            return (
              <button
                key={sem.id}
                onClick={() => setSelectedSem(sem.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sem.label}
              </button>
            );
          })}
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-white/10">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-indigo-300">{NITH_STATS.totalPapers}</div>
            <div className="text-xs text-slate-400">Mid & End Term Papers</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-rose-300">{NITH_STATS.repeatedPyqs}</div>
            <div className="text-xs text-slate-400">Analyzed Repeated PYQs</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-emerald-300">{NITH_STATS.branchesCount} Branches</div>
            <div className="text-xs text-slate-400">Complete Coverage</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-blue-300">Free & Verified</div>
            <div className="text-xs text-slate-400">By NITH Toppers</div>
          </div>
        </div>

      </div>
    </div>
  );
}
