import React, { useState } from 'react';
import { User, LeaveApplication } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Paperclip, 
  Search, 
  MessageSquare, 
  AlertTriangle,
  UserCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface FacultyPortalProps {
  user: User;
  leaves: LeaveApplication[];
  onApprove: (id: string, remarks?: string) => void;
  onReject: (id: string, remarks: string) => void;
  onViewDocument: (docName: string, docUrl?: string, studentName?: string) => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({
  user,
  leaves,
  onApprove,
  onReject,
  onViewDocument,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [remarks, setRemarks] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const pendingLeaves = leaves.filter(l => l.status === 'pending');
  const resolvedLeaves = leaves.filter(l => l.status !== 'pending');

  const openActionModal = (leave: LeaveApplication, type: 'approve' | 'reject') => {
    setSelectedLeave(leave);
    setActionType(type);
    setRemarks(type === 'approve' ? 'Approved. Ensure lab assignments are submitted.' : 'Rejected due to conflict with exam schedule.');
  };

  const closeActionModal = () => {
    setSelectedLeave(null);
    setActionType(null);
    setRemarks('');
  };

  const handleConfirmAction = () => {
    if (!selectedLeave || !actionType) return;
    if (actionType === 'approve') {
      onApprove(selectedLeave.id, remarks);
    } else {
      onReject(selectedLeave.id, remarks || 'Application declined by Class In-charge.');
    }
    closeActionModal();
  };

  return (
    <div className="space-y-6">
      
      {/* Faculty Portal Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                  {user.employeeId || 'FAC_IT_004'}
                </span>
              </div>
              <p className="text-emerald-200 text-sm mt-0.5">
                {user.designation} • Department of {user.department}
              </p>
              <p className="text-xs text-slate-300 mt-2">
                Authorized for digital student absence approval &amp; gate pass verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-center">
              <span className="block text-2xl font-black text-amber-400">{pendingLeaves.length}</span>
              <span className="text-[11px] text-slate-400 font-medium">Pending Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Pending Requests</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-4 h-4" /></span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{pendingLeaves.length}</div>
          <p className="text-[11px] text-amber-600 mt-1 font-medium">Requires your review</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Approved This Term</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-4 h-4" /></span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {leaves.filter(l => l.status === 'approved').length}
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Gate passes generated</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Rejected</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-lg"><XCircle className="w-4 h-4" /></span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {leaves.filter(l => l.status === 'rejected').length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">Exam &amp; attendance clashes</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Department Leaves</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Layers className="w-4 h-4" /></span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{leaves.length}</div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">Logged in MySQL</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Student Requests ({pendingLeaves.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'history'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Resolved History ({resolvedLeaves.length})</span>
        </button>
      </div>

      {/* Pending Table / Cards */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Student Applications Awaiting Action</h2>
              <p className="text-xs text-slate-500">Inspect student reasons, verify medical proof, and issue decision</p>
            </div>
          </div>

          {pendingLeaves.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-semibold text-slate-700">All student leave requests reviewed!</p>
              <p className="text-xs text-slate-400 mt-1">There are no pending applications for your department right now.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="p-5 hover:bg-slate-50/60 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Student & Request Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{leave.studentName}</span>
                      <span className="text-xs font-mono font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {leave.rollNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">({leave.year} - {leave.department})</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {leave.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span><strong>Dates:</strong> {leave.startDate} to {leave.endDate}</span>
                      <span><strong>Total:</strong> {leave.totalDays} Days</span>
                      <span><strong>Applied:</strong> {leave.appliedAt}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800">
                      <strong className="text-slate-600">Reason: </strong> {leave.reason}
                    </div>

                    {leave.documentName && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => onViewDocument(leave.documentName!, leave.documentUrl, leave.studentName)}
                          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>View Medical Certificate ({leave.documentName})</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openActionModal(leave, 'approve')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve</span>
                    </button>

                    <button
                      onClick={() => openActionModal(leave, 'reject')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Resolved History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">Decision Audit Log</h2>
            <p className="text-xs text-slate-500">Record of all approved and rejected requests</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Faculty Remarks</th>
                  <th className="py-3 px-4">Action Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {resolvedLeaves.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <strong>{l.studentName}</strong>
                      <div className="text-[11px] text-slate-400 font-mono">{l.rollNumber}</div>
                    </td>
                    <td className="py-3 px-4">{l.category}</td>
                    <td className="py-3 px-4">{l.startDate} to {l.endDate} ({l.totalDays}d)</td>
                    <td className="py-3 px-4">
                      {l.status === 'approved' ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700 italic max-w-xs">{l.facultyRemarks || '-'}</td>
                    <td className="py-3 px-4 text-slate-500">{l.actionDate || l.appliedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Approve / Reject */}
      {selectedLeave && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              {actionType === 'approve' ? 'Confirm Leave Approval' : 'Reject Leave Application'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              For <strong>{selectedLeave.studentName}</strong> ({selectedLeave.rollNumber}) • {selectedLeave.category} ({selectedLeave.totalDays} Days)
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faculty Review Remarks / Feedback
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add comments or instructions for student..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={closeActionModal}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition ${
                    actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
