import { atom } from "jotai";
import { DetailPreview } from "sanity";
import { atomWithStorage } from "jotai/utils";

export interface Product {
    quantity: any;
    name: string; 
    category: 'tshirt' | 'short' | 'jeans' | 'hoodie' | 'shirt';
    description: string; // Product description
    image: string; // URL of the product image
    id: string; // Unique identifier for the product
    colors: ('Blue' | 'White' | 'Black' | 'Red')[]; // Array of available colors
    sizes: string[]; // Array of available sizes
    price: number; // Product price
    discountPercent: number; // Discount percentage
    isNew: boolean; // Indicates if the product is new or not
    _id: string; // Unique identifier for the product
  }
  
  // export interface BillingDetails {
  //   fullName: string;
  //   phoneNumber: string;
  //   email: string;
  //   addressLine1: string;
  //   addressLine2?: string; 
  //   city: string;
  //   zipcode: string;
  //   country: string;
  // }
  
  
  
  export interface ProductDetail {
    name: string;
    imageUrl: string;
    Finalprice: number;
    Quantity: number;
  }
  
  export interface Billing{
    fullName: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
  }
  
  export interface Order {
    customerDetails: Billing;
    cartItems: ProductDetail[];
    totalAmount: number;
  }



 const initialBillingDetails: Billing = {
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
 
  }

export const customerFormDetails = atom<Billing>(initialBillingDetails);




