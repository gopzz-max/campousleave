/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Role, LeaveApplication, LeaveBalance } from './types';
import { DEMO_USERS, INITIAL_LEAVES, INITIAL_LEAVE_BALANCES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomePortal } from './components/HomePortal';
import { StudentPortal } from './components/StudentPortal';
import { FacultyPortal } from './components/FacultyPortal';
import { AdminPortal } from './components/AdminPortal';
import { PhpSourceHub } from './components/PhpSourceHub';
import { SetupGuide } from './components/SetupGuide';
import { GatePassModal } from './components/GatePassModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { GraduationCap, UserCheck, ShieldCheck, FileCode, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.student);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'portal' | 'php-code' | 'guide'>('portal');

  // Application Data States
  const [leaves, setLeaves] = useState<LeaveApplication[]>(INITIAL_LEAVES);
  const [balances, setBalances] = useState<LeaveBalance[]>(INITIAL_LEAVE_BALANCES);

  // Modal States
  const [gatePassLeave, setGatePassLeave] = useState<LeaveApplication | null>(null);
  const [viewDoc, setViewDoc] = useState<{
    docName: string;
    docUrl?: string;
    studentName?: string;
  } | null>(null);

  // Switch Role
  const handleSwitchRole = (role: Role) => {
    setActiveRole(role);
    setCurrentUser(DEMO_USERS[role]);
    setIsLoggedIn(true);
    setActiveTab('portal');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Student: Apply for leave
  const handleApplyLeave = (
    newLeaveData: Omit<LeaveApplication, 'id' | 'appliedAt' | 'status'>
  ) => {
    const randomId = 'LV-2026-0' + Math.floor(100 + Math.random() * 900);
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newApp: LeaveApplication = {
      ...newLeaveData,
      id: randomId,
      appliedAt: formattedDate,
      status: 'pending',
    };

    setLeaves(prev => [newApp, ...prev]);

    // Update leave balance
    setBalances(prev =>
      prev.map(b => {
        if (b.category === newLeaveData.category) {
          const used = b.used + newLeaveData.totalDays;
          return {
            ...b,
            used,
            available: Math.max(0, b.total - used),
          };
        }
        return b;
      })
    );
  };

  // Student: Cancel pending application
  const handleCancelLeave = (id: string) => {
    const leaveToCancel = leaves.find(l => l.id === id);
    if (!leaveToCancel) return;

    setLeaves(prev => prev.filter(l => l.id !== id));

    // Restore balance if needed
    setBalances(prev =>
      prev.map(b => {
        if (b.category === leaveToCancel.category) {
          const used = Math.max(0, b.used - leaveToCancel.totalDays);
          return {
            ...b,
            used,
            available: Math.max(0, b.total - used),
          };
        }
        return b;
      })
    );
  };

  // Faculty: Approve
  const handleApprove = (id: string, remarks?: string) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setLeaves(prev =>
      prev.map(l => {
        if (l.id === id) {
          return {
            ...l,
            status: 'approved',
            facultyRemarks: remarks || 'Approved by Class In-charge.',
            actionBy: currentUser.name,
            actionDate: formattedDate,
          };
        }
        return l;
      })
    );
  };

  // Faculty: Reject
  const handleReject = (id: string, remarks: string) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setLeaves(prev =>
      prev.map(l => {
        if (l.id === id) {
          return {
            ...l,
            status: 'rejected',
            facultyRemarks: remarks,
            actionBy: currentUser.name,
            actionDate: formattedDate,
          };
        }
        return l;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      
      {/* Navigation */}
      <Navbar
        currentUser={isLoggedIn ? currentUser : null}
        activeRole={activeRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSwitchUser={handleSwitchRole}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab 1: Live Interactive Application */}
        {activeTab === 'portal' && (
          <div>
            {!isLoggedIn ? (
              <HomePortal
                onSelectRole={handleSwitchRole}
                onOpenPhpFiles={() => setActiveTab('php-code')}
                onOpenGuide={() => setActiveTab('guide')}
              />
            ) : (
              <div>
                {/* Active Role Portal */}
                {activeRole === 'student' && (
                  <StudentPortal
                    user={currentUser}
                    leaves={leaves}
                    balances={balances}
                    onApplyLeave={handleApplyLeave}
                    onCancelLeave={handleCancelLeave}
                    onViewGatePass={(l) => setGatePassLeave(l)}
                    onViewDocument={(name, url) =>
                      setViewDoc({ docName: name, docUrl: url, studentName: currentUser.name })
                    }
                  />
                )}

                {activeRole === 'faculty' && (
                  <FacultyPortal
                    user={currentUser}
                    leaves={leaves}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onViewDocument={(name, url, student) =>
                      setViewDoc({ docName: name, docUrl: url, studentName: student })
                    }
                  />
                )}

                {activeRole === 'admin' && (
                  <AdminPortal
                    user={currentUser}
                    leaves={leaves}
                    onViewGatePass={(l) => setGatePassLeave(l)}
                    onViewDocument={(name, url, student) =>
                      setViewDoc({ docName: name, docUrl: url, studentName: student })
                    }
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: PHP & MySQL XAMPP Source Code Hub */}
        {activeTab === 'php-code' && <PhpSourceHub />}

        {/* Tab 3: Step-by-Step Setup Guide */}
        {activeTab === 'guide' && <SetupGuide />}

      </main>

      {/* Floating Demo Persona Switcher Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-3 text-xs">
        <span className="text-slate-400 font-medium hidden sm:inline">Active Persona:</span>
        <button
          onClick={() => handleSwitchRole('student')}
          className={`px-3 py-1 rounded-full font-semibold transition flex items-center gap-1.5 ${
            activeRole === 'student' && isLoggedIn
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student</span>
        </button>

        <button
          onClick={() => handleSwitchRole('faculty')}
          className={`px-3 py-1 rounded-full font-semibold transition flex items-center gap-1.5 ${
            activeRole === 'faculty' && isLoggedIn
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Faculty (HOD)</span>
        </button>

        <button
          onClick={() => handleSwitchRole('admin')}
          className={`px-3 py-1 rounded-full font-semibold transition flex items-center gap-1.5 ${
            activeRole === 'admin' && isLoggedIn
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>

        <div className="h-4 w-px bg-slate-700 hidden sm:block" />

        <button
          onClick={() => setActiveTab('php-code')}
          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View PHP Files</span>
        </button>
      </div>

      {/* Modals */}
      <GatePassModal leave={gatePassLeave} onClose={() => setGatePassLeave(null)} />

      {viewDoc && (
        <DocumentViewerModal
          documentName={viewDoc.docName}
          documentUrl={viewDoc.docUrl}
          studentName={viewDoc.studentName}
          onClose={() => setViewDoc(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} CampusLeave System • Department of Information Technology</p>
          <p className="flex items-center gap-1 text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Tested for Apache &amp; MySQL in XAMPP
          </p>
        </div>
      </footer>

    </div>
  );
}
