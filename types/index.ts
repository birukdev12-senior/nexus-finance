export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
  createdAt: Date;
}

export interface Transaction {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  date: Date;
  status: "completed" | "pending" | "failed";
  stripePaymentId?: string;
  source: string;
}

export interface DashboardMetrics {
  totalBalance: number;
  revenueMTD: number;
  expensesMTD: number;
  activeSubscriptions: number;
  revenueChange: number;
  expensesChange: number;
  balanceChange: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
}

export interface StripeBalance {
  available: number;
  pending: number;
  currency: string;
}
