import React, { useState } from 'react';
import { User, LeaveApplication, LeaveBalance, LeaveCategory } from '../types';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  UploadCloud, 
  Plus, 
  Search, 
  Filter, 
  Printer, 
  Check, 
  Trash2,
  Paperclip,
  Activity,
  Award,
  Sparkles
} from 'lucide-react';

interface StudentPortalProps {
  user: User;
  leaves: LeaveApplication[];
  balances: LeaveBalance[];
  onApplyLeave: (newLeave: Omit<LeaveApplication, 'id' | 'appliedAt' | 'status'> & { id?: string }) => void;
  onCancelLeave: (id: string) => void;
  onViewGatePass: (leave: LeaveApplication) => void;
  onViewDocument: (docName: string, docUrl?: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  user,
  leaves,
  balances,
  onApplyLeave,
  onCancelLeave,
  onViewGatePass,
  onViewDocument,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'apply' | 'history'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [category, setCategory] = useState<LeaveCategory>('Medical Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [facultyMentor, setFacultyMentor] = useState('Prof. Priya Swaminathan (HOD CSE/IT)');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Calculate day difference
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();

  // File selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      const fakeUrl = URL.createObjectURL(file);
      setFilePreviewUrl(fakeUrl);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFilePreviewUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!startDate || !endDate) {
      setFormError('Please select both Start and End dates.');
      return;
    }

    if (totalDays <= 0) {
      setFormError('End date must be on or after Start date.');
      return;
    }

    if (reason.trim().length < 8) {
      setFormError('Please provide a descriptive reason (at least 8 characters).');
      return;
    }

    onApplyLeave({
      studentId: user.id,
      studentName: user.name,
      rollNumber: user.rollNumber || '26IT104',
      department: user.department,
      year: user.year || '1st Year',
      category,
      startDate,
      endDate,
      totalDays,
      reason,
      facultyMentor,
      documentName: uploadedFile ? uploadedFile.name : (category === 'Medical Leave' ? 'medical_certificate_scan.pdf' : undefined),
      documentUrl: filePreviewUrl || (category === 'Medical Leave' ? 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80' : undefined),
    });

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('history');
      // Reset form
      setReason('');
      setStartDate('');
      setEndDate('');
      setUploadedFile(null);
      setFilePreviewUrl('');
    }, 1200);
  };

  // Filter student leaves
  const studentLeaves = leaves.filter(l => l.studentId === user.id || l.rollNumber === user.rollNumber);
  
  const filteredLeaves = studentLeaves.filter(leave => {
    const matchesFilter = filterStatus === 'all' ? true : leave.status === filterStatus;
    const matchesSearch = 
      leave.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Student Profile & Quick Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/20 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                <span className="bg-blue-500/30 text-blue-200 border border-blue-400/40 text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                  {user.rollNumber}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-0.5">
                {user.department} • {user.year} (Section {user.section})
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  Attendance Rate: <strong className="text-white font-semibold">91.4%</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Academic Standing: <strong className="text-white font-semibold">Good (No Backlogs)</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('apply')}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Apply for Leave</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leave Quota Balance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {balances.map((bal, idx) => {
          const percentUsed = Math.round((bal.used / bal.total) * 100);
          return (
            <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{bal.category}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {bal.available} Left
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900">{bal.available}</span>
                <span className="text-xs text-slate-400">/ {bal.total} days sem quota</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${
                    percentUsed > 75 ? 'bg-rose-500' : percentUsed > 50 ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5">
                <span>{bal.used} days used</span>
                <span>{100 - percentUsed}% remaining</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition border-b-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Recent Activity &amp; Status
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'apply'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          Apply New Leave
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Applications ({studentLeaves.length})
        </button>
      </div>

      {/* Tab 1: Apply Leave Form */}
      {activeTab === 'apply' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Online Student Leave Application</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Form automatically dispatches to your Class In-charge for digital approval.
            </p>
          </div>

          {formSuccess ? (
            <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-lg">Leave Application Submitted Successfully!</h3>
              <p className="text-xs text-emerald-700 mt-1">
                Your application has been logged with ID. Redirecting to your leave history...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Leave Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as LeaveCategory)}
                    className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Casual Leave">Casual Leave (Personal & Family)</option>
                    <option value="Medical Leave">Medical Leave (Health / Hospital)</option>
                    <option value="On-Duty (OD) / Event">On-Duty (OD) / Hackathons / Sports</option>
                    <option value="Emergency Leave">Emergency Leave (Urgent Contingency)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Approving Mentor / HOD <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={facultyMentor}
                    onChange={(e) => setFacultyMentor(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Prof. Priya Swaminathan (HOD CSE/IT)">
                      Prof. Priya Swaminathan (HOD CSE/IT)
                    </option>
                    <option value="Dr. Sundar Pichai (Dean Academics)">
                      Dr. K. Sundaram (Dean of Academics)
                    </option>
                    <option value="Prof. Rajesh K. (Class Mentor)">
                      Prof. Rajesh K. (1st Year IT Mentor)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Start Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    End Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    required
                    className="w-full text-sm rounded-xl border border-slate-300 px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Calculated Duration
                  </label>
                  <div className="w-full text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-blue-700 flex items-center justify-between">
                    <span>{totalDays > 0 ? `${totalDays} Day(s)` : '0 Days'}</span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Detailed Reason for Absence <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="E.g., Suffering from fever and throat infection, advised 2 days bed rest by physician..."
                  required
                  className="w-full text-sm rounded-xl border border-slate-300 p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Medical Certificate or Proof Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Upload Medical Certificate / Event Permission Letter
                  <span className="text-slate-400 font-normal ml-1">
                    ({category === 'Medical Leave' ? 'Required for Medical' : 'Optional'})
                  </span>
                </label>

                {uploadedFile ? (
                  <div className="flex items-center justify-between p-3.5 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 text-white rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-blue-950 truncate max-w-xs">{uploadedFile.name}</p>
                        <p className="text-[11px] text-blue-700">{(uploadedFile.size / 1024).toFixed(1)} KB • Ready for upload</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50/60 transition cursor-pointer relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Click to upload doctor certificate or event pass</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, PNG, JPG (Saved to XAMPP <code>uploads/</code>)</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Leave Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 2 & 3: History & Overview */}
      {(activeTab === 'overview' || activeTab === 'history') && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">My Leave Applications &amp; Gate Passes</h2>
              <p className="text-xs text-slate-500">Track approvals and download clearance passes for approved leaves</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search application..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                {['all', 'pending', 'approved', 'rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded capitalize font-medium transition ${
                      filterStatus === st ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Days</th>
                  <th className="py-3 px-4">Reason / Comments</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Doc</th>
                  <th className="py-3 px-4 text-right">Gate Pass / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No leave applications found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeaves.map((leave) => {
                    return (
                      <tr key={leave.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                          {leave.id}
                          <div className="text-[10px] text-slate-400 font-sans">{leave.appliedAt}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800">{leave.category}</span>
                          <div className="text-[10px] text-slate-500">Mentor: {leave.facultyMentor}</div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                          {leave.startDate} <span className="text-slate-400">to</span> {leave.endDate}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          {leave.totalDays} {leave.totalDays === 1 ? 'day' : 'days'}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-slate-700 line-clamp-1">{leave.reason}</p>
                          {leave.facultyRemarks && (
                            <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                              Faculty: "{leave.facultyRemarks}"
                            </p>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {leave.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                              <Clock className="w-3 h-3" /> Pending Review
                            </span>
                          )}
                          {leave.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          )}
                          {leave.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
                              <XCircle className="w-3 h-3" /> Rejected
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {leave.documentName ? (
                            <button
                              onClick={() => onViewDocument(leave.documentName!, leave.documentUrl)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                              title="View uploaded certificate"
                            >
                              <Paperclip className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {leave.status === 'approved' ? (
                            <button
                              onClick={() => onViewGatePass(leave)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition inline-flex items-center gap-1"
                            >
                              <Printer className="w-3 h-3" />
                              <span>Gate Pass</span>
                            </button>
                          ) : leave.status === 'pending' ? (
                            <button
                              onClick={() => onCancelLeave(leave.id)}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              Withdraw
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[11px]">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};
