"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { BeatLoader } from "react-spinners";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setIsLoading(true);

   
    let botResponse = "Thank you for your message! Our team will get back to you soon.";

    const lowerCaseMessage = input.toLowerCase();

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey there")) {
      botResponse = "Hello! How can I assist you today? May I know your name, please?";
    } else if (lowerCaseMessage.includes("my name is")) {
      botResponse = `Greetings, ${input.split("is")[1].trim()}! How can I help you today?`;
    } else if (lowerCaseMessage.includes("price") || lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("how much")) {
      botResponse = "For pricing information, please visit our products page or contact support for detailed queries.";
    } else if (lowerCaseMessage.includes("size") || lowerCaseMessage.includes("sizes")) {
      botResponse = "Our sizes range from XS to XXL. You can find a detailed size chart on each product page.";
    } else if (lowerCaseMessage.includes("shipping") || lowerCaseMessage.includes("deliver") || lowerCaseMessage.includes("shipping cost")) {
      botResponse = "We offer worldwide shipping. Visit our shipping info page for more details about shipping costs.";
    } else if (lowerCaseMessage.includes("return") || lowerCaseMessage.includes("exchange")) {
      botResponse = "We accept returns within 30 days of purchase in original condition. Please visit our returns page for more info.";
    } else if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("pay") || lowerCaseMessage.includes("methods")) {
      botResponse = "We accept payment through credit cards, PayPal, and bank transfers. You can choose your preferred method at checkout.";
    } else if (lowerCaseMessage.includes("material") || lowerCaseMessage.includes("fabric")) {
      botResponse = "Our clothes are made from high-quality cotton, polyester, and blends. Check each product page for specific material details.";
    } else if (lowerCaseMessage.includes("store") || lowerCaseMessage.includes("location")) {
      botResponse = "We have stores in multiple locations. Please check our store locator page to find one near you.";
    } else if (lowerCaseMessage.includes("gift card") || lowerCaseMessage.includes("buy gift card")) {
      botResponse = "You can purchase gift cards on our website. They make great gifts!";
    } else if (lowerCaseMessage.includes("customer service") || lowerCaseMessage.includes("support")) {
      botResponse = "You can reach our customer service via email or our contact page for assistance with any issues.";
    } else if (lowerCaseMessage.includes("sale") || lowerCaseMessage.includes("discount")) {
      botResponse = "Check out our Sale section for current discounts and offers!";
    } else if (lowerCaseMessage.includes("new collection") || lowerCaseMessage.includes("new arrivals")) {
      botResponse = "Our new collection is live on the website! Feel free to browse through the latest styles.";
    }

  
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: "bot" },
      ]);
      setIsLoading(false);
    }, 1000);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-xl rounded-2xl p-4 w-80 h-96 flex flex-col"
        >
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Chat Support</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end rounded-br-none"
                    : "bg-gray-200 text-gray-900 self-start rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center items-center space-x-2">
                <BeatLoader size={8} color="#4b6bfb" />
                <span className="text-gray-500">Bot is typing...</span>
              </div>
            )}
          </div>

          <div className="flex items-center border-t pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border rounded-l focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-2 rounded-r hover:bg-blue-700"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

export default Chatbot;
