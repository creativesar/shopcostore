import { Product } from '@/interface';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { saveOrderToSanity } from '../../../../../sanityData/sendOrder';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!stripeSecretKey) throw new Error("Stripe Secret Key is missing");
if (!baseUrl) throw new Error("Base URL is missing");

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-01-27.acacia",
});

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const { cart, billingDetails } = await req.json();

    // Validate cart and billingDetails
    if (!cart || !Array.isArray(cart)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    if (!billingDetails || typeof billingDetails !== "object") {
      return NextResponse.json({ error: "Invalid billing details" }, { status: 400 });
    }

    // Initialize total price and total quantity
    let totalPrice = 0;
    let totalQuantity = 0;

    // Map cart items to Stripe line items
    const lineItems = cart.map((item: Product) => {
      if (isNaN(item.price) || isNaN(item.quantity) || item.quantity <= 0) {
        throw new Error(`Invalid price or quantity for item: ${item.name}`);
      }

      // Calculate total price and quantity
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              heading: 'Product Details',
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    // Save the order to Sanity
    try {
      await saveOrderToSanity(billingDetails, cart, totalPrice);
    } catch (error) {
      console.error("Error saving order to Sanity:", error);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    // Return session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
