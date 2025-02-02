import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { message } = req.body;
  console.log("User Message:", message);

  const lowerCaseMessage = message.toLowerCase();

  let botResponse = "Thank you for your message! Our team will get back to you soon.";

  if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
    botResponse = "Hello! How can I assist you today?";
  } else if (lowerCaseMessage.includes("price") || lowerCaseMessage.includes("cost")) {
    botResponse = "For pricing information, please visit our products page or contact support.";
  } else if (lowerCaseMessage.includes("order") || lowerCaseMessage.includes("buy")) {
    botResponse = "You can place an order through our website, or let me know if you need help with that!";
  } else if (lowerCaseMessage.includes("shipping")) {
    botResponse = "We offer worldwide shipping. Visit our shipping info page for more details.";
  } else if (lowerCaseMessage.includes("thank")) {
    botResponse = "You're welcome! Let us know if you need anything else.";
  } else if (lowerCaseMessage.includes("sizes")) {
    botResponse = "Our sizes range from XS to XXL. You can find a detailed size chart on each product page.";
  } else if (lowerCaseMessage.includes("return")) {
    botResponse = "We accept returns within 30 days of purchase in original condition.";
  } else if (lowerCaseMessage.includes("material")) {
    botResponse = "Our clothes are made from high-quality cotton, polyester, and blends. Check each product page for details.";
  } else if (lowerCaseMessage.includes("gift card")) {
    botResponse = "Yes, we offer gift cards that can be purchased directly from our website.";
  }

  // Log the bot's response
  console.log("Bot Response:", botResponse);

  return res.status(200).json({ reply: botResponse });
}
