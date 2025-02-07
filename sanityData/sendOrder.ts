import { Billing, Product } from "@/interface";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// Muhammad Shahroz: Function to save order to Sanity
export const saveOrderToSanity = async (
  billingDetails: Billing,
  cartItems: Product[],
  totalAmount: number
): Promise<void> => {
  try {
    // Check if customer already exists by email + fullName combination
    const existingCustomer = await client.fetch(
      `*[_type == "customer" && email == $email && fullName == $fullName][0]`,
      { email: billingDetails.email, fullName: billingDetails.fullName }
    );

    let customer;

    // If customer exists, update their information if necessary
    if (existingCustomer) {
      customer = existingCustomer;
      console.log("Customer already exists with the same email and name.");
    } else {
      // Create new customer record if no matching email + name found
      customer = await client.create({
        _type: "customer",
        fullName: billingDetails.fullName,
        email: billingDetails.email,
        phoneNumber: billingDetails.phoneNumber,
        address: billingDetails.addressLine1, // Store addressLine1 in customer
        city: billingDetails.city,
      });
      console.log("Customer created:", customer);
    }

    // Fetch last order ID safely
    const lastOrder = await client.fetch(
      `*[_type == "order"] | order(_createdAt desc)[0]{orderId}`
    );

    let lastOrderNumber = 0;

    // Check if lastOrder exists and has valid orderId format
    if (lastOrder?.orderId && typeof lastOrder.orderId === "string") {
      const parts = lastOrder.orderId.split("-"); // Split by "-"
      if (parts.length === 3 && !isNaN(Number(parts[2]))) {
        lastOrderNumber = Number(parts[2]); // Extract numeric part safely
      }
    }

    // Generate new order ID
    const newOrderId = `ShopCo-ENV-${(lastOrderNumber + 1)
      .toString()
      .padStart(2, "0")}`;

    console.log("Generated Order ID:", newOrderId);

    // Save order details with specific address
    const order = await client.create({
      _type: "order",
      orderId: newOrderId, // Use custom orderId here
      customer: { _type: "reference", _ref: customer._id },
      items: cartItems.map((item) => ({
        _type: "orderItem",
        _key: Math.random().toString(36).substring(2, 11), // Unique key for each item
        name: item.name,
        image: item.image,
        quantity: item.quantity ?? 1, // Ensure quantity exists
        unitPrice: item.price,
        totalPrice: item.price * (item.quantity ?? 1), // Correct multiplication
      })),
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity ?? 1),
        0
      ), // Ensure totalAmount is accurate
      orderDate: new Date().toISOString(),
      shippingAddress: `${billingDetails.addressLine1} ${
        billingDetails.addressLine2 ? billingDetails.addressLine2 : ""
      }`,
      status: "pending",
    });

    console.log("Order saved successfully:", order);
  } catch (error) {
    console.error("Error saving order to Sanity:", error);
    throw new Error("Failed to save order to Sanity");
  }
};
