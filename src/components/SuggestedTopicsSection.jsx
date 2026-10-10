import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Sparkles, 
  Award, 
  AlertCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuggestedTopicsSection({
  suggestedTopics,
  revisedTopicIds,
  onToggleReviseTopic,
  onGainExp
}) {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(suggestedTopics[0]?.id || null);

  const subjects = ['all', 'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Analog Electronics', 'Digital Signal Processing', 'Thermodynamics & Heat Transfer'];

  const filtered = suggestedTopics.filter((item) => {
    if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.topic.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const revisedCount = suggestedTopics.filter((t) => revisedTopicIds.includes(t.id)).length;
  const progressPercent = Math.round((revisedCount / suggestedTopics.length) * 100);

  const handleToggle = (id) => {
    const isNowRevised = !revisedTopicIds.includes(id);
    onToggleReviseTopic(id);
    if (isNowRevised) {
      onGainExp(10, 'Marked Suggested Topic Revised (+10 EXP)');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <section className="py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-amber-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Exam-Eve Hitlist • Ranked by Repeat Frequency</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Suggested Topics for Last-Night Revision
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Don't panic revise the entire syllabus. Here are the highest-yield topics ranked strictly in order of recurrence in NIT Hamirpur exams over the last 5 years.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex items-center gap-5 min-w-[240px]">
            <div>
              <div className="text-3xl font-black text-amber-300">{progressPercent}%</div>
              <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Hitlist Completed</div>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div>
              <div className="text-lg font-bold text-white">{revisedCount} / {suggestedTopics.length}</div>
              <div className="text-[10px] text-slate-300">Topics Revised</div>
            </div>
          </div>
        </div>

        {/* Subjects bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedSubject === s
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              {s === 'all' ? 'All Subjects' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search suggested topic, code, or theorem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <b className="text-slate-800">{filtered.length}</b> Priority Topics
        </div>
      </div>

      {/* Ranked Topics List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isRevised = revisedTopicIds.includes(item.id);
          const isExpanded = expandedTopicId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                isRevised
                  ? 'border-emerald-300 bg-emerald-50/15'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              {/* Topic Header Row */}
              <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  
                  {/* Meta Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      #{item.rank}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-600" />
                      <span>{item.repeatCount}</span>
                    </span>

                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {item.code} • {item.subject}
                    </span>

                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Expected: {item.expectedMarks}
                    </span>
                  </div>

                  {/* Topic Title */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug my-2">
                    {item.topic}
                  </h3>

                  {/* Why revise tonight quote */}
                  <div className="mt-2 text-xs text-amber-950 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 font-medium leading-relaxed">
                    <b>Why Revise Tonight:</b> {item.whyTonight}
                  </div>
                </div>

                {/* Mark Revised Action Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isRevised
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                    }`}
                  >
                    {isRevised ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Revised! (+10 EXP)</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-400" />
                        <span>Mark Revised</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setExpandedTopicId(isExpanded ? null : item.id)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Key Points & Formulas Checklist */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/70 p-5 space-y-3 animate-in fade-in duration-150">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Essential Concepts Checklist (Write in Exam to get Full Marks):</span>
                  </h4>

                  <div className="grid grid-cols-1 gap-2">
                    {item.keyPoints.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5 font-medium leading-relaxed shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {pIdx + 1}
                        </span>
                        <span>{pt}</span>
                      </div>
                    ))}
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
