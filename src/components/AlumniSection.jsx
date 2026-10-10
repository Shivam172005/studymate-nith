import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  GraduationCap, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  HelpCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AlumniSection({
  alumniList,
  onAddAlumniQuestion,
  currentUser
}) {
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [questionInputs, setQuestionInputs] = useState({});

  const companies = ['all', 'Google', 'Microsoft', 'Texas Instruments', 'Amazon'];

  const filtered = alumniList.filter((alum) => {
    if (selectedCompany !== 'all' && alum.company !== selectedCompany) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      alum.name.toLowerCase().includes(q) ||
      alum.company.toLowerCase().includes(q) ||
      alum.role.toLowerCase().includes(q) ||
      alum.branch.toLowerCase().includes(q)
    );
  });

  const handlePostQuery = (alumId) => {
    const text = questionInputs[alumId]?.trim();
    if (!text) return;

    const newQna = {
      id: `qna-${Date.now()}`,
      student: `${currentUser?.name || 'NITH Student'} (${currentUser?.rollNo || '23BCS045'})`,
      question: text,
      reply: 'Thanks for asking! Akash / the alumni mentor has been notified and will post their detailed advice here shortly.'
    };

    onAddAlumniQuestion(alumId, newQna);
    setQuestionInputs((prev) => ({ ...prev, [alumId]: '' }));
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.75 } });
  };

  return (
    <section className="py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-teal-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
              <span>NITH Alumni Mentorship & Career Guidance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Alumni Connect & Placement Insights
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Connect directly with passed out NIT Hamirpur seniors working at top tech & core giants. Get authentic placement interview blueprints, resume advice, and internship guidance.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center gap-4 text-xs">
            <div>
              <div className="text-2xl font-black text-teal-300">500+</div>
              <div className="text-slate-300 text-[11px]">NITH Alumni Network</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-2xl font-black text-emerald-300">100%</div>
              <div className="text-slate-300 text-[11px]">Direct Senior Guidance</div>
            </div>
          </div>
        </div>

        {/* Company filter pills */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
          {companies.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCompany(c)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedCompany === c
                  ? 'bg-teal-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              {c === 'all' ? 'All Companies' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alumni by name, company, role, or branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <b className="text-slate-800">{filtered.length}</b> Alumni Mentors
        </div>
      </div>

      {/* Alumni Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((alum) => (
          <div
            key={alum.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all p-6 flex flex-col justify-between"
          >
            <div>
              {/* Alumni Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-teal-200">
                    {alum.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{alum.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </h3>
                    <div className="text-xs text-slate-500 font-medium">
                      {alum.branch} • {alum.batch}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md text-xs font-black bg-teal-50 text-teal-800 border border-teal-200">
                  {alum.company}
                </span>
              </div>

              {/* Role & Location */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 mb-4">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                  <span>{alum.role}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{alum.location}</span>
                </div>
              </div>

              {/* Senior's Core Placement Advice */}
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 mb-5 leading-relaxed font-sans">
                <div className="font-extrabold text-teal-800 mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Placement & Internship Blueprint:</span>
                </div>
                <p className="font-medium">"{alum.advice}"</p>
              </div>

              {/* Q&A Thread under this Alumni */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Student Q&A & Interview Queries:</span>
                </h4>

                {alum.qna?.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="font-semibold text-slate-800">
                      <b className="text-indigo-600">Q ({q.student}):</b> "{q.question}"
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 leading-relaxed font-sans">
                      <b className="text-emerald-800 block mb-0.5">Ans ({alum.name}):</b>
                      {q.reply}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask Question Input */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Ask ${alum.name.split(' ')[0]} about referrals, tests, or prep...`}
                  value={questionInputs[alum.id] || ''}
                  onChange={(e) =>
                    setQuestionInputs({ ...questionInputs, [alum.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostQuery(alum.id);
                  }}
                  className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
                <button
                  onClick={() => handlePostQuery(alum.id)}
                  disabled={!questionInputs[alum.id]?.trim()}
                  className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white shadow-xs transition-all"
                  title="Ask Query"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
