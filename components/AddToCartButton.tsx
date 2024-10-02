"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";

interface AddToCartProps {
  menuItemId: string;
  incrementItemQuantity: (menuItemId: string) => Promise<void>;
}

export default function AddToCartButton({
  menuItemId,
  incrementItemQuantity,
}: AddToCartProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div>
      <Icon
        icon="zondicons:add-solid"
        className="h-10 w-10 text-primary-500 text-gray-400  hover:cursor-pointer hover:text-green-500"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementItemQuantity(menuItemId);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
          });
        }}
      />
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
}
