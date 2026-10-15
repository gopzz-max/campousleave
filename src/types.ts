export type Role = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  rollNumber?: string;
  employeeId?: string;
  department: string;
  designation?: string;
  year?: string;
  section?: string;
  phone?: string;
  avatarUrl: string;
}

export type LeaveStatus = 'pending' | 'faculty_approved' | 'approved' | 'rejected';

export type LeaveCategory = 'Casual Leave' | 'Medical Leave' | 'On-Duty (OD) / Event' | 'Emergency Leave';

export interface LeaveApplication {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  year: string;
  category: LeaveCategory;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  facultyMentor: string;
  appliedAt: string;
  status: LeaveStatus;
  facultyRemarks?: string;
  adminRemarks?: string;
  documentName?: string;
  documentUrl?: string;
  actionBy?: string;
  actionDate?: string;
}

export interface LeaveBalance {
  category: LeaveCategory;
  total: number;
  used: number;
  available: number;
}

export interface PhpFileItem {
  name: string;
  path: string;
  description: string;
  code: string;
  language: string;
}
