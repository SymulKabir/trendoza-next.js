// app/api/create-payment-intent/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const POST = async (request: Request) => {
  try {
    const {amount, currency } :any = await request.json()
    const amountInCents = Math.round(amount * 100);
 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,  
      currency: currency
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return Response.json({
      message: "Internal server error"
    });
  }
};
