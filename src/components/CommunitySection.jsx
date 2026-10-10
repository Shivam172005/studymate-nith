import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Award, 
  Star, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  TrendingUp, 
  X,
  BookOpen,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CommunitySection({
  discussions,
  onAddQuestion,
  onAddAnswer,
  onRateAnswer,
  currentUser,
  ratedAnswerIds = []
}) {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [expandedThreadId, setExpandedThreadId] = useState(discussions[0]?.id || null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  // New Answer Input state for each thread: { [threadId]: text }
  const [answerInputs, setAnswerInputs] = useState({});

  // Form states for Ask Question Modal
  const [newTitle, setNewTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newSubject, setNewSubject] = useState('Data Structures & Algorithms');
  const [newCode, setNewCode] = useState('CS-211');
  const [newDept, setNewDept] = useState(currentUser?.dept || 'cse');
  const [newSemester, setNewSemester] = useState(currentUser?.semester || '3');
  const [newTags, setNewTags] = useState('Mid-Term 2024, Concept');

  // Find all answers across discussions to identify "Highest Rated Review / Answers"
  const allAnswersWithQuestions = [];
  discussions.forEach((disc) => {
    disc.answers?.forEach((ans) => {
      allAnswersWithQuestions.push({
        ...ans,
        questionTitle: disc.title,
        questionSubject: disc.subject,
        questionCode: disc.code,
        threadId: disc.id
      });
    });
  });

  // Sort descending by upvotes / rating
  allAnswersWithQuestions.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  const highestRatedAnswer = allAnswersWithQuestions[0];
  const secondHighestRatedAnswer = allAnswersWithQuestions[1];

  // Filtered discussions
  const filteredDiscussions = discussions.filter((disc) => {
    if (filterDept !== 'all' && disc.dept !== filterDept) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      disc.title.toLowerCase().includes(q) ||
      disc.question.toLowerCase().includes(q) ||
      disc.subject.toLowerCase().includes(q) ||
      disc.code.toLowerCase().includes(q)
    );
  });

  const handleRate = (threadId, answerId) => {
    onRateAnswer(threadId, answerId);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handlePostAnswer = (threadId) => {
    const text = answerInputs[threadId]?.trim();
    if (!text) return;

    const newAns = {
      id: `ans-${Date.now()}`,
      author: `${currentUser?.name || 'NITH Student'} (${currentUser?.rollNo || '23BCS045'})`,
      authorRole: `${currentUser?.year || '2nd Year'} • Sem ${currentUser?.semester || '3'}`,
      date: 'Just now',
      upvotes: 1,
      rating: 5.0,
      isTopperVerified: false,
      content: text,
      commentsCount: 0
    };

    onAddAnswer(threadId, newAns);
    setAnswerInputs((prev) => ({ ...prev, [threadId]: '' }));
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    const tagList = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newDisc = {
      id: `disc-${Date.now()}`,
      title: newTitle.trim(),
      question: newQuestion.trim(),
      subject: newSubject,
      code: newCode.toUpperCase(),
      dept: newDept,
      semester: newSemester,
      author: `${currentUser?.name || 'Student'} (${currentUser?.rollNo || '23BCS045'})`,
      date: 'Just now',
      tags: tagList.length > 0 ? tagList : ['General', 'Exam Doubt'],
      answers: []
    };

    onAddQuestion(newDisc);
    setIsAskModalOpen(false);
    setNewTitle('');
    setNewQuestion('');
    setExpandedThreadId(newDisc.id);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <section className="py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-indigo-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>NIT Hamirpur Student Discussion Forum</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Study Mate Community & Peer Q&A
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ask doubts, share past question solutions, rate helpful peer explanations, and learn from top answers curated by NITH seniors & toppers.
            </p>
          </div>

          <button
            onClick={() => setIsAskModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ask a Question</span>
          </button>
        </div>

        {/* Quick metrics banner */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Total Discussions</div>
            <div className="text-lg font-black text-white">{discussions.length} Questions</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Peer Answers</div>
            <div className="text-lg font-black text-indigo-300">{allAnswersWithQuestions.length} Solutions</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Highest Rated Answer</div>
            <div className="text-lg font-black text-amber-300">{highestRatedAnswer?.upvotes || 0} Upvotes</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Community Trust</div>
            <div className="text-lg font-black text-emerald-300">100% Peer Verified</div>
          </div>
        </div>
      </div>

      {/* ⭐ REQUIRED SECTION: HIGHEST RATED REVIEW / ANSWERS ⭐ */}
      {highestRatedAnswer && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Highest Rated Review & Solution</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                    Hall of Fame 🏆
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  The most positively rated, topper-verified answer across the entire NIT Hamirpur student community.
                </p>
              </div>
            </div>
          </div>

          {/* Golden Spotlight Card */}
          <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 rounded-2xl border-2 border-amber-300 shadow-md p-6 relative overflow-hidden">
            {/* Background sparkle */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top metadata row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-black bg-amber-500 text-white shadow-xs flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>{highestRatedAnswer.upvotes} Positive Ratings</span>
                </span>

                <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {highestRatedAnswer.questionCode} • {highestRatedAnswer.questionSubject}
                </span>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NITH Topper Verified</span>
                </span>
              </div>

              <div className="text-xs text-slate-500">
                Posted {highestRatedAnswer.date}
              </div>
            </div>

            {/* Question Context */}
            <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200/80 mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block mb-1">
                Question Asked:
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                "{highestRatedAnswer.questionTitle}"
              </h4>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {highestRatedAnswer.author[0]}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{highestRatedAnswer.author}</span>
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {highestRatedAnswer.authorRole}
                </div>
              </div>
            </div>

            {/* Answer Content */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans shadow-2xs">
              {highestRatedAnswer.content}
            </div>

            {/* Rating Actions */}
            <div className="mt-4 pt-3 border-t border-amber-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRate(highestRatedAnswer.threadId, highestRatedAnswer.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    ratedAnswerIds.includes(highestRatedAnswer.id)
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{ratedAnswerIds.includes(highestRatedAnswer.id) ? 'Rated Helpful!' : 'Rate Answer Helpful (+1)'}</span>
                </button>

                <span className="text-xs text-slate-500 font-medium">
                  {highestRatedAnswer.upvotes} students found this helpful
                </span>
              </div>

              <button
                onClick={() => setExpandedThreadId(highestRatedAnswer.threadId)}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900"
              >
                View Full Discussion Thread →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Discussions Feed Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussion questions, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Department filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600">Branch:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
          >
            <option value="all">All Departments</option>
            <option value="cse">Computer Science (CSE)</option>
            <option value="ece">Electronics (ECE)</option>
            <option value="ee">Electrical (EE)</option>
            <option value="me">Mechanical (ME)</option>
          </select>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-5">
        {filteredDiscussions.map((disc) => {
          const isExpanded = expandedThreadId === disc.id;
          const currentAnswerText = answerInputs[disc.id] || '';

          return (
            <div
              key={disc.id}
              className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                isExpanded ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Thread Header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {disc.code}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {disc.subject}
                    </span>
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      Sem {disc.semester}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Asked by {disc.author} • {disc.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{disc.answers?.length || 0} Answers</span>
                    </span>
                  </div>
                </div>

                {/* Question Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug my-2">
                  {disc.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {disc.question}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {disc.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Toggle Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedThreadId(isExpanded ? null : disc.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Discussion' : `View ${disc.answers?.length || 0} Answers & Respond`}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setExpandedThreadId(disc.id)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Write an Answer
                  </button>
                </div>
              </div>

              {/* Collapsible Answers Feed & Answer Box */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50/70 p-5 space-y-4 animate-in fade-in duration-150">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Peer Answers ({disc.answers?.length || 0}):</span>
                  </h4>

                  {/* Answers list */}
                  {disc.answers?.length === 0 ? (
                    <div className="bg-white p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                      No answers yet. Be the first NITH peer to answer this question!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {disc.answers.map((ans) => {
                        const isRated = ratedAnswerIds.includes(ans.id);

                        return (
                          <div
                            key={ans.id}
                            className={`p-4 rounded-xl border bg-white transition-all shadow-2xs ${
                              ans.isTopperVerified ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                                  {ans.author[0]}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>{ans.author}</span>
                                    {ans.isTopperVerified && (
                                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-200">
                                        Topper Verified ⭐
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    {ans.authorRole} • {ans.date}
                                  </div>
                                </div>
                              </div>

                              {/* Rate Answer button */}
                              <button
                                onClick={() => handleRate(disc.id, ans.id)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                  isRated
                                    ? 'bg-amber-500 text-white shadow-2xs'
                                    : 'bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200'
                                }`}
                                title="Rate this answer as helpful"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>{ans.upvotes}</span>
                              </button>
                            </div>

                            {/* Content */}
                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line pl-1 font-sans">
                              {ans.content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Post an Answer Form */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Your Answer or Explanation:
                    </label>
                    <textarea
                      rows={3}
                      value={currentAnswerText}
                      onChange={(e) =>
                        setAnswerInputs({ ...answerInputs, [disc.id]: e.target.value })
                      }
                      placeholder="Type your explanation, formula derivation, or exam advice here..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Posting as: <b className="text-slate-700">{currentUser?.name || 'NITH Student'}</b>
                      </span>

                      <button
                        onClick={() => handlePostAnswer(disc.id)}
                        disabled={!currentAnswerText.trim()}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Answer</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ask a Question Modal */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Ask NITH Peers a Question</h3>
              </div>
              <button onClick={() => setIsAskModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Question Title / Topic *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to solve 0/1 knapsack using DP without table overflow?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Question / Doubt *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain what concept or exam question you are stuck on..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Dynamic Programming, Mid-Term 2024, Unit 5"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAskModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
