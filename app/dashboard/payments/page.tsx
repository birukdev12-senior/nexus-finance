"use client";
import { useState } from "react";

export default function PaymentsPage() {
  const [amount, setAmount]   = useState("");
  const [desc, setDesc]       = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState<{ type: "success"|"error"; text: string } | null>(null);

  async function handleCreatePayment(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount), metadata: { description: desc } }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setMsg({ type: "success", text: `Payment intent created! Client secret: ${data.clientSecret.slice(0, 20)}…` });
        setAmount(""); setDesc("");
      } else {
        setMsg({ type: "error", text: data.error ?? "Something went wrong" });
      }
    } catch {
      setMsg({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Create payment intent</h2>
        <p className="text-xs text-gray-400 mb-5">Generate a Stripe PaymentIntent to charge a customer</p>

        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
          }`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleCreatePayment} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
              <input type="number" min="1" step="0.01" value={amount} onChange={e => setAmount(e.target.value)}
                className="w-full h-10 pl-7 pr-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="99.00" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Invoice #1043" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-10 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
            {loading ? "Creating…" : "Create payment intent"}
          </button>
        </form>
      </div>
    </div>
  );
}
