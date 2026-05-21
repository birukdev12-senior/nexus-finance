"use client";
import React from "react";

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Total Revenue</p>
        <p className="text-2xl font-bold">$12,400</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Active Users</p>
        <p className="text-2xl font-bold">1,823</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Sales</p>
        <p className="text-2xl font-bold">$48,500</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Growth</p>
        <p className="text-2xl font-bold text-green-500">+12.5%</p>
      </div>
    </div>
  );
}
