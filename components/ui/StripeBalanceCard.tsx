import { StripeBalance } from "@/types";

interface Props { balance: StripeBalance }

export function StripeBalanceCard({ balance }: Props) {
  return (
    <div className="rounded-xl p-4 bg-brand-500 text-white relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 right-4 w-16 h-16 rounded-full bg-white/5" />

      <p className="text-xs text-white/60 mb-1">Stripe Balance</p>
      <p className="text-2xl font-semibold mb-3">${balance.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] text-white/50">Pending payouts</p>
          <p className="text-sm font-medium">${balance.pending.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] bg-white/15 px-2 py-1 rounded-full">Live mode</span>
          <p className="text-[10px] text-white/40 mt-1">via Stripe API</p>
        </div>
      </div>
    </div>
  );
}
