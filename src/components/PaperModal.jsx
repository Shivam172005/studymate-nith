import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  ZoomIn, 
  ZoomOut,
  Building2,
  FileCheck2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Paperclip,
  ExternalLink,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export default function PaperModal({
  paper,
  onClose,
  isSaved,
  onToggleSave,
  onBookmarkQuestion,
  onLogMistakeFromPaper,
  bookmarkedQuestionIds = []
}) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [viewMode, setViewMode] = useState(paper.attachedFile ? 'attached' : 'formatted'); // 'formatted' | 'attached'

  if (!paper) return null;

  const toggleSolution = (qIndex) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [qIndex]: !prev[qIndex]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    // If user uploaded an actual file from their laptop, download that directly!
    if (paper.attachedFile?.url) {
      const element = document.createElement('a');
      element.href = paper.attachedFile.url;
      element.download = paper.attachedFile.name || `NITH_${paper.code}_${paper.year}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      return;
    }

    // Otherwise download simulated structured paper with solutions
    const element = document.createElement('a');
    const file = new Blob(
      [
        `NATIONAL INSTITUTE OF TECHNOLOGY HAMIRPUR (H.P.)\n` +
        `Department of ${paper.deptName}\n` +
        `${paper.examType.toUpperCase()} EXAMINATION ${paper.year}\n` +
        `Subject: ${paper.subject} (${paper.code})\n` +
        `Semester: ${paper.semester} | Max Marks: ${paper.maxMarks} | Time: ${paper.timeAllowed}\n\n` +
        paper.questions.map((q) => {
          let str = `${q.qNum} [${q.marks} Marks] (${q.unit}):\n${q.text}\n`;
          if (q.solution) {
            str += `\n[SOLUTION & KEY STEPS]:\n${q.solution.summary}\n`;
            if (q.solution.steps) {
              str += q.solution.steps.map(s => `• ${s}`).join('\n') + '\n';
            }
          }
          return str + '\n------------------------------------\n\n';
        }).join('')
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `NITH_${paper.code}_${paper.examType.toUpperCase()}_${paper.year}_With_Solutions.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="text-xs sm:text-sm font-bold text-slate-200 truncate">
              {paper.subject} • {paper.code} ({paper.year})
            </span>
            {paper.attachedFile && (
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/30 font-semibold">
                <Paperclip className="w-3 h-3" /> Laptop File
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Switcher if Laptop File Attached */}
            {paper.attachedFile && (
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs mr-1">
                <button
                  onClick={() => setViewMode('attached')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    viewMode === 'attached'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Original File
                </button>
                <button
                  onClick={() => setViewMode('formatted')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    viewMode === 'formatted'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  NITH Format
                </button>
              </div>
            )}

            {/* Zoom Controls (only in formatted view) */}
            {viewMode === 'formatted' && (
              <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(80, prev - 10))}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[11px] font-mono text-slate-400">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Bookmark entire paper button */}
            <button
              onClick={() => onToggleSave(paper.id)}
              className={`p-1.5 rounded-lg border transition-all text-xs flex items-center gap-1 ${
                isSaved
                  ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isSaved ? 'Paper Saved' : 'Save Paper'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all"
              title="Print Question Paper"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              title="Download Paper"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 text-slate-400 hover:text-white transition-all ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex justify-center">
          
          {/* A. If viewing attached laptop file */}
          {viewMode === 'attached' && paper.attachedFile ? (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-300 w-full flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {paper.attachedFile.isPdf ? 'PDF' : 'IMG'}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">
                      {paper.attachedFile.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Attached directly from Laptop Storage • {paper.attachedFile.size}
                    </div>
                  </div>
                </div>

                <a
                  href={paper.attachedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>
              </div>

              {/* Render PDF or Image */}
              {paper.attachedFile.isPdf ? (
                <div className="w-full h-[68vh] rounded-xl overflow-hidden border border-slate-300 bg-white shadow-md">
                  <iframe
                    src={paper.attachedFile.url}
                    className="w-full h-full border-0"
                    title={paper.attachedFile.name}
                  />
                </div>
              ) : paper.attachedFile.isImage ? (
                <div className="w-full max-h-[68vh] overflow-auto rounded-xl border border-slate-300 bg-white p-4 flex justify-center shadow-md">
                  <img
                    src={paper.attachedFile.url}
                    alt={paper.attachedFile.name}
                    className="max-h-[62vh] object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-300 w-full p-6">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800">{paper.attachedFile.name}</p>
                  <a
                    href={paper.attachedFile.url}
                    download={paper.attachedFile.name}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                  >
                    <Download className="w-4 h-4" /> Download Attached Document
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* B. Formatted Authentic NITH Examination Paper */
            <div 
              id="printable-nith-paper"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-3xl bg-white shadow-md border border-slate-300 rounded-sm p-6 sm:p-10 text-slate-900 transition-transform duration-150"
            >
              
              {/* NITH Examination Header */}
              <div className="text-center border-b-2 border-slate-900 pb-5 mb-5">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Building2 className="w-6 h-6 text-slate-800" />
                  <h1 className="text-base sm:text-lg font-black tracking-widest uppercase">
                    NATIONAL INSTITUTE OF TECHNOLOGY HAMIRPUR (H.P.)
                  </h1>
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Department of {paper.deptName}
                </h2>
                <div className="mt-2 inline-block px-4 py-1 bg-slate-100 border border-slate-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                  {paper.examType === 'mid' ? 'MID SEMESTER' : 'END SEMESTER'} EXAMINATION — {paper.year}
                </div>
              </div>

              {/* Paper Metadata Table */}
              <div className="border border-slate-800 text-xs mb-6 grid grid-cols-2 divide-x divide-slate-800">
                <div className="p-2 space-y-1">
                  <div><span className="font-bold">Course Title:</span> {paper.subject}</div>
                  <div><span className="font-bold">Course Code:</span> {paper.code}</div>
                  <div><span className="font-bold">Semester:</span> {paper.semester}th Semester</div>
                </div>
                <div className="p-2 space-y-1">
                  <div><span className="font-bold">Time Allowed:</span> {paper.timeAllowed}</div>
                  <div><span className="font-bold">Maximum Marks:</span> {paper.maxMarks}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold">Roll No:</span> 
                    <span className="border-b border-dotted border-slate-700 w-28 inline-block"></span>
                  </div>
                </div>
              </div>

              {/* Note & General Instructions */}
              <div className="mb-6 p-3 bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                <span className="font-extrabold uppercase">Instructions:</span>
                <ol className="list-decimal list-inside space-y-0.5 mt-1">
                  <li>Attempt all questions. Marks are indicated against each question.</li>
                  <li>Assume any missing data suitably and state the assumptions clearly.</li>
                  <li>Draw neat sketches and circuit/block diagrams wherever required.</li>
                  <li>Click <b>"View Solution"</b> on any question below to inspect the step-by-step marking guide.</li>
                </ol>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {paper.questions.map((q, idx) => {
                  const isSolExpanded = Boolean(expandedSolutions[idx]);
                  const isBookmarked = bookmarkedQuestionIds.includes(q.id || `q-${paper.id}-${idx}`);

                  return (
                    <div key={idx} className="border-b border-slate-200 pb-5 last:border-b-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                            {q.qNum}
                          </span>
                          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {q.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900 bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded">
                            [{q.marks} Marks]
                          </span>

                          {/* Bookmark individual question */}
                          <button
                            onClick={() => onBookmarkQuestion({
                              id: q.id || `q-${paper.id}-${idx}`,
                              source: `${paper.examType.toUpperCase()} ${paper.year} • ${paper.code}`,
                              subject: paper.subject,
                              code: paper.code,
                              marks: q.marks,
                              unit: q.unit,
                              question: q.text,
                              solutionSummary: q.solution?.summary || '',
                              solution: q.solution
                            })}
                            className={`p-1 rounded-md border transition-all text-xs ${
                              isBookmarked
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100 border-slate-200'
                            }`}
                            title="Bookmark this specific question to revisit"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                          </button>

                          {/* Log as mistake */}
                          <button
                            onClick={() => onLogMistakeFromPaper({
                              question: q.text,
                              subject: paper.subject,
                              code: paper.code,
                              source: `${paper.examType.toUpperCase()} ${paper.year}`,
                              solutionSummary: q.solution?.summary || ''
                            })}
                            className="p-1 rounded-md border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all text-xs"
                            title="Log this question in Exam Mistakes Journal"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-1 font-serif">
                        {q.text}
                      </p>

                      {/* Question Action Row: View Solution toggle */}
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          onClick={() => toggleSolution(idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{isSolExpanded ? 'Hide Solution' : 'View Solution & Steps'}</span>
                          {isSolExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <span className="text-[10px] text-slate-400 italic">
                          NITH Marking Scheme
                        </span>
                      </div>

                      {/* Expanded Solution View */}
                      {isSolExpanded && (
                        <div className="mt-3 p-4 bg-slate-50 border border-indigo-100 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-900 uppercase tracking-wide text-[11px]">
                            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Step-by-Step Answer Breakdown:</span>
                          </div>

                          <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 font-sans">
                            {q.solution?.summary || 'Standard academic solution follows the derivation steps in the textbook and lecture notes.'}
                          </p>

                          {q.solution?.steps && (
                            <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                              <span className="font-bold text-slate-800 block mb-1">Marking Guide Steps:</span>
                              {q.solution.steps.map((step, sIdx) => (
                                <div key={sIdx} className="text-slate-600 font-mono text-[11px] leading-relaxed">
                                  {step}
                                </div>
                              ))}
                            </div>
                          )}

                          {q.solution?.examTip && (
                            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span><b>NITH Faculty Tip:</b> {q.solution.examTip}</span>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

              {/* Footer Sign-off */}
              <div className="mt-10 pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <div>*** END OF QUESTION PAPER ***</div>
                <div>Uploaded via Study Mate NIT Hamirpur</div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Verified NITH Archive Paper • Contributed by {paper.uploadedBy}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Paper'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
