import { defineType, defineField } from "sanity";

export const customerSchema = defineType({
  name: "customer",
  type: "document",
  title: "Customer",
  fields: [
    defineField({ name: "fullName", type: "string", title: "Full Name" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "phoneNumber", type: "string", title: "Phone Number" }),
    defineField({ name: "address", type: "string", title: "Address" }),
    defineField({ name: "city", type: "string", title: "City" }),
  ],
});

export const orderItemSchema = defineType({
  name: "orderItem",
  type: "object",
  title: "Order Item",
  fields: [
    defineField({ name: "name", type: "string", title: "Product Name" }),
    defineField({ name: "image", type: "string", title: "Product Image URL" }),
    defineField({ name: "quantity", type: "number", title: "Quantity" }),
    defineField({ name: "unitPrice", type: "number", title: "Unit Price" }),
    defineField({ name: "totalPrice", type: "number", title: "Total Price" }),
  ],
});

export const orderSchema = defineType({
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    defineField({ name: "orderId", type: "string", title: "Order ID" }),
    defineField({
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "orderItem" }],
      title: "Order Items",
    }),
    defineField({ name: "totalAmount", type: "number", title: "Total Amount" }),
    defineField({ name: "orderDate", type: "datetime", title: "Order Date" }),
    defineField({ name: "shippingAddress", type: "string", title: "Shipping Address" }),
    defineField({
      name: "status",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
  ],
});
