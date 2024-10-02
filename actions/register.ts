"use server";
import * as z from "zod";
import { VendorRegisterSchema, StudentRegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { revalidatePath, revalidateTag } from "next/cache";
import { getUserByEmailnMatric } from "@/data/user";

export const studentRegister = async (
  values: z.infer<typeof StudentRegisterSchema>
) => {
  const validatedFields = StudentRegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, matric, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmailnMatric(matric, email);

  if (existingUser) {
    return { error: "Email or Matriculation already exists" };
  }

  await db.user.create({
    data: {
      email,
      matric,
      name,
      password: hashedPassword,
    },
  });

  // SEND VERIFICATION TOKEN EMAIL

  return { success: "User Created" };
};

export const vendorRegister = async (
  values: z.infer<typeof VendorRegisterSchema>
) => {
  const validatedFields = VendorRegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.restaurant.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already exists" };
  }

  await db.restaurant.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // SEND VERIFICATION TOKEN EMAIL

  return { success: "Restaurant Created" };
};
