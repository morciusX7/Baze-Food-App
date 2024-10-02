"use server";
import * as z from "zod";
import { CategorySchema, MenuItemSchema } from "@/schemas";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export const CreateCategory = async (
  values: z.infer<typeof CategorySchema>
) => {
  const validatedFields = CategorySchema.safeParse(values);
  const session = await auth();

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name } = validatedFields.data;

  const existingCategory = await db.foodCategory.findUnique({
    where: { name, restaurantId: session?.user?.id },
  });

  if (existingCategory) {
    return { error: "Category already exists" };
  }

  await db.foodCategory.create({
    data: { name, restaurantId: session?.user?.id },
  });

  return { success: "Category Created" };
};

export const GetCategory = async () => {
  const session = await auth();
  const categories = await db.foodCategory.findMany({
    where: { restaurantId: session?.user?.id },
    select: {
      name: true,
      id: true,
    },
  });

  return categories.map((category) => category);
};

export async function SelectCategory(id: string) {
  const category = await db.foodCategory.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return category;
}

export async function DeleteCategory(id: string) {
  try {
    await db.foodCategory.delete({
      where: {
        id: id,
      },
    });

    return { message: "Category Successfully Deleted" };
  } catch (error) {
    return { message: "Failed to Delete Category" };
  }
}

export const CreateMenuItem = async (
  values: z.infer<typeof MenuItemSchema>
) => {
  const validatedFields = MenuItemSchema.safeParse(values);
  const session = await auth();

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, price, quantity, category } = validatedFields.data;

  const existingMenuItem = await db.menuItem.findUnique({
    where: { name },
  });

  if (existingMenuItem) {
    return { error: "Menu Item already exists" };
  }

  await db.menuItem.create({
    data: { name, price, quantity, category, restaurantId: session?.user?.id },
  });

  return { success: "Menu Item Created" };
};

export const GetMenuItems = async () => {
  const session = await auth();
  const menuItems = await db.menuItem.findMany({
    where: {
      restaurantId: session?.user?.id,
    },
    select: {
      category: true,
      price: true,
      quantity: true,
      name: true,
      id: true,
    },
  });

  return menuItems.map((item) => item);
};

export const DeleteMenuItem = async (id: string) => {
  try {
    await db.menuItem.delete({
      where: {
        id: id,
      },
    });

    return { message: "Item Successfully Deleted" };
  } catch (error) {
    return { message: "Failed to Delete Item" };
  }
};
