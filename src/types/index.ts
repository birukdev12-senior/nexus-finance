export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
  percentage?: number;
}

export interface DashboardMetrics {
  totalBalance: number;
  revenueYTD: number;
  expensesYTD: number;
  activeSubscriptions: number;
  monthlyGrowth: number;
  pendingTransactions: number;
  revenueChange: number;
  expensesChange: number;
  balanceChange: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses?: number;
  costs?: number;
  profit?: number;
  signups?: number;
}

export interface Transaction {
  _id?: string;
  userId?: string;
  title?: string;
  amount?: string;
  type?: string;
  category: string;
  date: string;
  status?: string;
  source?: string;
}

export interface StripeBalance {
  available: number;
  pending: number;
  currency?: string;
}
