"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import { Billing, customerFormDetails } from "@/interface";
import { useState } from "react";
import CheckoutButton from "@/components/Checkoutbutton";

const BillingSummary = () => {
  const { cart, totalPrice } = useAppSelector((state: RootState) => state.carts);
  const [billingDetails, setBillingDetails] = useAtom<Billing>(customerFormDetails);
  const [errors, setErrors] = useState({ phoneNumber: false, email: false });

  const phoneRegex = /^[0-9]{11}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid = () => {
    const { fullName, phoneNumber, email, addressLine1, city } = billingDetails;
    return (
      fullName.trim() !== "" &&
      phoneRegex.test(phoneNumber) &&
      emailRegex.test(email) &&
      addressLine1.trim() !== "" &&
      city.trim() !== ""
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));

    if (name === "phoneNumber") {
      setErrors((prev) => ({ ...prev, phoneNumber: !phoneRegex.test(value) }));
    }
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: !emailRegex.test(value) }));
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen max-w-[800px] mx-auto text-black p-8 shadow-xl rounded-3xl border border-gray-300">
      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <Link href="/cart" className="text-gray-700 hover:text-gray-900 transition-all flex items-center">
            <FaArrowLeft className="text-lg sm:text-xl" />
            <span className="ml-2 text-lg font-semibold">Back to Cart</span>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 backdrop-blur-md">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >Billing Details</motion.h2>
          
          <motion.form className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {["fullName", "phoneNumber", "email", "addressLine1", "city"].map((field, index) => (
              <motion.div key={field} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                <input
                  type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  value={billingDetails[field as keyof Billing]}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition bg-white hover:bg-gray-100 ${errors[field as keyof typeof errors] ? 'border-red-500' : ''}`}
                  required
                />
                {errors[field as keyof typeof errors] && (
                  <motion.span className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Invalid {field === "phoneNumber" ? "phone number" : "email address"}.
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.form>

          <div className="mt-8 flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
              <CheckoutButton disabled={!isFormValid()} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BillingSummary;
