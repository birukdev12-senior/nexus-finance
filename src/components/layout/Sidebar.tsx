"use client";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Finance</h2>
      <nav>
        <ul className="space-y-2">
          <li><a href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a></li>
          <li><a href="/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
}
