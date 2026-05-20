"use client";
import React from "react";
import { DashboardMetrics } from "@/types";

interface Props {
  metrics: DashboardMetrics;
}

export default function MetricCards({ metrics }: Props) {
  const cards = [
    { label: "Total Balance", value: `$${metrics.totalBalance.toLocaleString()}` },
    { label: "Revenue YTD", value: `$${metrics.revenueYTD.toLocaleString()}` },
    { label: "Expenses YTD", value: `$${metrics.expensesYTD.toLocaleString()}` },
    { label: "Active Subscriptions", value: metrics.activeSubscriptions.toString() },
    { label: "Revenue Change", value: `${metrics.revenueChange}%` },
    { label: "Expenses Change", value: `${metrics.expensesChange}%` },
    { label: "Balance Change", value: `${metrics.balanceChange}%` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className="text-xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
