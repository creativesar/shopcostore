import { client } from "@/sanity/lib/client";
import { Product } from "@/interface";
import ProductCard from "@/components/common/ProductCard";
import * as motion from "framer-motion/client";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
});

const PRODUCTS_PER_PAGE = 12;

async function getNewArrivals() {
  // Get total count first
  const countQuery = `count(*[_type == "products"])`;
  const totalProducts = await client.fetch(countQuery);
  
  // Calculate random skip
  const randomSkip = Math.max(0, Math.floor(Math.random() * (totalProducts - 12)));
  
  const query = `*[_type == "products"][${randomSkip}...${randomSkip + 12}] { 
    _id,
    name,
    price,
    image,
    discountPercent,
    "new": new,
    colors,
    sizes
  }`;

  const products = await client.fetch(query);
  return products;
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <div className="flex flex-col w-full space-y-12">
          <div className="flex items-center justify-center pt-8 overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.7,
                ease: "easeOut"
              }}
              className={`${poppins.className} font-black text-4xl md:text-5xl lg:text-7xl text-center relative`}
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [-2, 2, -2, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="inline-block bg-gradient-to-br from-black via-gray-700 to-black bg-clip-text text-transparent 
                          hover:from-gray-800 hover:to-black transition-all duration-300 
                          shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                New Arrivals
              </motion.div>
            </motion.h1>
          </div>
          <motion.div 
            className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {products.map((product: Product, index: number) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <ProductCard id={product._id} data={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
