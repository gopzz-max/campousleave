import React from 'react';
import { X, FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

interface DocumentViewerModalProps {
  documentName?: string;
  documentUrl?: string;
  studentName?: string;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  documentName,
  documentUrl,
  studentName,
  onClose,
}) => {
  if (!documentName && !documentUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Medical Certificate / Document Proof</h3>
              <p className="text-xs text-slate-400">
                Uploaded by {studentName || 'Student'} • {documentName || 'Attachment'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Preview Body */}
        <div className="p-6 bg-slate-100 flex flex-col items-center justify-center min-h-[360px] max-h-[500px] overflow-auto">
          {documentUrl ? (
            <div className="bg-white p-3 rounded-xl shadow border border-slate-300 max-w-full">
              <img
                src={documentUrl}
                alt="Document Attachment"
                className="max-h-[380px] w-auto object-contain rounded-lg"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Antivirus Scanned & Validated
                </span>
                <span className="font-mono">{documentName}</span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-800">{documentName || 'Uploaded Document'}</p>
              <p className="text-xs text-slate-500 mt-1">Stored in server directory: <code>htdocs/leave_management/uploads/</code></p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-white border-t border-slate-200 text-xs">
          <span className="text-slate-500">Official medical document for internal faculty audit only.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 font-medium rounded-lg transition"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
