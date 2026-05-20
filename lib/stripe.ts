import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export async function getStripeBalance(): Promise<{
  available: number;
  pending: number;
  currency: string;
}> {
  const balance = await stripe.balance.retrieve();
  const available = balance.available.reduce((sum, b) => sum + b.amount, 0) / 100;
  const pending = balance.pending.reduce((sum, b) => sum + b.amount, 0) / 100;
  return { available, pending, currency: balance.available[0]?.currency ?? "usd" };
}

export async function createPaymentIntent(
  amount: number,
  currency = "usd",
  metadata: Record<string, string> = {}
) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    metadata,
    automatic_payment_methods: { enabled: true },
  });
}

export async function constructWebhookEvent(
  payload: Buffer,
  signature: string
) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}
