"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { SpendingCategory } from "@/types";

ChartJS.register(ArcElement, Tooltip);

const COLORS = ["#185FA5","#3B6D11","#534AB7","#888780"];

interface Props { categories: SpendingCategory[] }

export function SpendingChart({ categories }: Props) {
  return (
    <div>
      <div className="relative h-40 mb-4">
        <Doughnut
          data={{
            labels: categories.map(c => c.name),
            datasets: [{
              data: categories.map(c => c.percentage),
              backgroundColor: COLORS,
              borderWidth: 0,
              hoverOffset: 4,
            }],
          }}
          options={{
            responsive: true, maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } },
            },
          }}
        />
      </div>
      <div className="space-y-2">
        {categories.map((cat, i) => (
          <div key={cat.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-gray-600">
              <span className="w-2 h-2 rounded-sm" style={{ background: COLORS[i] }} />
              {cat.name}
            </span>
            <span className="font-medium text-gray-800">{cat.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
