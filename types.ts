
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  HRD = 'HRD',
  FINANCE = 'FINANCE',
  ACCOUNTING = 'ACCOUNTING',
  LEGAL = 'LEGAL',
  PROJECTS = 'PROJECTS'
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Resigned';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
}

export interface Permit {
  id: string;
  name: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring' | 'Expired';
  issuingAuthority: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

export interface Project {
  id: string;
  name: string;
  manager: string;
  deadline: string;
  progress: number;
  status: 'Active' | 'On Hold' | 'Completed';
  tasks: Task[];
}

export interface Insight {
  title: string;
  content: string;
  severity: 'low' | 'medium' | 'high';
}
