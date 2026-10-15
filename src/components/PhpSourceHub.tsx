import React, { useState } from 'react';
import { PHP_PROJECT_FILES } from '../data/phpCodeFiles';
import { PhpFileItem } from '../types';
import { 
  FolderTree, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Database, 
  Terminal, 
  Folder, 
  ChevronRight, 
  ExternalLink,
  Info,
  Server,
  Play
} from 'lucide-react';

export const PhpSourceHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PhpFileItem>(PHP_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                <FileCode className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold">PHP, MySQL &amp; XAMPP Source Code Explorer</h1>
            </div>
            <p className="text-xs text-amber-200/90 mt-1.5 max-w-2xl">
              Complete beginner-friendly code ready to drop into <code>C:\xampp\htdocs\leave_management</code>.
              Select any file from the sidebar to inspect, copy, or download.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download {selectedFile.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Code Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar: File Tree */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <FolderTree className="w-4 h-4 text-blue-600" />
              <span>XAMPP Project Structure</span>
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
              htdocs/leave_management/
            </span>
          </div>

          <div className="p-2 space-y-1">
            {PHP_PROJECT_FILES.map((file) => {
              const isSelected = selectedFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="mt-0.5">
                    {file.language === 'sql' ? (
                      <Database className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <FileCode className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium truncate">{file.name}</span>
                      <span className="text-[10px] uppercase font-mono px-1 rounded bg-slate-100 text-slate-500">
                        {file.language}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{file.path}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Folder className="w-3.5 h-3.5 text-amber-600" />
              <span>Required Subfolders in XAMPP:</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-500 font-mono">
              <li>database/ (for .sql file)</li>
              <li>config/ (for db.php)</li>
              <li>student/ (for student pages)</li>
              <li>faculty/ (for faculty pages)</li>
              <li>admin/ (for admin pages)</li>
              <li>assets/css/ (for style.css)</li>
              <li>uploads/ (for medical certificates)</li>
            </ul>
          </div>
        </div>

        {/* Right Area: Code Display */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          
          {/* Code Viewer Top Bar */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400">{selectedFile.name}</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  → Save to: <code>xampp/htdocs/leave_management/{selectedFile.path}</code>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Box */}
          <div className="p-4 overflow-auto max-h-[620px] bg-slate-900 font-mono text-xs text-slate-200 leading-relaxed selection:bg-amber-500/30">
            <pre className="whitespace-pre">
              <code>{selectedFile.code}</code>
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
