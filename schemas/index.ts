import * as z from "zod";

export const VendorLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const StudentLoginSchema = z.object({
  matric: z.string().min(5, {
    message: "Matriculation Number is Required",
  }),
  password: z.string({
    message: "Password is Required",
  }),
});

export const CategorySchema = z.object({
  name: z.string({
    message: "Category Name is required",
  }),
});

export const MenuItemSchema = z.object({
  name: z.string().min(1, {
    message: "Menu Item Name is required",
  }),
  price: z.number().min(1, {
    message: "Price is required and must be a positive number",
  }),
  quantity: z
    .number()
    .min(0, {
      message: "Quantity is required and must be a positive number",
    }),
  category: z.string(),
});

export const CartItemSchema = z.object({
  menuItemId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  totalPrice: z.number(),
});

export const StudentRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is Required",
  }),
  matric: z.string().min(5, {
    message: "Matriculation Number is Required",
  }),
  password: z.string().min(5, {
    message: "Minimum 5 characters is required",
  }),
});

export const VendorRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(5, {
    message: "Minimum 5 characters is required",
  }),
});
