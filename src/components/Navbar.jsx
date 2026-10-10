import React from 'react';
import { 
  GraduationCap, 
  Search, 
  UploadCloud, 
  Bookmark, 
  Flame, 
  Target, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  User, 
  Users, 
  Megaphone, 
  Sparkles,
  Trophy,
  Briefcase,
  Zap,
  BookOpen
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  openUploadModal, 
  openBookmarksDrawer, 
  openLoginModal, 
  currentUser, 
  userExp = 420,
  savedCount, 
  masteredCount, 
  questionBookmarksCount, 
  mistakesCount 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand (Peerly) */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('papers')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-800 bg-clip-text text-transparent">
                  Peerly
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                  NIT Hamirpur
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Exam Papers, Flashcards & Peer Mentorship</p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto max-w-[58vw]">
            <button
              onClick={() => setActiveTab('papers')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'papers'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Papers</span>
            </button>

            <button
              onClick={() => setActiveTab('repeated')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'repeated'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Repeated</span>
            </button>

            <button
              onClick={() => setActiveTab('expected')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'expected'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Expected</span>
            </button>

            {/* Suggested Topics Tab */}
            <button
              onClick={() => setActiveTab('suggested')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'suggested'
                  ? 'bg-white text-amber-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Suggested Topics</span>
            </button>

            {/* Flashcards Tab */}
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'flashcards'
                  ? 'bg-white text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Flashcards</span>
            </button>

            {/* Leaderboard Tab */}
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-amber-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Leaderboard</span>
            </button>

            {/* Alumni Mentorship Tab */}
            <button
              onClick={() => setActiveTab('alumni')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'alumni'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-teal-600" />
              <span>Alumni</span>
            </button>

            {/* Community Q&A Tab */}
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'community'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Community</span>
            </button>

            {/* Announcements Tab */}
            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'announcements'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5 text-rose-600" />
              <span>Announcements</span>
            </button>

            {/* My Progress Tab */}
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'progress'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Progress</span>
            </button>

            {/* Bookmarks Tab */}
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'bookmarks'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>Bookmarks</span>
              {questionBookmarksCount > 0 && (
                <span className="px-1 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                  {questionBookmarksCount}
                </span>
              )}
            </button>

            {/* Mistakes Journal Tab */}
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'mistakes'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Mistakes</span>
              {mistakesCount > 0 && (
                <span className="px-1 py-0.2 rounded-full text-[10px] bg-rose-100 text-rose-700 font-bold">
                  {mistakesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            
            {/* Student EXP Badge */}
            <div 
              onClick={() => setActiveTab('leaderboard')}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-black cursor-pointer shadow-2xs transition-all"
              title="Click to view Scholar Leaderboard"
            >
              <span>⭐</span>
              <span>{userExp} EXP</span>
              <span className="text-[10px] text-amber-700 font-bold">L{Math.floor(userExp / 150) + 1}</span>
            </div>

            {/* Student Login / Profile Pill */}
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-xs text-slate-700 transition-all cursor-pointer"
              title="Click to view/edit student profile"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser?.name ? currentUser.name[0].toUpperCase() : 'S'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-[11px] leading-tight text-slate-900 line-clamp-1">
                  {currentUser?.name || 'Login / Profile'}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {currentUser?.rollNo ? `${currentUser.rollNo} (Sem ${currentUser.semester})` : 'NIT Hamirpur'}
                </div>
              </div>
            </button>

            {/* Quick Saved Papers Drawer */}
            <button
              onClick={openBookmarksDrawer}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1"
              title="Saved Papers"
            >
              <Bookmark className="w-4 h-4 text-slate-700" />
              {savedCount > 0 && (
                <span className="flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold rounded-full bg-indigo-600 text-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Upload Paper Button */}
            <button
              onClick={openUploadModal}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-200 transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden md:inline">Contribute</span>
            </button>

          </div>

        </div>

        {/* Scrollable Tabs for Tablets & Mobile */}
        <div className="flex xl:hidden items-center gap-1.5 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('papers')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'papers' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Papers
          </button>
          <button
            onClick={() => setActiveTab('repeated')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'repeated' ? 'bg-rose-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Repeated
          </button>
          <button
            onClick={() => setActiveTab('expected')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'expected' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Target className="w-3.5 h-3.5" /> Expected
          </button>
          <button
            onClick={() => setActiveTab('suggested')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'suggested' ? 'bg-amber-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Suggested
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'flashcards' ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Flashcards
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'leaderboard' ? 'bg-amber-700 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('alumni')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'alumni' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Alumni
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'community' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Community
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'announcements' ? 'bg-rose-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" /> Notices
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'progress' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Progress
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'bookmarks' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Bookmarks
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'mistakes' ? 'bg-rose-600 text-white font-bold' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Mistakes
          </button>
        </div>

      </div>
    </header>
  );
}
