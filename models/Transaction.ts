import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  date: Date;
  status: "completed" | "pending" | "failed";
  stripePaymentId?: string;
  source: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId:   { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title:    { type: String, required: true },
    amount:   { type: Number, required: true },
    type:     { type: String, enum: ["credit", "debit"], required: true },
    category: { type: String, required: true },
    date:     { type: Date, default: Date.now },
    status:   { type: String, enum: ["completed", "pending", "failed"], default: "completed" },
    stripePaymentId: String,
    source:   { type: String, default: "manual" },
  },
  { timestamps: true }
);

TransactionSchema.index({ userId: 1, date: -1 });
TransactionSchema.index({ userId: 1, type: 1, date: -1 });

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ??
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
