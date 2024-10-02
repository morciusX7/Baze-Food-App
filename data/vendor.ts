import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getVendorByEmail = async (email: string) => {
  try {
    const vendor = await db.restaurant.findUnique({
      where: { email },
    });

    return vendor;
  } catch {
    return null;
  }
};

export const getVendorById = async (id: string) => {
  try {
    const vendor = await db.restaurant.findUnique({
      where: { id },
    });

    return vendor;
  } catch {
    return null;
  }
};
