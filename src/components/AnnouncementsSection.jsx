import React, { useState } from 'react';
import { 
  Megaphone, 
  PlusCircle, 
  Pin, 
  MessageCircle, 
  ThumbsUp, 
  Flame, 
  Heart, 
  AlertCircle, 
  Search, 
  Filter, 
  Send, 
  Sparkles, 
  Calendar, 
  User, 
  X,
  Share2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AnnouncementsSection({
  announcements,
  onAddAnnouncement,
  onReactAnnouncement,
  onAddComment,
  currentUser,
  userReactions = {}
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState({ 'ann-1': true });
  const [commentInputs, setCommentInputs] = useState({});

  // New announcement form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Exams');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const categories = ['all', 'Exams', 'Academics', 'Hackathon & Events', 'Campus Notice'];

  const filtered = announcements.filter((ann) => {
    if (filterCategory !== 'all' && ann.category !== filterCategory) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      ann.title.toLowerCase().includes(q) ||
      ann.content.toLowerCase().includes(q) ||
      ann.category.toLowerCase().includes(q) ||
      ann.author.toLowerCase().includes(q)
    );
  });

  const toggleComments = (annId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [annId]: !prev[annId]
    }));
  };

  const handleReactionClick = (annId, reactionType) => {
    onReactAnnouncement(annId, reactionType);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const handlePostComment = (annId) => {
    const text = commentInputs[annId]?.trim();
    if (!text) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: `${currentUser?.name || 'NITH Student'} (${currentUser?.rollNo || '23BCS045'})`,
      date: 'Just now',
      text
    };

    onAddComment(annId, newComment);
    setCommentInputs((prev) => ({ ...prev, [annId]: '' }));
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    let badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
    if (category === 'Exams') badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
    if (category === 'Academics') badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
    if (category === 'Hackathon & Events') badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (category === 'Campus Notice') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';

    const newAnn = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      category,
      badgeColor,
      isPinned,
      author: `${currentUser?.name || 'Student Contributor'} (${currentUser?.rollNo || '23BCS045'})`,
      date: 'Just now',
      content: content.trim(),
      reactions: {
        helpful: 1,
        fire: 0,
        important: isPinned ? 1 : 0,
        heart: 0
      },
      comments: []
    };

    onAddAnnouncement(newAnn);
    setIsPostModalOpen(false);
    setTitle('');
    setContent('');
    setIsPinned(false);
    confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <section className="py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-orange-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-rose-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Megaphone className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              <span>General Campus Notice Board</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              General Announcements
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Official date sheets, class test reschedules, hackathon registrations, and campus updates. Anyone can publish notices, react, and interact!
            </p>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 active:scale-95 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post an Announcement</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  filterCategory === cat
                    ? 'bg-white text-rose-900 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Notices' : cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-rose-200 font-semibold">
            {filtered.length} Announcements Live
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search announcements by keywords, dates, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 shrink-0"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Notice</span>
        </button>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No announcements found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Be the first to post a notice for NIT Hamirpur students!
            </p>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
            >
              Post an Announcement
            </button>
          </div>
        ) : (
          filtered.map((ann) => {
            const isCommentsOpen = Boolean(expandedComments[ann.id]);
            const userReactedMap = userReactions[ann.id] || {};

            return (
              <div
                key={ann.id}
                className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                  ann.isPinned
                    ? 'border-rose-300 ring-2 ring-rose-200/50 bg-rose-50/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Announcement Card Header */}
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {ann.isPinned && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white flex items-center gap-1 shadow-xs">
                          <Pin className="w-3 h-3 fill-white" />
                          <span>Pinned Notice</span>
                        </span>
                      )}

                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${ann.badgeColor}`}>
                        {ann.category}
                      </span>

                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{ann.date}</span>
                      </span>
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      Author: <b className="text-slate-700">{ann.author}</b>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug my-2">
                    {ann.title}
                  </h3>

                  {/* Content Body */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line mt-2">
                    {ann.content}
                  </p>

                  {/* Reactions & Interaction Toolbar */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {/* Reactions buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">React:</span>
                      
                      {/* Helpful */}
                      <button
                        onClick={() => handleReactionClick(ann.id, 'helpful')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                          userReactedMap.helpful
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200'
                        }`}
                        title="Helpful / Thumbs up"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>👍 {ann.reactions?.helpful || 0}</span>
                      </button>

                      {/* Fire / Urgent */}
                      <button
                        onClick={() => handleReactionClick(ann.id, 'fire')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                          userReactedMap.fire
                            ? 'bg-orange-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200'
                        }`}
                        title="Fire / High Priority"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>🔥 {ann.reactions?.fire || 0}</span>
                      </button>

                      {/* Important */}
                      <button
                        onClick={() => handleReactionClick(ann.id, 'important')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                          userReactedMap.important
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200'
                        }`}
                        title="Important Notice"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>📌 {ann.reactions?.important || 0}</span>
                      </button>

                      {/* Heart / Appreciate */}
                      <button
                        onClick={() => handleReactionClick(ann.id, 'heart')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                          userReactedMap.heart
                            ? 'bg-pink-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-200'
                        }`}
                        title="Heart / Appreciate"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>❤️ {ann.reactions?.heart || 0}</span>
                      </button>
                    </div>

                    {/* Comments Toggle */}
                    <button
                      onClick={() => toggleComments(ann.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{ann.comments?.length || 0} Discussions</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible Discussion / Comments Area */}
                {isCommentsOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/80 p-5 space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                        Student Responses ({ann.comments?.length || 0}):
                      </span>
                    </div>

                    {/* Existing comments */}
                    {ann.comments?.length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-white p-3 rounded-xl border border-dashed border-slate-200 text-center">
                        No responses yet. Have a question or query regarding this announcement? Ask below!
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {ann.comments.map((c) => (
                          <div
                            key={c.id}
                            className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-900">{c.author}</span>
                              <span className="text-[10px] text-slate-400">{c.date}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed font-sans">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add response form */}
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply or question about this notice..."
                        value={commentInputs[ann.id] || ''}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [ann.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handlePostComment(ann.id);
                        }}
                        className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                      />
                      <button
                        onClick={() => handlePostComment(ann.id)}
                        disabled={!commentInputs[ann.id]?.trim()}
                        className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white shadow-xs transition-all"
                        title="Send Reply"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Post Announcement Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-gradient-to-r from-rose-900 via-orange-950 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-base">Post Campus Announcement</h3>
              </div>
              <button onClick={() => setIsPostModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EC-212 Mid-Term Practical Exam Schedule"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="Exams">Exams</option>
                    <option value="Academics">Academics</option>
                    <option value="Hackathon & Events">Hackathon & Events</option>
                    <option value="Campus Notice">Campus Notice</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-rose-700">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>Pin this notice to top 📌</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Details & Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide all relevant information: dates, venues, guidelines, links..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-500">
                Posting as: <b className="text-slate-800">{currentUser?.name || 'NITH Student'} ({currentUser?.rollNo || '23BCS045'})</b>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
