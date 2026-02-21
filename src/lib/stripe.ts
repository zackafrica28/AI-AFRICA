import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("⚠️ STRIPE_SECRET_KEY is not defined. Using placeholder for build.");
}

export const stripe = new Stripe(stripeKey, {
    apiVersion: "2023-10-16" as any,
});
