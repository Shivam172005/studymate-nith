import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  FileText,
  Search,
  Copy,
  Check
} from 'lucide-react';

export default function BookmarksSection({
  questionBookmarks,
  onRemoveBookmark,
  onLogMistakeFromQuestion,
  onNavigateTab
}) {
  const [expandedId, setExpandedId] = useState(questionBookmarks[0]?.id || null);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filtered = questionBookmarks.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-indigo-200/80 rounded-2xl p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 border border-indigo-200 text-xs font-bold mb-2">
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personalized Revision Queue</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Bookmarked Questions to Revisit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Specific problems and derivations you flagged while browsing Mid-Term & End-Term papers. Revisit them before entering the exam hall.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-indigo-200 text-center min-w-[160px]">
            <span className="text-2xl font-black text-indigo-600">{questionBookmarks.length}</span>
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bookmarked Questions</span>
          </div>
        </div>

        {/* Search bar within bookmarks */}
        <div className="mt-4 pt-3 border-t border-indigo-200/60 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your bookmarked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            onClick={() => onNavigateTab('papers')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Browse More Papers</span>
          </button>
        </div>
      </div>

      {/* Bookmarks List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No question bookmarks yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            When viewing any question paper or PYQ list, click the bookmark icon on any question to add it to this revision queue.
          </p>
          <button
            onClick={() => onNavigateTab('papers')}
            className="mt-4 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
          >
            Explore Question Papers
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all overflow-hidden"
              >
                <div className="p-5">
                  {/* Meta row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                        {item.code}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        {item.subject}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.source}
                      </span>
                      {item.marks && (
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {item.marks} Marks
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Remove from Bookmarks"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug my-2">
                    {index + 1}. {item.question}
                  </h3>

                  {item.unit && (
                    <div className="text-[11px] font-semibold text-slate-500">
                      Unit: {item.unit}
                    </div>
                  )}

                  {/* Action row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onLogMistakeFromQuestion(item)}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50/60 hover:bg-rose-50 text-xs font-bold text-rose-700 flex items-center gap-1.5 transition-all"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Log as Mistake</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleCopy(item.question, item.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 text-xs flex items-center gap-1"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible Solution */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50/80 p-5 text-xs text-slate-700">
                    <div className="font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Step-by-Step Solution & Working</span>
                    </div>

                    <p className="bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed font-medium">
                      {item.solutionSummary || (item.solution?.summary) || 'Review the core formula and definitions from NITH lecture notes. Pay special attention to edge cases and boundary conditions.'}
                    </p>

                    {item.solution?.steps && (
                      <div className="mt-3 space-y-1">
                        <span className="font-bold text-slate-800 block mb-1">Key Steps:</span>
                        {item.solution.steps.map((st, sIdx) => (
                          <div key={sIdx} className="bg-white p-2 rounded-lg border border-slate-100 font-mono text-[11px]">
                            {st}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
