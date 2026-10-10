import React from 'react';
import { X, Bookmark, CheckCircle, FileText, Target, Trash2, ArrowRight } from 'lucide-react';

export default function BookmarksDrawer({
  isOpen,
  onClose,
  savedPapers,
  masteredPyqs,
  savedExpectedList,
  onOpenPaper,
  onRemoveSavedPaper,
  onRemoveMasteredPyq,
  onRemoveSavedExpected,
  onNavigateTab
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              My Saved Exam Kit
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs / Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Saved Question Papers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                Saved Papers ({savedPapers.length})
              </span>
              {savedPapers.length > 0 && (
                <button
                  onClick={() => {
                    onNavigateTab('papers');
                    onClose();
                  }}
                  className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {savedPapers.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                No papers bookmarked yet. Click the bookmark icon on any paper to save it here for fast revision!
              </p>
            ) : (
              <div className="space-y-2">
                {savedPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all flex items-center justify-between gap-3"
                  >
                    <div 
                      className="cursor-pointer flex-1"
                      onClick={() => {
                        onOpenPaper(paper);
                        onClose();
                      }}
                    >
                      <div className="font-bold text-xs text-slate-900 line-clamp-1 hover:text-indigo-600">
                        {paper.subject}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-bold text-indigo-700">{paper.code}</span>
                        <span>•</span>
                        <span>{paper.examType.toUpperCase()} {paper.year}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveSavedPaper(paper.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mastered PYQs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Mastered Repeated PYQs ({masteredPyqs.length})
              </span>
              {masteredPyqs.length > 0 && (
                <button
                  onClick={() => {
                    onNavigateTab('repeated');
                    onClose();
                  }}
                  className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-0.5"
                >
                  Go to PYQs <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {masteredPyqs.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                You haven't marked any repeated PYQs as mastered yet.
              </p>
            ) : (
              <div className="space-y-2">
                {masteredPyqs.map((pyq) => (
                  <div
                    key={pyq.id}
                    className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200 text-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 line-clamp-2">
                        {pyq.question}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">
                        {pyq.code} • Repeated {pyq.repeatCount} times
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveMasteredPyq(pyq.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded shrink-0"
                      title="Unmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Expected PYQs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-teal-600" />
                Saved Expected Questions ({savedExpectedList.length})
              </span>
              {savedExpectedList.length > 0 && (
                <button
                  onClick={() => {
                    onNavigateTab('expected');
                    onClose();
                  }}
                  className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
                >
                  View Radar <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {savedExpectedList.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                Bookmark predicted questions to build your personalized exam-eve formula and question sheet!
              </p>
            ) : (
              <div className="space-y-2">
                {savedExpectedList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-teal-50/40 rounded-xl border border-teal-200 text-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 line-clamp-2">
                        {item.predictedQuestion}
                      </div>
                      <div className="text-[10px] text-teal-800 font-bold mt-1">
                        {item.code} • {item.probability}% Probability
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveSavedExpected(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded shrink-0"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500">
            Study Mate NIT Hamirpur • Saved in your local browser
          </p>
        </div>

      </div>
    </div>
  );
}
