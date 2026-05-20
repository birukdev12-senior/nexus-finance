export interface DashboardMetrics {
  totalBalance: number;
  revenueYTD: number;
  expensesYTD: number;
  activeSubscriptions: number;
  revenueChange: number;
  expensesChange: number;
  balanceChange: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  signups: number;
}

export interface Transaction {
  _id?: string;
  userId?: string;
  title: string;
  amount: string | number;
  type?: string;
  category?: string;
  date: Date | string;
  status: string;
  source?: string;
}
