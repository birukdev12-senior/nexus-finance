import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  customer: String,
  amount: String,
  status: { type: String, enum: ["Completed", "Pending", "Failed"] },
  date: String,
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
