"use client";
import React from "react";

export default function Topbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Nexus Finance</h1>
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
}
