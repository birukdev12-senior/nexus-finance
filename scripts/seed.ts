/**
 * Run with:  npx tsx scripts/seed.ts
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/nexus-finance";

const UserSchema = new mongoose.Schema({ name: String, email: String, password: String, role: String }, { timestamps: true });
const TxSchema   = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, title: String, amount: Number, type: String, category: String, date: Date, status: String, source: String });

const User        = mongoose.models.User        ?? mongoose.model("User",        UserSchema);
const Transaction = mongoose.models.Transaction ?? mongoose.model("Transaction", TxSchema);

const CATEGORIES  = ["Revenue","Subscription","Software","Infrastructure","Marketing","Payroll"];
const SAMPLE_TX   = [
  { title: "Acme Corp — Invoice #1042",     amount: 12500, type: "credit", category: "Revenue",        source: "stripe" },
  { title: "Vercel Pro subscription",        amount: 240,   type: "debit",  category: "Software",       source: "card"   },
  { title: "Payroll — May 15",              amount: 28400, type: "debit",  category: "Payroll",        source: "ach"    },
  { title: "Beta Industries — Sub payment", amount: 4200,  type: "credit", category: "Subscription",   source: "stripe" },
  { title: "AWS — Cloud services",          amount: 3980,  type: "debit",  category: "Infrastructure", source: "card"   },
  { title: "Globex LLC — Project milestone",amount: 22000, type: "credit", category: "Revenue",        source: "wire"   },
  { title: "Google Ads",                    amount: 2100,  type: "debit",  category: "Marketing",      source: "card"   },
  { title: "Figma subscription",            amount: 180,   type: "debit",  category: "Software",       source: "card"   },
  { title: "Initech — Monthly retainer",    amount: 8000,  type: "credit", category: "Revenue",        source: "stripe" },
  { title: "Datadog monitoring",            amount: 640,   type: "debit",  category: "Infrastructure", source: "card"   },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await User.deleteMany({});
  await Transaction.deleteMany({});

  const hash = await bcrypt.hash("password123", 12);
  const user = await User.create({ name: "Jordan Desai", email: "demo@nexus.finance", password: hash, role: "admin" });
  console.log("Created user:", user.email);

  const now = new Date();
  const txDocs = Array.from({ length: 6 }, (_, monthOffset) =>
    SAMPLE_TX.map((tx, i) => ({
      ...tx,
      userId: user._id,
      date:   new Date(now.getFullYear(), now.getMonth() - (5 - monthOffset), (i + 1) * 2),
      status: "completed",
    }))
  ).flat();

  await Transaction.insertMany(txDocs);
  console.log(`Inserted ${txDocs.length} transactions`);

  await mongoose.disconnect();
  console.log("Done! Log in with demo@nexus.finance / password123");
}

seed().catch(e => { console.error(e); process.exit(1); });
