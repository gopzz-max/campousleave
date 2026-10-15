import React, { useState } from 'react';
import { Role } from '../types';
import { 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  FileCheck, 
  Clock, 
  QrCode, 
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Lock,
  Building
} from 'lucide-react';

interface HomePortalProps {
  onSelectRole: (role: Role) => void;
  onOpenPhpFiles: () => void;
  onOpenGuide: () => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  onSelectRole,
  onOpenPhpFiles,
  onOpenGuide,
}) => {
  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Information Technology Department Project • Ready for XAMPP</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Online Student Leave &amp; On-Duty Management System
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
            A comprehensive, paperless campus portal for students to apply for medical, casual, and event leaves with digital mentor approvals, certificate verification, and official gate passes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelectRole('student')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <span>Launch Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPhpFiles}
              className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition flex items-center gap-2"
            >
              <span>Explore PHP &amp; MySQL Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Portal Cards: Student, Faculty, Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Student Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Portal 01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Student Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Apply for casual, medical, and on-duty (OD) leaves. Upload doctor prescription certificates, track live approval status, and print QR gate passes.
            </p>

            <ul className="space-y-2 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Real-time leave balance tracker</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Medical certificate PDF/image upload</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Official printable campus exit slip</span>
              </li>
            </ul>
          </div>

          <div>
            <button
              onClick={() => onSelectRole('student')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <span>Login as Student (Demo: 26IT104)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Faculty / HOD Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Portal 02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Faculty &amp; HOD Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Review student applications from your class, inspect uploaded medical prescriptions, check attendance standing, and approve or reject with custom feedback.
            </p>

            <ul className="space-y-2 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>1-Click digital review &amp; remarks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Medical attachment inspection modal</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Department student attendance context</span>
              </li>
            </ul>
          </div>

          <div>
            <button
              onClick={() => onSelectRole('faculty')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <span>Login as Faculty (Demo: FAC104)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">Portal 03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Admin / Principal Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Institution-wide administrative control, master leave register, attendance analytics, student and faculty directory, and exportable reports.
            </p>

            <ul className="space-y-2 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>College-wide master database log</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Export reports to Excel / CSV</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Audit trail of all approvals &amp; rejections</span>
              </li>
            </ul>
          </div>

          <div>
            <button
              onClick={() => onSelectRole('admin')}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <span>Login as Admin (Demo: ADMIN01)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Feature Highlights Grid */}
      <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl font-bold text-slate-900">Key Technical Features Implemented</h2>
          <p className="text-xs text-slate-500 mt-1">Built according to first-year university syllabus requirements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <UploadCloud className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-bold text-xs text-slate-900">Secure File Uploads</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports PDF, PNG, and JPG doctor certificates uploaded to <code>/uploads/</code>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <Lock className="w-6 h-6 text-emerald-600 mb-2" />
            <h4 className="font-bold text-xs text-slate-900">PHP Session Security</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Role-based session authorization prevents students from accessing faculty pages.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <QrCode className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-bold text-xs text-slate-900">Digital Gate Pass</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Automated printable slip with QR code and verification token for college security.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <Building className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="font-bold text-xs text-slate-900">MySQL Foreign Keys</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Normalized database structure linking users, departments, and leave applications.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
