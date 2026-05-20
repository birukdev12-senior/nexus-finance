import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { dbConnect } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: NextRequest) {
  const payload   = Buffer.from(await req.arrayBuffer());
  const signature = req.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = await constructWebhookEvent(payload, signature);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  await dbConnect();

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as any;
      await Transaction.create({
        title: pi.description ?? "Stripe payment",
        amount: pi.amount / 100,
        type: "credit",
        category: "Stripe",
        source: "stripe",
        stripePaymentId: pi.id,
        status: "completed",
        date: new Date(pi.created * 1000),
      });
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as any;
      await Transaction.findOneAndUpdate(
        { stripePaymentId: pi.id },
        { status: "failed" }
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}

export const config = { api: { bodyParser: false } };
