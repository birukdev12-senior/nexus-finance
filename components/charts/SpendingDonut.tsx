"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { SpendingCategory } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#185FA5", "#3B6D11", "#534AB7", "#888780", "#E24B4A"];

interface Props { data: SpendingCategory[]; }

export default function SpendingDonut({ data }: Props) {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [{
      data: data.map(d => d.percentage),
      backgroundColor: COLORS.slice(0, data.length),
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  return (
    <div>
      <div className="relative h-36 mx-auto w-36">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } },
            },
          }}
        />
      </div>
      <div className="mt-3 space-y-1.5">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: COLORS[i] }} />
              <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
