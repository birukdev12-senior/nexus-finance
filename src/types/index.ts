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
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
}
