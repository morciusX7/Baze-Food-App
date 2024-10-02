"use client";

import { auth, signOut } from "@/auth";
import Image from "next/image";
import Ad from "../../../BrimAd.png";
import { useEffect, useState, useTransition } from "react";
import { GetCategory, GetMenuItems, SelectCategory } from "@/actions/category";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { CartItemSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaystackButton } from "react-paystack";
import AddToCartButton from "@/components/AddToCartButton";
import {
  GetVendorEmail,
  incrementProductQuantity,
  SetProductQuantity,
  ShoppingCart,
} from "@/actions/order";
import { CreateCart, getCart } from "@/actions/order";
import CartEntry from "../cartEntry";
import { formatPrice } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function VendorDashboard() {
  const publicKey = "pk_test_efb87d5488a78002b56eadd65856dba7d10fe000";
  const session = useSession();
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [cart, setCart] = useState<ShoppingCart | null>();
  const [email, setEmail] = useState<any>();

  useEffect(() => {
    GetCategory().then((data) => setCategories(data));
    GetMenuItems().then((data) => setItems(data));
    getCart().then((data) => setCart(data));
    GetVendorEmail().then((data) => setEmail(data));
  }, []);

  const handleSelectCategory = (id: string) => {
    SelectCategory(id).then((data) => setSelectedCategory(data));
  };

  const amount = cart?.subtotal || 0;

  const config = {
    public_key: "FLWPUBK_TEST-7c89cf1c0c1cc342419a74c18a869077-X",
    tx_ref: Date.now().toString(),
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: "070********",
      name: "Counter",
    },
    customizations: {
      title: "Food Payment",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="flex flex-row w-full gap-36 flex-grow h-full items-center">
      <div className="flex flex-col gap-4 items-start ml-20 mb-20">
        <Image width={710} src={Ad} alt="" />
        <div>
          <h4 className="text-slate-400 font-bold">Welcome</h4>
          <span className="text-3xl font-bold">
            {session?.data?.user?.name}
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 w-[90%] h-[100%]">
          <div className="flex flex-row justify-center gap-2 items-center ">
            {categories.map((category) => (
              <Button
                key={category.id}
                className={cn(
                  "flex flex-row w-24 items-center justify-center p-2 bg-gray-400 hover:bg-green-300 hover:text-black rounded-2xl my-2",
                  selectedCategory?.id === category.id &&
                    "bg-green-500 text-white"
                )}
                onClick={() => handleSelectCategory(category.id)}
              >
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center w-[100%] h-[45vh] overflow-auto">
            {selectedCategory?.name === "All"
              ? items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-center justify-around bg-white gap-2 w-[100%] hover:cursor-pointer p-5 rounded-xl"
                  >
                    <span>{item.name}</span>
                    <span>{item.price} $</span>
                    <span>{item.quantity}</span>
                    <AddToCartButton
                      menuItemId={item.id}
                      incrementItemQuantity={incrementProductQuantity}
                    />
                  </div>
                ))
              : items
                  .filter((item) => item.category === selectedCategory?.name)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row items-center justify-around bg-white gap-2 w-[100%] p-5 hover:cursor-pointer rounded-xl"
                    >
                      <span>{item.name}</span>
                      <span>{item.price} $</span>
                      <span>{item.quantity}</span>
                      <AddToCartButton
                        menuItemId={item.id}
                        incrementItemQuantity={incrementProductQuantity}
                      />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[38%] h-[43rem] gap-4">
        <div className="flex flex-col bg-white w-[100%] items-start pl-6 pt-4  h-[100%] rounded-xl">
          <h1 className="text-2xl font-bold">Cart</h1>
          <div>
            {cart?.items.map((cartItem) => (
              <CartEntry
                cartItem={cartItem}
                key={cartItem.id}
                setProdctQuantity={SetProductQuantity}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly bg-white w-[100%] h-[40%] rounded-2xl">
          <div className="flex flex-row justify-between gap-36">
            Total:
            <span>{formatPrice(cart?.subtotal || 0.0)}</span>
          </div>

          <Separator />

          <div className="flex flex-row justify-between gap-48">
            Discount:
            <span>{parseFloat("0.00")}</span>
          </div>
          <Separator />

          <div className="flex flex-row justify-between gap-28">
            Grand Total:
            <span>{formatPrice(cart?.subtotal || 0.0)}</span>
          </div>

          <Separator />

          <Button
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response.status);
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
