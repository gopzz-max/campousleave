import React from 'react';
import { User, Role } from '../types';
import { 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Code2, 
  LogOut, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeRole: Role;
  activeTab: 'portal' | 'php-code' | 'guide';
  setActiveTab: (tab: 'portal' | 'php-code' | 'guide') => void;
  onSwitchUser: (role: Role) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeRole,
  activeTab,
  setActiveTab,
  onSwitchUser,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & College Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">CampusLeave</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  IT Dept
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Apex Institute of Technology • Leave Portal</p>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'portal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>Live Application</span>
            </button>

            <button
              onClick={() => setActiveTab('php-code')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'php-code'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-amber-300" />
              <span>PHP / XAMPP Code Files</span>
              <span className="bg-amber-500/30 text-amber-200 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                8 Files
              </span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden md:inline">XAMPP Setup Guide</span>
              <span className="md:hidden">Guide</span>
            </button>
          </div>

          {/* User Persona & Role Switcher */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* Quick Role Switch Buttons */}
                <div className="hidden lg:flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
                  <span className="text-slate-400 px-2 text-[11px]">Switch Persona:</span>
                  <button
                    onClick={() => onSwitchUser('student')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeRole === 'student' ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => onSwitchUser('faculty')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeRole === 'faculty' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Faculty (HOD)
                  </button>
                  <button
                    onClick={() => onSwitchUser('admin')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeRole === 'admin' ? 'bg-purple-600 text-white font-medium' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Admin
                  </button>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-2.5 pl-2">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-slate-700"
                  />
                  <div className="hidden sm:block text-left leading-tight">
                    <p className="text-xs font-semibold text-white truncate max-w-[130px]">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 capitalize">
                      {currentUser.role === 'faculty' ? 'Faculty / HOD' : currentUser.role}
                    </p>
                  </div>

                  <button
                    onClick={onLogout}
                    title="Log out"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </header>
  );
};
