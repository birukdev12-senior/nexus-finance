"use client";
import { useState, useEffect } from "react";
import TransactionRow from "@/components/ui/TransactionRow";
import type { Transaction } from "@/types";

const MOCK: Transaction[] = [
  { _id:"1",userId:"u",title:"Acme Corp Invoice #1042",amount:"12500",type:"credit",category:"Stripe",        date:new Date("2026-05-18"),status:"completed",source:"Stripe"},
  { _id:"2",userId:"u",title:"Vercel Pro",             amount:"240",  type:"debit", category:"Software",      date:new Date("2026-05-17"),status:"completed",source:"Card"},
  { _id:"3",userId:"u",title:"Payroll — May 15",       amount:"28400",type:"debit", category:"Payroll",       date:new Date("2026-05-15"),status:"completed",source:"ACH"},
  { _id:"4",userId:"u",title:"Beta Industries sub",    amount:"4200", type:"credit",category:"Stripe",        date:new Date("2026-05-14"),status:"completed",source:"Stripe"},
  { _id:"5",userId:"u",title:"AWS Cloud services",     amount:"3980", type:"debit", category:"Infrastructure",date:new Date("2026-05-13"),status:"completed",source:"Card"},
  { _id:"6",userId:"u",title:"Globex LLC Milestone",   amount:"22000",type:"credit",category:"Stripe",        date:new Date("2026-05-12"),status:"completed",source:"Wire"},
  { _id:"7",userId:"u",title:"Google Workspace",       amount:"180",  type:"debit", category:"Software",      date:new Date("2026-05-10"),status:"completed",source:"Card"},
  { _id:"8",userId:"u",title:"Client XYZ retainer",    amount:"8000", type:"credit",category:"Stripe",        date:new Date("2026-05-08"),status:"pending",  source:"Stripe"},
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all"|"credit"|"debit">("all");
  const filtered = filter === "all" ? MOCK : MOCK.filter(t => t.type === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {(["all","credit","debit"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              filter === f ? "bg-brand-500 text-white" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
            }`}>
            {f === "all" ? "All transactions" : f === "credit" ? "Income" : "Expenses"}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
        {filtered.map(tx => <TransactionRow key={tx._id} tx={tx} />)}
      </div>
    </div>
  );
}
