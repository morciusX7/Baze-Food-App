"use server";
import * as z from "zod";
import { VendorLoginSchema, StudentLoginSchema } from "@/schemas";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";

export const studentLogin = async (
  values: z.infer<typeof StudentLoginSchema>
) => {
  const validatedFields = StudentLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { matric, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      matric,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }

  return { success: "Valid Fields" };
};

export const vendorLogin = async (
  values: z.infer<typeof VendorLoginSchema>
) => {
  const validatedFields = VendorLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }

  return { success: "Valid Fields" };
};

export const GetUser = async (id: string) => {
  const categories = await db.restaurant.findUnique({
    where: { id },
    select: {
      name: true,
    },
  });
};
