import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { StudentLoginSchema, VendorLoginSchema } from "@/schemas";
import { getUserByEmailnMatric } from "./data/user";
import { getVendorByEmail } from "./data/vendor";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = StudentLoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { matric, password } = validatedFields.data;

          const user = await getUserByEmailnMatric(matric);

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const authConfig2 = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = VendorLoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const restaurant = await getVendorByEmail(email);

          if (!restaurant || !restaurant.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            restaurant.password
          );

          if (passwordsMatch) {
            return restaurant;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
