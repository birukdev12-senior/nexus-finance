import { dbConnect } from "./mongodb";
import User from "../models/User";
import Transaction from "../models/Transaction";

async function seed() {
  await dbConnect();

  // Create demo user
  const existing = await User.findOne({ email: "admin@nexus.com" });
  if (!existing) {
    await User.create({ name: "Jordan Desai", email: "admin@nexus.com", password: "password123", role: "admin" });
    console.log("Created demo user: admin@nexus.com / password123");
  }

  // Seed transactions
  const count = await Transaction.countDocuments();
  if (count === 0) {
    const now = new Date();
    const txs = [
      { title: "Acme Corp Invoice #1042", amount: 12500, type: "credit", category: "Stripe",         date: new Date(now.getFullYear(), now.getMonth(), 18), status: "completed", source: "Stripe" },
      { title: "Vercel Pro subscription", amount: 240,   type: "debit",  category: "Software",       date: new Date(now.getFullYear(), now.getMonth(), 17), status: "completed", source: "Card" },
      { title: "Payroll",                 amount: 28400, type: "debit",  category: "Payroll",        date: new Date(now.getFullYear(), now.getMonth(), 15), status: "completed", source: "ACH" },
      { title: "Beta Industries — Sub",   amount: 4200,  type: "credit", category: "Stripe",         date: new Date(now.getFullYear(), now.getMonth(), 14), status: "completed", source: "Stripe" },
      { title: "AWS Cloud services",      amount: 3980,  type: "debit",  category: "Infrastructure", date: new Date(now.getFullYear(), now.getMonth(), 13), status: "completed", source: "Card" },
      { title: "Globex LLC Milestone",    amount: 22000, type: "credit", category: "Stripe",         date: new Date(now.getFullYear(), now.getMonth(), 12), status: "completed", source: "Wire" },
    ];
    await Transaction.insertMany(txs);
    console.log(`Seeded ${txs.length} transactions`);
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch(console.error);
