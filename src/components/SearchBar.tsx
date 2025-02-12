"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/interface";


interface SearchModalProps {
  onClose: () => void;
}

export default function SearchBar({ onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setIsLoading(true);
        const query = `*[_type == "products" && name match "${searchTerm}*"]{
          _id,
          name,
          description,
          price,
      "imageUrl": image.asset->url,
      category,
      discountPercent,
      "isNew": new,
      colors,
      sizes,
      "slug": slug.current
        }`;
        client.fetch(query).then((results: Product[]) => {
          setSuggestions(results);
          setIsLoading(false);
        });
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSuggestionClick = (productId: string) => {
    router.push(`/shop/${productId}`);
    onClose();
  };

  return (
    <div className="">
      <div
        ref={modalRef}
        className=""
      >
        <div className="flex justify-between items-center mb-6">
         
         
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
           placeholder="Search by product name..."
           name="search"                          
           className="bg-transparent placeholder:text-black/40"
        />
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <div
              className="animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-gray-200"
              style={{ borderTopColor: "#B88E2F" }}
            ></div>
          </div>
        )}
        {suggestions.length > 0 && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            {suggestions.map((product) => (
              <Link
                key={product._id}
                href={`/shop/product/${product._id}`}
                className="flex items-center p-3 mb-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => handleSuggestionClick(product._id)}
              >
                <Image
                  src={urlFor(product.imageUrl).url() || "/placeholder.svg"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="mr-4 rounded-md shadow-sm"
                />
                <span className="text-lg font-medium text-gray-800">
                  {product.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}