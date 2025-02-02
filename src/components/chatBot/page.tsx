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

    // Simulating a bot response
    setTimeout(() => {
      const botResponse = "Thank you for your message! Our team will get back to you soon."; // You can customize this logic
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
