import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const type   = searchParams.get("type");
    const status = searchParams.get("status");
    const limit  = parseInt(searchParams.get("limit") ?? "20");
    const page   = parseInt(searchParams.get("page") ?? "1");

    const query: Record<string, unknown> = {};
    if (type)   query.type   = type;
    if (status) query.status = status;

    const [transactions, total] = await Promise.all([
      Transaction.find(query).sort({ date: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Transaction.countDocuments(query),
    ]);

    return NextResponse.json({ transactions, total, page, pages: Math.ceil(total / limit) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    await dbConnect();
    const body = await req.json();
    const tx = await Transaction.create(body);
    return NextResponse.json(tx, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
