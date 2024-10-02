"use server";
import { auth } from "@/auth";

import { PrismaClient, Cart, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { cookies } from "next/dist/client/components/headers";

export async function incrementProductQuantity(menuItemId: string) {
  const prisma = new PrismaClient();
  const cart = (await getCart()) ?? (await CreateCart());

  const itemInCart = cart.items.find((item) => item.menuItemId === menuItemId);

  if (itemInCart) {
    await prisma.cartItem.update({
      where: { id: itemInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        menuItemId,
        quantity: 1,
      },
    });
  }

  revalidatePath("/restaurant/dashboard");
}

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { menuItem: true } } };
}>;

export type CartItemWithMenuItems = Prisma.CartItemGetPayload<{
  include: { menuItem: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await auth();
  const prisma = new PrismaClient();

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { restaurantId: session.user?.id },
      include: { items: { include: { menuItem: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { menuItem: true } } },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.menuItem.price,
      0
    ),
  };
}

export async function CreateCart(): Promise<ShoppingCart> {
  let newCart: Cart;
  const prisma = new PrismaClient();
  const session = await auth();

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        restaurantId: session.user?.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    cookies().set("localCartId", newCart.id);
  }

  //Note: Nedds encryption + security

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function SetProductQuantity(menuItemId: string, quantity: number) {
  const prisma = new PrismaClient();
  const cart = (await getCart()) ?? (await CreateCart());
  const itemInCart = cart.items.find((item) => item.menuItemId === menuItemId);

  if (quantity === 0) {
    if (itemInCart) {
      await prisma.cartItem.delete({ where: { id: itemInCart.id } });
    }
  } else {
    if (itemInCart) {
      await prisma.cartItem.update({
        where: { id: itemInCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          menuItemId,
          quantity,
        },
      });
    }
  }

  revalidatePath("/restaurant/dashboard");
}

export const GetVendorEmail = async () => {
  const prisma = new PrismaClient();
  const session = await auth();
  const vendor = await prisma.restaurant.findUnique({
    where: { id: session?.user?.id },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });

  return vendor?.email;
};
