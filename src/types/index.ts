export interface DashboardMetrics {
  totalRevenue: number;
  activeUsers: number;
  transactions: number;
  growth: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  signups: number;
}

export interface Transaction {
  id: string;
  customer: string;
  amount: string | number;   // ← now accepts both strings and numbers
  status: string;
  date: string;
}
