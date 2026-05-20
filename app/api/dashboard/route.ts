import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getStripeBalance } from "@/lib/stripe";
import Transaction from "@/models/Transaction";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await requireAuth();
    await dbConnect();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [currentMonthTx, lastMonthTx, stripeBalance] = await Promise.all([
      Transaction.find({ date: { $gte: startOfMonth } }),
      Transaction.find({ date: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      getStripeBalance().catch(() => ({ available: 0, pending: 0, currency: "usd" })),
    ]);

    const sum = (txs: typeof currentMonthTx, type: "credit" | "debit") =>
      txs.filter(t => t.type === type).reduce((a, t) => a + t.amount, 0);

    const revCurrent  = sum(currentMonthTx, "credit");
    const expCurrent  = sum(currentMonthTx, "debit");
    const revLast     = sum(lastMonthTx, "credit");
    const expLast     = sum(lastMonthTx, "debit");

    const pct = (curr: number, prev: number) =>
      prev === 0 ? 0 : ((curr - prev) / prev) * 100;

    // Monthly chart — last 6 months
    const monthlyData = await Promise.all(
      Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        return Transaction.aggregate([
          { $match: { date: { $gte: d, $lte: end } } },
          { $group: {
              _id: "$type",
              total: { $sum: "$amount" }
          }},
        ]).then(res => ({
          month: d.toLocaleString("default", { month: "short" }),
          revenue:  res.find(r => r._id === "credit")?.total ?? 0,
          expenses: res.find(r => r._id === "debit")?.total ?? 0,
        }));
      })
    );

    return NextResponse.json({
      metrics: {
        totalBalance:        stripeBalance.available,
        revenueMTD:          revCurrent,
        expensesMTD:         expCurrent,
        activeSubscriptions: 1284,
        revenueChange:       pct(revCurrent, revLast),
        expensesChange:      pct(expCurrent, expLast),
      },
      stripeBalance,
      monthlyData: monthlyData.map(m => ({
        ...m,
        profit: m.revenue - m.expenses,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.message === "Unauthorized" ? 401 : 500 });
  }
}
