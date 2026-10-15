import React from 'react';
import { 
  Play, 
  Database, 
  FolderCheck, 
  Globe, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  HelpCircle,
  FileCode2,
  ExternalLink
} from 'lucide-react';

export const SetupGuide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-6 rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">
            <Terminal className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-xl font-bold">XAMPP Beginner Setup &amp; Execution Guide</h1>
            <p className="text-xs text-emerald-200 mt-1">
              Step-by-step instructions for 1st-year IT students to run this project on their Windows or Mac laptop.
            </p>
          </div>
        </div>
      </div>

      {/* Step by step cards */}
      <div className="space-y-4">
        
        {/* Step 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-sm text-slate-900">Start Apache and MySQL in XAMPP Control Panel</h3>
              <p className="text-xs text-slate-600">
                Open <strong>XAMPP Control Panel</strong> on your computer. Click the <strong>Start</strong> button next to both <strong>Apache</strong> and <strong>MySQL</strong>. They should turn green.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Default URLs will be available at <code>http://localhost/</code> and <code>http://localhost/phpmyadmin/</code></span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-sm text-slate-900">Create Database &amp; Import leave_management.sql</h3>
              <p className="text-xs text-slate-600">
                Open your browser and navigate to <code className="text-blue-600 font-semibold">http://localhost/phpmyadmin/</code>.
              </p>
              <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-1">
                <li>Click on <strong>Databases</strong> tab on the top menu.</li>
                <li>Enter Database name: <code className="font-bold text-slate-800">leave_management</code> and click <strong>Create</strong>.</li>
                <li>Click on the newly created <code className="text-slate-800 font-semibold">leave_management</code> database in the left sidebar.</li>
                <li>Click the <strong>Import</strong> tab at the top.</li>
                <li>Click <strong>Choose File</strong>, select the <code className="font-bold text-emerald-700">leave_management.sql</code> file, and click <strong>Import / Go</strong> at the bottom.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-sm text-slate-900">Create the Project Folder Structure in htdocs</h3>
              <p className="text-xs text-slate-600">
                Go to your XAMPP installation directory (normally <code>C:\xampp\htdocs\</code>). Create a folder named <strong>leave_management</strong> with the subfolders:
              </p>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                <pre>{`C:\\xampp\\htdocs\\leave_management\\
  ├── database/
  │   └── leave_management.sql
  ├── config/
  │   └── db.php
  ├── student/
  │   ├── apply_leave.php
  │   ├── dashboard.php
  │   └── leave_history.php
  ├── faculty/
  │   ├── dashboard.php
  │   └── action_leave.php
  ├── admin/
  │   └── dashboard.php
  ├── assets/
  │   └── css/
  │       └── style.css
  ├── uploads/           <-- (Empty folder for certificate uploads)
  ├── index.php
  ├── login.php
  └── logout.php`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-sm">
              4
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-sm text-slate-900">Open and Test in Your Web Browser</h3>
              <p className="text-xs text-slate-600">
                Type this URL into Google Chrome or Firefox:
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-mono font-bold text-blue-900">
                http://localhost/leave_management/
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials Table */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-600" />
            <span>Pre-Seeded Demo Credentials (Ready to Test)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Login ID (Identifier)</th>
                  <th className="py-2.5 px-3">Default Password</th>
                  <th className="py-2.5 px-3">Name &amp; Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-blue-700">Student</td>
                  <td className="py-2.5 px-3 font-mono font-bold">26IT104</td>
                  <td className="py-2.5 px-3 font-mono">password123</td>
                  <td className="py-2.5 px-3 text-slate-700">Rahul Sharma (1st Year IT)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">Faculty / HOD</td>
                  <td className="py-2.5 px-3 font-mono font-bold">FAC104</td>
                  <td className="py-2.5 px-3 font-mono">password123</td>
                  <td className="py-2.5 px-3 text-slate-700">Prof. Priya Swaminathan (IT Dept)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-purple-700">Admin</td>
                  <td className="py-2.5 px-3 font-mono font-bold">ADMIN01</td>
                  <td className="py-2.5 px-3 font-mono">password123</td>
                  <td className="py-2.5 px-3 text-slate-700">Dr. A. Ramanathan (Dean)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
