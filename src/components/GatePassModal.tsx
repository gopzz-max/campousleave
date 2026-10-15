import React from 'react';
import { LeaveApplication } from '../types';
import { X, Printer, CheckCircle2, QrCode, Shield, Calendar, User, FileText } from 'lucide-react';

interface GatePassModalProps {
  leave: LeaveApplication | null;
  onClose: () => void;
}

export const GatePassModal: React.FC<GatePassModalProps> = ({ leave, onClose }) => {
  if (!leave) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-sm">Official College Gate Pass / Leave Slip</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Area */}
        <div id="printable-gate-pass" className="p-6 bg-slate-50">
          <div className="bg-white p-6 rounded-xl border-2 border-dashed border-blue-300 shadow-sm relative">
            
            {/* Watermark / Verified Seal */}
            <div className="absolute top-5 right-5 flex flex-col items-center opacity-85">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-600 border-dashed flex items-center justify-center text-emerald-600 transform rotate-12 bg-emerald-50">
                <div className="text-[9px] font-black uppercase text-center leading-tight">
                  <CheckCircle2 className="w-4 h-4 mx-auto mb-0.5" />
                  VERIFIED<br/>APEX IT
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="border-b border-slate-200 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                College Security & Hostel Gate Clearance
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Apex Institute of Technology</h2>
              <p className="text-xs text-slate-500">Autonomous Institution • Approved by AICTE & Accredited by NBA</p>
              <div className="flex justify-between items-center mt-2 text-xs text-slate-600">
                <span>Pass No: <strong className="font-mono text-slate-900">{leave.id}</strong></span>
                <span>Issue Date: <strong className="text-slate-900">{leave.actionDate || leave.appliedAt}</strong></span>
              </div>
            </div>

            {/* Student & Leave Details */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-4">
              <div className="space-y-1.5">
                <div className="text-slate-500">Student Name:</div>
                <div className="font-semibold text-slate-900 text-sm">{leave.studentName}</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-slate-500">Roll Number & Dept:</div>
                <div className="font-semibold text-slate-900 text-sm">{leave.rollNumber} ({leave.department})</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-slate-500">Leave Category:</div>
                <div className="font-semibold text-blue-700">{leave.category}</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-slate-500">Duration:</div>
                <div className="font-semibold text-slate-900">{leave.startDate} to {leave.endDate} ({leave.totalDays} Days)</div>
              </div>
            </div>

            {/* Reason Box */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs mb-4">
              <span className="text-slate-500 block mb-1 font-medium">Declared Purpose / Reason:</span>
              <p className="text-slate-800 italic">"{leave.reason}"</p>
            </div>

            {/* Approver Signatures & QR */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-100 rounded-lg border border-slate-200">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
                <div className="text-[10px] text-slate-500 max-w-[130px] leading-tight">
                  Scan QR code at main college gate checkpoint for exit & entry verification.
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-semibold text-slate-800">{leave.facultyMentor}</div>
                <div className="text-[11px] text-slate-500">Faculty In-charge / HOD</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Digital Approval Recorded
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
          <p className="text-xs text-slate-500">Valid only with College Student Identity Card.</p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Gate Pass</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
