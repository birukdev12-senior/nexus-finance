"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Rent", "Utilities", "Groceries", "Transport", "Other"],
  datasets: [
    {
      data: [1200, 300, 450, 200, 350],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    },
  ],
};

export default function SpendingDonut() {
  return <Doughnut data={data} />;
}
