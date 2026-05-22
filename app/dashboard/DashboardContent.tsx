"use client";
import React from "react";
import MetricCards from "@/components/ui/MetricCards";
import SpendingDonut from "@/components/charts/SpendingDonut";
import TransactionRow from "@/components/ui/TransactionRow";
import type { DashboardMetrics, MonthlyData, Transaction } from "@/types";

const MOCK_METRICS: any = {
  totalBalance: 284712, revenueYTD: 97440, expensesYTD: 34280,
  activeSubscriptions: 1284, revenueChange: 8.1, expensesChange: 3.2, balanceChange: 12.4,
};

const MOCK_MONTHLY: MonthlyData[] = [
  { month: "Jan", revenue: 12000, signups: 200 },
  { month: "Feb", revenue: 19000, signups: 450 },
];

const MOCK_TRANSACTIONS: any[] = [
  { id: "1", customer: "Alice Johnson", amount: "$1,200", status: "Completed", date: "2026-05-10" },
  { id: "2", customer: "Bob Smith", amount: "$850", status: "Pending", date: "2026-05-09" },
];

export default function DashboardContent() {
  return (
    <div className="p-6">
      <MetricCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SpendingDonut />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {MOCK_TRANSACTIONS.map((txn) => (
          <TransactionRow key={txn.id} tx={txn} />
        ))}
      </div>
    </div>
  );
}
