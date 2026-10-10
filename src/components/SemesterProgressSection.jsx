import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  Zap, 
  Sparkles,
  ArrowRight,
  Flame,
  Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SemesterProgressSection({
  user,
  curriculum,
  onToggleUnit,
  onNavigateTab,
  masteredPyqsCount,
  mistakesCount,
  resolvedMistakesCount
}) {
  const currentSem = user?.semester || '3';
  const currentDept = user?.dept || 'cse';

  // Get subjects for this semester & department
  const deptCurriculum = curriculum[currentSem]?.[currentDept] || curriculum['3']?.['cse'] || [];

  // Calculate total units and completed units
  let totalUnits = 0;
  let completedUnits = 0;

  deptCurriculum.forEach((sub) => {
    sub.units.forEach((u) => {
      totalUnits++;
      if (u.completed) completedUnits++;
    });
  });

  const overallPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  const handleUnitClick = (subjectId, unitId, currentStatus) => {
    onToggleUnit(subjectId, unitId);
    if (!currentStatus) {
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <section className="py-8">
      {/* Top Banner / Student Greeting & Overall Readiness */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-indigo-800/80 relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>NITH Student Progress Dashboard</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {user?.name ? `${user.name}'s Preparation Tracker` : 'Semester Preparation Tracker'}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg">
                Roll No: {user?.rollNo || '23BCS045'}
              </span>
              <span>•</span>
              <span className="font-semibold text-indigo-300">
                Semester {currentSem} ({user?.year || '2nd Year'})
              </span>
              <span>•</span>
              <span className="text-slate-300 uppercase font-semibold">
                {currentDept.toUpperCase()} Department
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Track your syllabus units, review frequently tested exam concepts, and monitor your readiness for the upcoming Mid-Term & End-Term exams.
            </p>
          </div>

          {/* Overall Readiness Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 min-w-[280px]">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Circular Gauge simulation */}
              <div className="text-center">
                <span className="text-2xl font-black text-indigo-300">{overallPercent}%</span>
                <span className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider">Ready</span>
              </div>
            </div>

            <div className="space-y-2 text-xs w-full sm:w-auto">
              <div className="flex items-center justify-between gap-3 text-slate-200">
                <span>Units Prepared:</span>
                <span className="font-bold text-white">{completedUnits} / {totalUnits}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-200">
                <span>Mastered PYQs:</span>
                <span className="font-bold text-rose-300">{masteredPyqsCount}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-200">
                <span>Mistakes Resolved:</span>
                <span className="font-bold text-emerald-300">{resolvedMistakesCount} / {mistakesCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick summary stats pills */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Total Subjects</div>
            <div className="text-lg font-black text-white">{deptCurriculum.length} Subjects</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Syllabus Completion</div>
            <div className="text-lg font-black text-indigo-300">{overallPercent}% Done</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Exam Mode</div>
            <div className="text-lg font-black text-amber-300">Mid-Term Prep</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-400">Action Needed</div>
            <div className="text-lg font-black text-rose-300">{totalUnits - completedUnits} Units Left</div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Progress Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Current Semester Subjects & Unit Checklist</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any unit to toggle completion. Watch your exam readiness grow!
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Semester {currentSem}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deptCurriculum.map((subject) => {
            const subCompleted = subject.units.filter((u) => u.completed).length;
            const subPercent = Math.round((subCompleted / subject.units.length) * 100);

            return (
              <div
                key={subject.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Subject Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {subject.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {subject.credits} Credits
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {subject.name}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-black ${
                        subPercent === 100 ? 'text-emerald-600' : subPercent >= 60 ? 'text-indigo-600' : 'text-amber-600'
                      }`}>
                        {subPercent}%
                      </span>
                      <span className="block text-[10px] text-slate-400 font-semibold">
                        {subCompleted}/{subject.units.length} Units
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        subPercent === 100 
                          ? 'bg-emerald-500' 
                          : subPercent >= 60 
                          ? 'bg-indigo-600' 
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${subPercent}%` }}
                    ></div>
                  </div>

                  {/* Unit Checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Syllabus Units (Click to Check):
                    </span>
                    {subject.units.map((unit) => (
                      <div
                        key={unit.id}
                        onClick={() => handleUnitClick(subject.id, unit.id, unit.completed)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          unit.completed
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-semibold'
                            : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {unit.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span className={unit.completed ? 'line-through text-slate-500' : ''}>
                            {unit.name}
                          </span>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          unit.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200/60 text-slate-500'
                        }`}>
                          {unit.completed ? 'Done' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onNavigateTab('papers')}
                    className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                  >
                    <span>View PYQ Papers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigateTab('repeated')}
                    className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Repeated PYQs</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
