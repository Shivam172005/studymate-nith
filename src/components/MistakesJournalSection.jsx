import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PlusCircle, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  X, 
  Search, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MistakesJournalSection({
  mistakes,
  onAddMistake,
  onToggleStatus,
  onDeleteMistake,
  initialNewMistakeData,
  clearInitialMistakeData
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(Boolean(initialNewMistakeData));

  // Form states
  const [questionText, setQuestionText] = useState(initialNewMistakeData?.question || '');
  const [subjectName, setSubjectName] = useState(initialNewMistakeData?.subject || 'Data Structures & Algorithms');
  const [courseCode, setCourseCode] = useState(initialNewMistakeData?.code || 'CS-211');
  const [examTag, setExamTag] = useState(initialNewMistakeData?.source || 'Mid-Term 2024');
  const [mistakeMade, setMistakeMade] = useState('');
  const [correctConcept, setCorrectConcept] = useState(initialNewMistakeData?.solutionSummary || '');

  // Filter
  const filtered = mistakes.filter((m) => {
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      m.question.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.mistakeMade.toLowerCase().includes(q) ||
      m.correctConcept.toLowerCase().includes(q)
    );
  });

  const resolvedCount = mistakes.filter((m) => m.status === 'revised').length;
  const pendingCount = mistakes.length - resolvedCount;

  const handleToggle = (id, currentStatus) => {
    onToggleStatus(id);
    if (currentStatus === 'needs_practice') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleSaveMistake = (e) => {
    e.preventDefault();
    if (!questionText.trim() || !mistakeMade.trim()) return;

    const newEntry = {
      id: `mst-${Date.now()}`,
      subject: subjectName,
      code: courseCode.toUpperCase(),
      examTag: examTag || 'Exam Prep',
      question: questionText.trim(),
      mistakeMade: mistakeMade.trim(),
      correctConcept: correctConcept.trim() || 'Review NITH lecture notes and formula sheet.',
      status: 'needs_practice',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onAddMistake(newEntry);
    setIsAddModalOpen(false);
    setQuestionText('');
    setMistakeMade('');
    setCorrectConcept('');
    if (clearInitialMistakeData) clearInitialMistakeData();
  };

  return (
    <section className="py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-amber-200/80 rounded-2xl p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 border border-rose-200 text-xs font-bold mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Exam Mistakes Journal</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Review Questions You Got Wrong
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Turn your past mistakes into full marks. Log the exact questions you messed up during mid-terms, class quizzes, or past papers and review the core takeaways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-white p-3 rounded-xl border border-amber-200 text-center min-w-[120px]">
              <span className="text-xl font-black text-amber-600">{pendingCount}</span>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Needs Practice</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center min-w-[120px]">
              <span className="text-xl font-black text-emerald-600">{resolvedCount}</span>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Resolved</span>
            </div>
          </div>
        </div>

        {/* Action and Filter Row */}
        <div className="mt-5 pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Filter:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All Mistakes' },
                { id: 'needs_practice', label: 'Needs Practice' },
                { id: 'revised', label: 'Resolved / Mastered' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
                    filterStatus === f.id
                      ? 'bg-rose-600 text-white shadow-xs font-bold'
                      : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log a Mistake</span>
          </button>
        </div>
      </div>

      {/* Mistakes List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No mistakes logged in this view!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Whenever you get a question wrong in an exam or practice paper, log it here to avoid repeating the same error.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
          >
            Log Your First Mistake
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, index) => {
            const isResolved = item.status === 'revised';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs overflow-hidden ${
                  isResolved
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : 'border-slate-200 hover:border-rose-300'
                }`}
              >
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {item.code}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {item.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {item.examTag}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Logged on {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(item.id, item.status)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isResolved
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-amber-100 hover:bg-emerald-100 text-amber-800 hover:text-emerald-800'
                      }`}
                    >
                      {isResolved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mastered / Resolved</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Mark Resolved</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onDeleteMistake(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-base font-bold text-slate-900 my-2">
                  {index + 1}. {item.question}
                </h3>

                {/* Two side-by-side boxes: Mistake vs Correct Concept */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {/* Mistake made */}
                  <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950">
                    <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Mistake I Made During Exam:</span>
                    </div>
                    <p className="leading-relaxed font-medium">
                      {item.mistakeMade}
                    </p>
                  </div>

                  {/* Correct concept */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Correct Concept & Key Takeaway:</span>
                    </div>
                    <p className="leading-relaxed font-medium">
                      {item.correctConcept}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Add Mistake Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-rose-900 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-base">Log an Exam Mistake</h3>
              </div>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  if (clearInitialMistakeData) clearInitialMistakeData();
                }} 
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMistake} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="e.g. Data Structures"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Code & Exam</label>
                  <input
                    type="text"
                    value={examTag}
                    onChange={(e) => setExamTag(e.target.value)}
                    placeholder="e.g. CS-211 • Mid-Term 2024"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">The Question You Got Wrong *</label>
                <textarea
                  rows={2}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the question text..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-700 mb-1">What exact mistake did you make? *</label>
                <textarea
                  rows={2}
                  required
                  value={mistakeMade}
                  onChange={(e) => setMistakeMade(e.target.value)}
                  placeholder="e.g. Forgot boundary check when n=0, lost 4 marks in edge condition..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-700 mb-1">What is the correct concept / lesson learned?</label>
                <textarea
                  rows={2}
                  value={correctConcept}
                  onChange={(e) => setCorrectConcept(e.target.value)}
                  placeholder="e.g. Always write base case if (head == NULL) return NULL before loop..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    if (clearInitialMistakeData) clearInitialMistakeData();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
                >
                  Save Mistake to Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
