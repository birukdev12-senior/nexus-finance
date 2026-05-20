"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Filler, Tooltip, Legend,
} from "chart.js";
import type { MonthlyData } from "@/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Tooltip, Legend);

interface Props { data: MonthlyData[]; }

export default function RevenueChart({ data }: Props) {
  const labels   = data.map(d => d.month);
  const revenue  = data.map(d => d.revenue);
  const expenses = data.map(d => d.expenses);
  const profit   = data.map(d => d.profit);

  const chartData = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Revenue",
        data: revenue,
        backgroundColor: "#185FA5",
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        type: "bar" as const,
        label: "Expenses",
        data: expenses,
        backgroundColor: "#E24B4A",
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        type: "line" as const,
        label: "Net Profit",
        data: profit,
        borderColor: "#639922",
        backgroundColor: "rgba(99,153,34,0.08)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#639922",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="relative h-56">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` $${ctx.parsed.y.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: "#888780" } },
            y: {
              grid: { color: "rgba(0,0,0,0.04)" },
              border: { display: false },
              ticks: {
                font: { size: 11 },
                color: "#888780",
                callback: v => `$${(Number(v) / 1000).toFixed(0)}k`,
              },
            },
          },
        }}
      />
    </div>
  );
}
