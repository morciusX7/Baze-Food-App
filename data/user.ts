import { db } from "@/lib/db";

export const getUserByEmailnMatric = async (matric: string, email?: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email, matric },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch {
    return null;
  }
};
