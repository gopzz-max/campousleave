import React, { useState } from 'react';
import { User, LeaveApplication } from '../types';
import { 
  ShieldAlert, 
  Users, 
  GraduationCap, 
  FileSpreadsheet, 
  Download, 
  Search, 
  BarChart3, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from 'lucide-react';

interface AdminPortalProps {
  user: User;
  leaves: LeaveApplication[];
  onViewGatePass: (leave: LeaveApplication) => void;
  onViewDocument: (docName: string, docUrl?: string, studentName?: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  user,
  leaves,
  onViewGatePass,
  onViewDocument,
}) => {
  const [activeTab, setActiveTab] = useState<'master' | 'analytics' | 'users'>('master');
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const filteredLeaves = leaves.filter(l => {
    const matchesSearch = 
      l.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'all' || l.department.includes(deptFilter);
    return matchesSearch && matchesDept;
  });

  const handleExportCSV = () => {
    const headers = ['Application ID,Roll Number,Student Name,Department,Category,Start Date,End Date,Days,Status,Mentor,Applied At\n'];
    const rows = leaves.map(l => 
      `"${l.id}","${l.rollNumber}","${l.studentName}","${l.department}","${l.category}","${l.startDate}","${l.endDate}","${l.totalDays}","${l.status}","${l.facultyMentor}","${l.appliedAt}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `college_leaves_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-400/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                <span className="bg-purple-500/30 text-purple-200 border border-purple-400/40 text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                  {user.employeeId || 'ADM_EXEC_01'}
                </span>
              </div>
              <p className="text-purple-200 text-sm mt-0.5">{user.designation} • {user.department}</p>
              <p className="text-xs text-slate-300 mt-2">
                Centralized Academic Administration, Quota Oversight &amp; Audit Logs.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Master Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Applications</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{leaves.length}</div>
          <span className="text-[11px] text-slate-400">Across all academic departments</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Approved This Term</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {leaves.filter(l => l.status === 'approved').length}
          </div>
          <span className="text-[11px] text-emerald-600">Digital clearance valid</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Pending Approvals</span>
          <div className="text-2xl font-bold text-amber-500 mt-1">
            {leaves.filter(l => l.status === 'pending').length}
          </div>
          <span className="text-[11px] text-amber-600">Awaiting faculty action</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Rejection Rate</span>
          <div className="text-2xl font-bold text-slate-700 mt-1">
            {Math.round((leaves.filter(l => l.status === 'rejected').length / (leaves.length || 1)) * 100)}%
          </div>
          <span className="text-[11px] text-slate-400">Strict academic discipline</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('master')}
          className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'master'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>All Student Leave Applications</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Department Breakdown</span>
        </button>
      </div>

      {/* Master Table */}
      {activeTab === 'master' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Institution Master Leave Log</h2>
              <p className="text-xs text-slate-500">Live query connected to MySQL <code>leave_applications</code> table</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name, roll..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-500 w-48"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">App ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reviewer</th>
                  <th className="py-3 px-4 text-right">Gate Pass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLeaves.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">{l.id}</td>
                    <td className="py-3.5 px-4">
                      <strong>{l.studentName}</strong>
                      <div className="text-[11px] text-slate-400 font-mono">{l.rollNumber}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{l.department}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{l.category}</td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {l.startDate} to {l.endDate} ({l.totalDays}d)
                    </td>
                    <td className="py-3.5 px-4">
                      {l.status === 'approved' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          Approved
                        </span>
                      )}
                      {l.status === 'pending' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                          Pending
                        </span>
                      )}
                      {l.status === 'rejected' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-[11px]">{l.facultyMentor}</td>
                    <td className="py-3.5 px-4 text-right">
                      {l.status === 'approved' ? (
                        <button
                          onClick={() => onViewGatePass(l)}
                          className="text-[11px] font-semibold text-purple-700 hover:underline"
                        >
                          View Pass
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-4">Leave Types Distribution</h3>
            <div className="space-y-3">
              {[
                { name: 'Medical Leave', count: 2, color: 'bg-blue-500' },
                { name: 'Casual Leave', count: 2, color: 'bg-emerald-500' },
                { name: 'On-Duty (OD) / Hackathon', count: 1, color: 'bg-amber-500' },
                { name: 'Emergency Leave', count: 1, color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="font-semibold text-slate-900">{item.count} applications</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / 6) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-4">Department Attendance Health</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-slate-800">Information Technology (IT)</div>
                  <div className="text-[11px] text-slate-500">1st Year Class In-charge: Prof. Priya S.</div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  92.4% Present
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-slate-800">Computer Science &amp; Engineering (CSE)</div>
                  <div className="text-[11px] text-slate-500">HOD: Dr. K. Ramesh</div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  94.1% Present
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
