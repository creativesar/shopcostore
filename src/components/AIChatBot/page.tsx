'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { Send, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sendSound = new Audio('/sounds/send.mp3');
const receiveSound = new Audio('/sounds/receive.mp3');

const products = [
    {
        name: "Faded Skinny Jeans",
        price: "$210",
        colors: ["Blue", "White", "Black", "Red", "Yellow"],
        description: "Slim-fit jeans with a stylish faded look, perfect for casual outings.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "One Life Graphic T-Shirt",
        oldPrice: "$300",
        newPrice: "$180",
        colors: ["Blue", "White", "Black", "Red", "Yellow"],
        description: "Trendy graphic t-shirt with bold 'One Life' design, made from high-quality cotton.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "T-Shirt With Tap Tail",
        price: "$120",
        colors: ["Blue", "White", "Black", "Red", "Yellow"],
        description: "Perfect for any occasion, crafted from soft and breathable fabric for superior comfort.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Classic Polo T-Shirt",
        price: "$180",
        colors: ["Blue", "White", "Black", "Red", "Yellow"],
        description: "Timeless classic polo shirt made from premium-quality fabric with stylish collar and button placket.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Black Athletic Jogger Pants with Side Stripes",
        price: "$180",
        colors: ["Black"],
        description: "Sporty jogger pants with white side stripes, elastic waistband, and adjustable drawstring.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Skinny Fit Jeans",
        price: "$240",
        colors: ["Blue", "White", "Black", "Red", "Yellow"],
        description: "Classic straight-fit denim jeans with medium-wash finish and subtle distressed details.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Beige Slim-Fit Jogger Pants",
        oldPrice: "$269",
        newPrice: "$242.10",
        colors: ["Beige"],
        description: "Modern slim-fit joggers with elastic waistband and cuffed ankles in neutral beige.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Black Striped T-Shirt",
        price: "$120",
        colors: ["Black"],
        description: "Sporty raglan t-shirt with vertical pinstripes and contrasting sleeves.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Checkered Shirt",
        price: "$178",
        colors: ["Red", "Navy", "White"],
        description: "Bold red and navy checkered shirt with button-down collar and breathable fabric.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "LOOSE FIT BERMUDA SHORTS",
        oldPrice: "$78",
        newPrice: "$62.40",
        colors: ["Blue", "White", "Black", "Red", "Yellow"],
        description: "Lightweight Bermuda shorts with classic waistband and side pockets.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Sleeve Stripe T-Shirt",
        oldPrice: "$130",
        newPrice: "$78",
        colors: ["Orange", "Black"],
        description: "Vibrant orange and black striped t-shirt with sporty raglan sleeves.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Vertical Striped Shirt",
        oldPrice: "$229",
        newPrice: "$114.50",
        colors: ["Green"],
        description: "Sophisticated green striped shirt with band collar and long sleeves.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Gray Slim-Fit Jogger Pants",
        oldPrice: "$170",
        newPrice: "$144.50",
        colors: ["Gray"],
        description: "Comfortable gray joggers with slim fit and adjustable drawstring waist.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "COURAGE GRAPHIC T-SHIRT",
        price: "$145",
        colors: ["Black"],
        description: "Bold graphic tee with 'Courage' design in soft, breathable fabric.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Classic Black Pullover Hoodie",
        price: "$128",
        colors: ["Black"],
        description: "Versatile hoodie with adjustable drawstring and spacious front pocket.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Classic Black Long Sleeve Button-Down Shirt",
        price: "$190",
        colors: ["Black"],
        description: "Tailored black button-down shirt with lightweight fabric and crisp collar.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Classic Black Straight-Leg Jeans",
        oldPrice: "$170",
        newPrice: "$142.80",
        colors: ["Black"],
        description: "Timeless straight-leg jeans in durable black denim.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Gradient Graphic T-shirt",
        price: "$145",
        colors: ["Multicolor"],
        description: "Bold abstract swirl design with 'Just Walk Forward' slogan.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Classic White Pullover Hoodie",
        oldPrice: "$150",
        newPrice: "$135",
        colors: ["White"],
        description: "Minimalist white hoodie with adjustable drawstring and front pocket.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Casual Green Bomber Jacket",
        oldPrice: "$300",
        newPrice: "$240",
        colors: ["Green"],
        description: "Sporty green bomber jacket with snap buttons and ribbed cuffs.",
        sizes: ["Small", "Medium", "Large", "Extra Large"]
      }
];

interface Message {
  text: string;
  from: "bot" | "user";
}

