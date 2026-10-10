import React, { useState } from 'react';
import { X, GraduationCap, User, Hash, Calendar, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS, SEMESTERS } from '../data/nithData';

export default function LoginModal({ isOpen, onClose, currentUser, onSaveUser }) {
  const [name, setName] = useState(currentUser?.name || '');
  const [rollNo, setRollNo] = useState(currentUser?.rollNo || '');
  const [dept, setDept] = useState(currentUser?.dept || 'cse');
  const [year, setYear] = useState(currentUser?.year || '2nd Year');
  const [semester, setSemester] = useState(currentUser?.semester || '3');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !rollNo.trim()) return;

    onSaveUser({
      name: name.trim(),
      rollNo: rollNo.trim().toUpperCase(),
      dept,
      year,
      semester
    });
    onClose();
  };

  const handleFillDemo = () => {
    setName('Shivam Sharma');
    setRollNo('23BCS045');
    setDept('cse');
    setYear('2nd Year');
    setSemester('3');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Student Login & Profile</h3>
              <p className="text-xs text-indigo-200">Study Mate NIT Hamirpur</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Personalize your exam portal:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Demo NITH Student</span>
            </button>
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shivam Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-indigo-600" />
              Roll Number (NITH) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 23BCS045"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 uppercase"
            />
          </div>

          {/* Branch / Department */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Department / Branch
            </label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
            >
              {DEPARTMENTS.filter(d => d.id !== 'all').map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.short})</option>
              ))}
            </select>
          </div>

          {/* Year & Semester Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Current Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
              >
                {SEMESTERS.filter(s => s.id !== 'all').map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Enter Portal</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
