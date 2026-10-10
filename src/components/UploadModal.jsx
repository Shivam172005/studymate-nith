import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  Paperclip, 
  Trash2, 
  Eye, 
  FileCheck,
  FileSpreadsheet,
  Image as ImageIcon
} from 'lucide-react';
import { DEPARTMENTS, SEMESTERS } from '../data/nithData';
import confetti from 'canvas-confetti';

export default function UploadModal({ isOpen, onClose, onAddPaper }) {
  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    dept: 'cse',
    semester: '3',
    examType: 'mid',
    year: '2024',
    maxMarks: '30',
    timeAllowed: '2 Hours',
    uploadedBy: '',
    sampleQuestion: ''
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Generate object URL for immediate browser viewing & downloading
    const fileUrl = URL.createObjectURL(file);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeStr = file.size > 1024 * 1024 
      ? `${sizeInMB} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    setAttachedFile({
      name: file.name,
      size: sizeStr,
      type: file.type,
      rawFile: file,
      url: fileUrl,
      isPdf: file.type === 'application/pdf' || file.name.endsWith('.pdf'),
      isImage: file.type.startsWith('image/')
    });

    // Auto-fill subject / code if filename suggests it
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    if (!formData.subject && cleanName.length > 2) {
      const parts = cleanName.split(/[-_ ]+/);
      if (parts.length > 1) {
        setFormData((prev) => ({
          ...prev,
          code: prev.code || parts[0].toUpperCase(),
          subject: prev.subject || parts.slice(1).join(' ')
        }));
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    if (attachedFile?.url) {
      URL.revokeObjectURL(attachedFile.url);
    }
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.code) return;

    const deptObj = DEPARTMENTS.find((d) => d.id === formData.dept);

    const newPaper = {
      id: `custom-${Date.now()}`,
      subject: formData.subject,
      code: formData.code.toUpperCase(),
      dept: formData.dept,
      deptName: deptObj ? deptObj.name : 'Engineering',
      semester: formData.semester,
      examType: formData.examType,
      year: formData.year,
      maxMarks: Number(formData.maxMarks) || (formData.examType === 'mid' ? 30 : 50),
      timeAllowed: formData.timeAllowed,
      uploadedBy: formData.uploadedBy || 'NITH Peer Contributor',
      downloads: 1,
      views: 12,
      rating: 5.0,
      attachedFile: attachedFile ? {
        name: attachedFile.name,
        size: attachedFile.size,
        type: attachedFile.type,
        url: attachedFile.url,
        isPdf: attachedFile.isPdf,
        isImage: attachedFile.isImage
      } : null,
      questions: [
        {
          id: `q-cust-1`,
          qNum: 'Q1',
          marks: formData.examType === 'mid' ? 10 : 15,
          text: formData.sampleQuestion || 'Complete syllabus questions as contained in the attached paper document.',
          unit: 'Unit 1: Fundamentals',
          solution: {
            summary: 'Refer to textbook derivations and standard formulas according to NITH course scheme.',
            steps: ['Review step 1 of theorem', 'Substitute boundary values', 'Compute final answer']
          }
        },
        {
          id: `q-cust-2`,
          qNum: 'Q2',
          marks: formData.examType === 'mid' ? 20 : 35,
          text: 'Numerical and analytical design questions from the syllabus.',
          unit: 'Unit 2: Applications',
          solution: {
            summary: 'Apply numerical solution methods and graph diagrams.',
            steps: ['Draw schematic layout', 'Calculate efficiency & output']
          }
        }
      ]
    };

    onAddPaper(newPaper);
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Attach & Upload Question Paper</h3>
              <p className="text-[11px] text-indigo-200">Connect files directly from your laptop storage</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Paper & File Uploaded Successfully!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your attached paper from your laptop storage is now accessible and viewable in Study Mate NIT Hamirpur.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
            
            {/* Direct Laptop File Picker / Drag & Drop Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
                  Attach File from Laptop (PDF, Image, Scans)
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Direct Laptop Storage Access</span>
              </label>

              {/* Hidden HTML5 File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {!attachedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-50/80 scale-[1.01]'
                      : 'border-slate-300 bg-slate-50 hover:bg-indigo-50/40 hover:border-indigo-400'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Click to Browse Laptop Storage or Drag & Drop
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Supports PDF Question Papers, Camera Scans, JPG, PNG & Documents
                    </p>
                  </div>
                  <span className="inline-block mt-1 px-3 py-1 rounded-md text-[10px] font-bold bg-white text-indigo-700 border border-slate-200 shadow-2xs">
                    Select File from PC / Laptop
                  </span>
                </div>
              ) : (
                <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      {attachedFile.isPdf ? (
                        <FileText className="w-5 h-5 text-rose-200" />
                      ) : attachedFile.isImage ? (
                        <ImageIcon className="w-5 h-5 text-emerald-200" />
                      ) : (
                        <FileCheck className="w-5 h-5 text-indigo-200" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {attachedFile.name}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-indigo-700">{attachedFile.size}</span>
                        <span>•</span>
                        <span>Ready to view & download</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={attachedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 text-xs flex items-center gap-1 font-semibold"
                      title="Preview in new tab"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Preview</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 text-xs"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Subject and Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Networks"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS-312"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Department, Semester & Exam Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={formData.dept}
                  onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none"
                >
                  {DEPARTMENTS.filter(d => d.id !== 'all').map((d) => (
                    <option key={d.id} value={d.id}>{d.short}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none"
                >
                  {SEMESTERS.filter(s => s.id !== 'all').map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Type</label>
                <select
                  value={formData.examType}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    examType: e.target.value,
                    maxMarks: e.target.value === 'mid' ? '30' : '50'
                  })}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none"
                >
                  <option value="mid">Mid-Term (30M)</option>
                  <option value="end">End-Term (50M)</option>
                </select>
              </div>
            </div>

            {/* Exam Year & Contributor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 focus:outline-none"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Roll No</label>
                <input
                  type="text"
                  placeholder="e.g. Sahil (23BCS015)"
                  value={formData.uploadedBy}
                  onChange={(e) => setFormData({ ...formData, uploadedBy: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Questions preview note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Key Topics / Highlight Question (Optional)</label>
              <textarea
                rows={2}
                placeholder="Optional notes or important questions in this paper..."
                value={formData.sampleQuestion}
                onChange={(e) => setFormData({ ...formData, sampleQuestion: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Publish Paper</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
