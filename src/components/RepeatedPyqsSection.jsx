import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Award, 
  BookOpen, 
  Filter, 
  Share2, 
  Copy, 
  Check,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RepeatedPyqsSection({
  repeatedPyqs,
  masteredIds,
  onToggleMastered
}) {
  const [expandedId, setExpandedId] = useState(repeatedPyqs[0]?.id || null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Filter
  const filteredList = repeatedPyqs.filter((item) => {
    if (filterDifficulty === 'all') return true;
    return item.difficulty.toLowerCase().includes(filterDifficulty.toLowerCase());
  });

  const masteredCount = repeatedPyqs.filter((item) => masteredIds.includes(item.id)).length;
  const progressPercent = repeatedPyqs.length > 0 ? Math.round((masteredCount / repeatedPyqs.length) * 100) : 0;

  const handleToggleMastered = (id) => {
    const willBeMastered = !masteredIds.includes(id);
    onToggleMastered(id);
    if (willBeMastered) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleCopyQuestion = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-rose-200/80 rounded-2xl p-6 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 border border-rose-200 text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>NIT Hamirpur Exam Analytics</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Most Repeated PYQs (High Yield Radar)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Questions that appear year after year in NITH Mid-Term and End-Term exams. Mastering these top questions ensures maximum score efficiency.
            </p>
          </div>

          {/* Mastery Progress Card */}
          <div className="bg-white p-4 rounded-xl border border-rose-200/80 shadow-xs min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Mastery Progress</span>
              <span className="text-rose-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
              {masteredCount} of {repeatedPyqs.length} PYQs mastered
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-5 pt-4 border-t border-rose-200/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Filter Difficulty:</span>
            <div className="flex items-center gap-1">
              {['all', 'easy', 'medium', 'hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold capitalize transition-all ${
                    filterDifficulty === diff
                      ? 'bg-rose-600 text-white shadow-xs font-bold'
                      : 'bg-white text-slate-600 hover:bg-rose-100/50 border border-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredList.length}</span> high-frequency questions
          </div>
        </div>
      </div>

      {/* List of Repeated Questions */}
      <div className="space-y-4">
        {filteredList.map((pyq, index) => {
          const isMastered = masteredIds.includes(pyq.id);
          const isExpanded = expandedId === pyq.id;

          return (
            <div
              key={pyq.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isMastered 
                  ? 'border-emerald-300 shadow-xs bg-emerald-50/10' 
                  : 'border-slate-200 shadow-xs hover:border-rose-300'
              }`}
            >
              {/* Question Header Row */}
              <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  
                  {/* Meta Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                      <Flame className="w-3.5 h-3.5 text-rose-600" />
                      Repeated {pyq.repeatCount} Times
                    </span>

                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {pyq.code} • {pyq.subject}
                    </span>

                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                      Sem {pyq.semester}
                    </span>

                    <span className="px-2 py-0.5 rounded text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200">
                      {pyq.marksWeightage}
                    </span>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2 leading-snug">
                    {index + 1}. {pyq.question}
                  </h3>

                  {/* Repeating Years Tags */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">Appeared in:</span>
                    {pyq.yearsRepeated.map((yr, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80"
                      >
                        {yr}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center justify-between md:items-end gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleMastered(pyq.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isMastered
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                    }`}
                  >
                    <CheckCircle className={`w-4 h-4 ${isMastered ? 'text-white' : 'text-slate-400'}`} />
                    <span>{isMastered ? 'Mastered!' : 'Mark Done'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyQuestion(pyq.question, pyq.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs"
                      title="Copy Question"
                    >
                      {copiedId === pyq.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pyq.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                    >
                      <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Solution & NITH Professor Tip */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 space-y-4">
                  
                  {/* NITH Professor Tip */}
                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold uppercase tracking-wide text-[10px] text-amber-700 block mb-0.5">
                        NITH Exam Strategy & Faculty Tip
                      </span>
                      <p className="leading-relaxed font-medium">
                        {pyq.nithTip}
                      </p>
                    </div>
                  </div>

                  {/* Solution Summary */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Core Concept & Summary Answer
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                      {pyq.solutionSummary}
                    </p>
                  </div>

                  {/* Key Points Checklist */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      Essential Steps to Score Full Marks in Exam
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pyq.keyPoints.map((pt, pIdx) => (
                        <div 
                          key={pIdx} 
                          className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2"
                        >
                          <span className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {pIdx + 1}
                          </span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
