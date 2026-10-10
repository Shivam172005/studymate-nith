import React from 'react';
import { 
  Trophy, 
  Award, 
  Flame, 
  Star, 
  Clock, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  User, 
  Sparkles,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

export default function LeaderboardSection({
  leaderboardData,
  currentUser,
  userExp = 420
}) {
  // Compute user level based on EXP
  const userLevel = Math.floor(userExp / 150) + 1;
  const nextLevelExp = userLevel * 150;
  const currentLevelBase = (userLevel - 1) * 150;
  const progressInLevel = Math.round(((userExp - currentLevelBase) / 150) * 100);

  return (
    <section className="py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-yellow-950 via-amber-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-amber-700/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>NIT Hamirpur Academic Hall of Fame</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Weekly Scholar Leaderboard
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Earn EXP by helping peers, solving exam doubts, rating quality solutions, and revising high-yield topics. Top 10 scholars receive academic badges and peer mentoring honors!
            </p>
          </div>

          {/* Weekly Reset Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center gap-3 text-xs shrink-0">
            <Clock className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <div>
              <div className="font-bold text-white text-xs">Refreshes Weekly</div>
              <div className="text-amber-300 text-[11px] font-semibold">Every Sunday Midnight ⏳</div>
            </div>
          </div>
        </div>

        {/* Current Student's EXP & Rank Highlight Card */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center">
              L{userLevel}
            </div>
            <div>
              <div className="text-xs text-slate-300">Your Current Rank & Tier</div>
              <div className="text-sm font-bold text-white">Level {userLevel} Scholar</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Your Total EXP:</span>
              <span className="font-bold text-amber-300">{userExp} EXP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressInLevel}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {nextLevelExp - userExp} EXP to Level {userLevel + 1}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-300">Active Student</div>
              <div className="text-sm font-bold text-white truncate">{currentUser?.name || 'Shivam Sharma'}</div>
              <div className="text-[10px] text-amber-300 font-mono">{currentUser?.rollNo || '23BCS045'}</div>
            </div>
            <span className="text-xs font-bold bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-400/30">
              Rank #12
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Top 10 Table */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Top 10 NITH Scholars This Week</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Ranked by Total EXP</span>
          </div>

          <div className="space-y-2.5">
            {leaderboardData.map((student) => {
              const isTop3 = student.rank <= 3;
              const medalIcon = student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : null;

              return (
                <div
                  key={student.rank}
                  className={`bg-white rounded-2xl border p-4 shadow-xs transition-all flex items-center justify-between gap-4 ${
                    student.rank === 1
                      ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-200'
                      : student.rank === 2
                      ? 'border-slate-300 bg-slate-50/30'
                      : student.rank === 3
                      ? 'border-orange-200 bg-orange-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Left: Rank & Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs bg-slate-100 text-slate-800">
                      {medalIcon || `#${student.rank}`}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {student.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          ({student.rollNo})
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{student.branch}</span>
                        <span>•</span>
                        <span>{student.year}</span>
                      </div>

                      <div className="mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-200/80">
                        {student.badge}
                      </div>
                    </div>
                  </div>

                  {/* Right: EXP & Stats */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-indigo-700">
                      {student.exp} <span className="text-xs font-bold text-slate-500">EXP</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {student.questionsAnswered} Solved • {student.upvotesReceived} Upvotes
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: How to Earn EXP Rules */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>How to Earn EXP on Peerly:</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Answer a Peer Query</div>
                  <div className="text-[10px] text-slate-500">Post verified solution in Community</div>
                </div>
                <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+30 EXP</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Answer Upvoted Helpful</div>
                  <div className="text-[10px] text-slate-500">Peer gives positive rating</div>
                </div>
                <span className="font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">+20 EXP</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Ask an Exam Doubt</div>
                  <div className="text-[10px] text-slate-500">Post new question in Community</div>
                </div>
                <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">+15 EXP</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Mark Suggested Topic Revised</div>
                  <div className="text-[10px] text-slate-500">Complete hitlist topic</div>
                </div>
                <span className="font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded">+10 EXP</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Master a Flashcard</div>
                  <div className="text-[10px] text-slate-500">Click "Got It!" on cram card</div>
                </div>
                <span className="font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded">+5 EXP</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed font-medium">
              💡 <b>Weekly Reset Policy:</b> Every Sunday midnight, the EXP cycle resets to give all students a fair chance to claim the Top 10 badges!
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