interface Product {
  name: string;
  price?: string;
  oldPrice?: string;
  newPrice?: string;
  colors: string[];
  description: string;
  sizes: string[];
}

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to ShopCo! 🛍️ How can I assist you today?", from: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [buttonGlow, setButtonGlow] = useState(false);
  const [particlePos, setParticlePos] = useState<{x: number, y: number} | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sendSound.load();
    receiveSound.load();
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (messages.length === 1) speak(messages[0].text);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    anime({
      targets: ".message",
      opacity: [0, 1],
      translateY: [10, 0],
      easing: "easeOutQuad",
      duration: 400,
      delay: anime.stagger(100)
    });
  }, [messages]);

  const playSound = (sound: HTMLAudioElement): void => {
    sound.currentTime = 0;
    sound.play().catch(error => console.log("Audio play failed:", error));
  };

    const handleSend = async () => {
    if (!input.trim() || isBotTyping) return;

    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setParticlePos({ x: rect.right - 40, y: rect.top + 10 });
    }

    playSound(sendSound);
    const userMessage: Message = { text: input, from: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsBotTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const botResponse = getBotResponse(input);
    const botMessage: Message = { text: botResponse, from: "bot" };
  
    playSound(receiveSound);
    setMessages(prev => [...prev, botMessage]);
    speak(botResponse);
    setIsBotTyping(false);
    setButtonGlow(true);
    setTimeout(() => setButtonGlow(false), 2000);
};

  const speak = (text: string): void => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1.1;
    
    speech.onstart = () => {
      anime({
        targets: '.bot-message:last-child',
        scale: [1, 1.02],
        duration: 500,
        easing: 'easeInOutQuad',
        loop: true
      });
    };
    
    speech.onend = () => {
      anime.remove('.bot-message:last-child');
    };
    
    window.speechSynthesis.speak(speech);
  };

  const ParticleEffect = () => (
    <motion.div
      className="absolute w-2 h-2 bg-purple-400 rounded-full pointer-events-none"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 8, opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => setParticlePos(null)}
      style={{
        left: particlePos?.x,
        top: particlePos?.y,
      }}
    />
  );

  const getBotResponse = (query: string): string => {
    query = query.toLowerCase();
    
    const product = products.find((p: Product) => 
      query.includes(p.name.toLowerCase()) || 
      query.match(new RegExp(`\\b${p.name.toLowerCase().split(' ').join('\\s*')}\\b`))
    );

    if (product) {
      const isColorQuery = /colou?rs?|color scheme|available colors?/i.test(query);
      const isSizeQuery = /sizes?|size range|available sizes?/i.test(query);
      const isPriceQuery = /price|cost|how much|discount|offer/i.test(query);
      const isDescQuery = /describe|description|details|about/i.test(query);

      if (isColorQuery) return `🎨 Available colors for ${product.name}: ${product.colors.join(", ")}`;
      if (isSizeQuery) return `📏 Available sizes for ${product.name}: ${product.sizes.join(", ")}`;
      if (isPriceQuery) {
        return `💰 Price for ${product.name}: ${product.newPrice || product.price}${
          product.oldPrice ? ` (Original: ${product.oldPrice}, Save ${Math.round(
            ((parseFloat((product.oldPrice || '').replace('$', '')) - 
            parseFloat(((product.newPrice || product.price) || '').replace('$', ''))) / 
            parseFloat((product.oldPrice || '').replace('$', ''))) * 100
          )}%)` : ''}`;
      }
      if (isDescQuery) return `📝 ${product.name} Description:\n${product.description}`;

      return `🛍️ ${product.name}\n💵 Price: ${product.newPrice || product.price}${
        product.oldPrice ? ` (🔖 Was ${product.oldPrice})` : ''}\n🎨 Colors: ${
        product.colors.join(", ")}\n📏 Sizes: ${product.sizes.join(", ")}\n📄 Description: ${
        product.description}`;
    }

    if (/(?:price|cost) range|how expensive/.test(query)) 
      return "💰 Our products range from $62.40 to $300! Ask about specific items.";

    if (/shipping|delivery|ship time/.test(query)) 
      return "🚚 FREE shipping on orders over $50! 3-5 business days delivery.";

    if (/discount|sale|offer|promotion/.test(query)) 
      return "🎉 Discounted items:\n- Loose Fit Bermuda Shorts\n- Sleeve Stripe T-Shirt\n- Vertical Striped Shirt";

    if (/return policy|returns?|exchange|refund/i.test(query))
      return "📦 Return Policy:\n• 30-day returns\n• Items must be unworn with tags\n• Full refund to original payment\n• Start returns in 'Orders' section";

    if (/payment methods|credit card|paypal|how to pay/i.test(query))
      return "💳 Accepted Payments:\n• Visa/Mastercard/Amex\n• PayPal\n• ShopCo Credits\n• Apple Pay/Google Pay";

    if (/contact support|talk to someone|customer service|help line/i.test(query))
      return "📞 Contact Us:\n• 24/7 Support\n• Call: 1-800-SHOPCO\n• Email: support@shopco.com\n• Live Chat available on website";

    if (/color|colour|available hues/.test(query)) 
      return "🌈 Specify an item to see its color options!";

    if (/size|sizing|fit/.test(query)) 
      return "📐 Sizes: Small to XL. Some items have numbered sizes. Ask about specific products!";

    if (/recommend|suggest|what's good/.test(query))
      return "🌟 Popular picks:\n1. Classic Polo T-Shirt\n2. Green Bomber Jacket\n3. Gradient Graphic T-shirt";

    return `🤖 Ask about:
• Product details
• Prices & discounts
• Colors & sizes
• Shipping info
• Return policy
• Payment methods
• Contact support`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          inputRef.current?.focus();
        }}
        className="relative bg-gradient-to-br from-purple-600 to-blue-500 text-white p-5 rounded-full shadow-2xl hover:shadow-xl transition-all"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ rotate: 12, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={28} className="transform transition-transform hover:rotate-90" />
        ) : (
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MessageCircle size={28} />
          </motion.div>
        )}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -3 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', bounce: 0.4 }
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            className="w-96 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200 relative overflow-hidden"
          >
            {particlePos && <ParticleEffect />}
            
            <div className="absolute inset-0 opacity-10 z-0">
              <motion.div
                className="absolute w-64 h-64 bg-gradient-to-r from-purple-400 to-blue-300 rounded-full blur-3xl"
                animate={{
                  x: [-100, 300, -100],
                  y: [0, 150, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="p-4 space-y-4 relative z-10">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <motion.h2
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundSize: '200% auto',
                  }}
                >
                  ShopCo AI Assistant
                </motion.h2>
                <div className="flex space-x-2 items-center">
                  {isBotTyping && (
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full"
                        animate={{
                          y: [0, -10, 0],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full"
                        animate={{
                          y: [0, -10, 0],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full"
                        animate={{
                          y: [0, -10, 0],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4
                        }}
                      />
                    </div>
                  )}
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="h-96 overflow-y-auto space-y-3 pr-2">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    >
                      <motion.div
                        className={`p-3 rounded-2xl max-w-xs relative overflow-hidden ${
                          msg.from === 'bot' 
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                        } ${msg.from === 'bot' ? 'bot-message' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {msg.from === 'bot' && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          />
                        )}
                        <div className="relative z-10 flex items-center space-x-2">
                          {msg.from === 'bot' && (
                            <motion.span
                              animate={{ rotate: [0, 20, 0] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              🤖
                            </motion.span>
                          )}
                          <p className="break-words whitespace-pre-line">
                            {msg.text.split('\n').map((line, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="block"
                              >
                                {line}
                              </motion.span>
                            ))}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isBotTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="p-3 rounded-2xl bg-gray-100 text-gray-800">
                      <div className="flex space-x-2 items-center">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          🤖
                        </motion.span>
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full"
                            animate={{
                              y: [0, -8, 0],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full"
                            animate={{
                              y: [0, -8, 0],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.2
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full"
                            animate={{
                              y: [0, -8, 0],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.4
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="relative">
                <motion.input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about products..."
                  className="w-full p-3 pr-12 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                  disabled={isBotTyping}
                  whileFocus={{ scale: 1.02 }}
                />
                <Button
                  onClick={handleSend}
                  disabled={isBotTyping}
                  className="absolute right-2 top-2 p-2 rounded-lg"
                >
                  <motion.div
                    className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg"
                    animate={{
                      scale: buttonGlow ? [1, 1.2, 1] : 1,
                      background: buttonGlow 
                        ? ['linear-gradient(to bottom right, #a855f7, #3b82f6)', 'linear-gradient(to bottom right, #3b82f6, #a855f7)', 'linear-gradient(to bottom right, #a855f7, #3b82f6)']
                        : 'linear-gradient(to bottom right, #a855f7, #3b82f6)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Send size={18} className="text-white" />
                  </motion.div>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}