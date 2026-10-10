import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  AlertCircle, 
  CheckSquare, 
  Copy, 
  Check, 
  HelpCircle, 
  Bookmark, 
  BookmarkCheck,
  TrendingUp,
  BrainCircuit,
  Zap
} from 'lucide-react';

export default function ExpectedPyqsSection({
  expectedPyqs,
  savedExpectedIds,
  onToggleSaveExpected
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [filterExam, setFilterExam] = useState('all');

  const filtered = expectedPyqs.filter((item) => {
    if (filterExam === 'all') return true;
    if (filterExam === 'mid') return item.targetExam.toLowerCase().includes('mid');
    if (filterExam === 'end') return item.targetExam.toLowerCase().includes('end');
    return true;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-lg border border-emerald-500/30 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>NITH Syllabus & Trend Prediction Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Expected PYQs (Exam Radar)
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Synthesized by analyzing NIT Hamirpur's 6-year paper patterns, skipped cycles, faculty question banks, and high-weightage syllabus units.
            </p>
          </div>

          {/* Quick Info Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center gap-4 text-xs">
            <div>
              <div className="text-2xl font-black text-emerald-300">92%+</div>
              <div className="text-slate-300 text-[11px]">Historical Pattern Match</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-2xl font-black text-teal-300">Unit-Wise</div>
              <div className="text-slate-300 text-[11px]">Weightage Calibrated</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
          <span className="text-xs text-slate-300 font-medium">Filter Target Exam:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterExam('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterExam === 'all'
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              All Expected
            </button>
            <button
              onClick={() => setFilterExam('mid')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterExam === 'mid'
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Mid-Term Predictions
            </button>
            <button
              onClick={() => setFilterExam('end')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterExam === 'end'
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              End-Term Predictions
            </button>
          </div>
        </div>
      </div>

      {/* Predicted Questions Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((item) => {
          const isSaved = savedExpectedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                
                {/* Header row with Probability meter */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.probability}% Probability</span>
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.targetExam}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleSaveExpected(item.id)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isSaved
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                    title={isSaved ? 'Saved in Cheat Sheet' : 'Save in Cheat Sheet'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Subject & Topic Tag */}
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.code}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.subject}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium text-[11px]">
                    {item.topic}
                  </span>
                </div>

                {/* The Predicted Question */}
                <h3 className="text-base font-bold text-slate-900 leading-snug my-3">
                  {item.predictedQuestion}
                </h3>

                {/* Why this is expected - AI pattern insight */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why This Question is Predicted:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    {item.whyExpected}
                  </p>
                </div>

                {/* Key Formulas & Revision Points */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                    Key Formulas & Derivation Nuggets:
                  </h4>
                  <div className="space-y-1.5">
                    {item.keyFormulas.map((formula, fIdx) => (
                      <div 
                        key={fIdx} 
                        className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100 font-mono text-[11px] text-indigo-950 font-semibold leading-relaxed"
                      >
                        • {formula}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick checklist */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    Topics to write for maximum marks:
                  </h4>
                  <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-600">
                    {item.quickPrepChecklist.map((chk, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  Expected Marks: <span className="text-indigo-600">{item.marksExpected}</span>
                </span>

                <button
                  onClick={() => handleCopy(item.predictedQuestion, item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Question</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
