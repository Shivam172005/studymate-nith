import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

export default function PapersSection({
  papers,
  onOpenPaper,
  savedPaperIds,
  onToggleSavePaper,
  onDownloadPaper
}) {
  const [examTypeFilter, setExamTypeFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Filter papers
  const filteredPapers = papers.filter((paper) => {
    const matchesExam = examTypeFilter === 'all' || paper.examType === examTypeFilter;
    const matchesYear = yearFilter === 'all' || paper.year === yearFilter;
    return matchesExam && matchesYear;
  }).sort((a, b) => {
    if (sortBy === 'latest') return Number(b.year) - Number(a.year);
    if (sortBy === 'popular') return b.downloads - a.downloads;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="py-8">
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Exam Type Segmented Control */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setExamTypeFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              examTypeFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Papers ({papers.length})
          </button>
          <button
            onClick={() => setExamTypeFilter('mid')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              examTypeFilter === 'mid' ? 'bg-amber-500 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mid-Term (30M)
          </button>
          <button
            onClick={() => setExamTypeFilter('end')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              examTypeFilter === 'end' ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            End-Term (50M)
          </button>
        </div>

        {/* Secondary filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Year selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Year:</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="latest">Latest Year</option>
              <option value="popular">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No question papers found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try switching the department, semester, or search criteria to see other available papers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => {
            const isSaved = savedPaperIds.includes(paper.id);
            const isMid = paper.examType === 'mid';

            return (
              <div
                key={paper.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md uppercase tracking-wider border ${
                        isMid 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {isMid ? 'Mid-Term' : 'End-Term'} {paper.year}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        Sem {paper.semester}
                      </span>
                      {paper.attachedFile && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                          📎 File Attached
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleSavePaper(paper.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save paper'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {paper.subject}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {paper.code}
                    </span>
                    <span className="text-xs text-slate-500">
                      {paper.deptName}
                    </span>
                  </div>

                  {/* Paper Details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{paper.timeAllowed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">Max Marks:</span>
                      <span className="font-bold text-indigo-600">{paper.maxMarks}</span>
                    </div>
                  </div>

                  {/* Questions Preview snippet */}
                  <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] text-slate-600">
                    <div className="font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Includes {paper.questions.length} Questions:</span>
                      <span className="text-[10px] text-indigo-600 font-semibold">With Unit Breakdown</span>
                    </div>
                    <p className="line-clamp-2 text-slate-500 italic">
                      "{paper.questions[0]?.text}"
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1" title="Downloads">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>{paper.downloads}</span>
                    </span>
                    <span className="flex items-center gap-1" title="Rating">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span className="font-bold text-slate-700">{paper.rating}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDownloadPaper(paper)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-white transition-all"
                      title="Download Paper PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenPaper(paper)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs shadow-indigo-200 transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Paper</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
