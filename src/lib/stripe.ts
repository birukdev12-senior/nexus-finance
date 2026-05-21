import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

export async function createPaymentIntent(
  amount: number,
  currency = "usd",
  metadata?: Record<string, string>
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
    });
    return paymentIntent;
  } catch (error) {
    console.error("Stripe error:", error);
    throw error;
  }
}

export async function getStripeBalance() {
  try {
    const balance = await stripe.balance.retrieve();
    return balance;
  } catch (error) {
    console.error("Stripe balance error:", error);
    throw error;
  }
}
