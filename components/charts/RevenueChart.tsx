"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyData {
  month: string;
  revenue: number;
  expenses?: number;
  costs?: number;
  profit?: number;
}

export default function RevenueChart({ data }: { data: MonthlyData[] }) {
  const labels = data.map((d) => d.month);
  const revenue = data.map((d) => d.revenue);
  const expenses = data.map((d) => d.expenses ?? 0);
  const profit = data.map((d) => d.profit ?? 0);

  const chartData: any = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Revenue",
        data: revenue,
        backgroundColor: "#4F46E5",
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        type: "bar",
        label: "Expenses",
        data: expenses,
        backgroundColor: "#EF4444",
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        type: "line",
        label: "Profit",
        data: profit,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value: any) => `$${value}` },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.parsed.y;
            if (value === null || value === undefined) return "";
            return `$${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="h-96 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
