"use client";

import { CartItemWithMenuItems } from "@/actions/order";
import { Select } from "@/components/ui/select";
import { formatPrice } from "@/lib/format";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithMenuItems;
  setProdctQuantity: (menuItemId: string, quantity: number) => Promise<void>;

}

export default function CartEntry({
  cartItem: { menuItem, quantity },
  setProdctQuantity,
}: CartEntryProps) {
  const [isPending, startTrasition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i < 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center gap-3">
        <div>{menuItem.name}</div>
        <div>{formatPrice(menuItem.price)}</div>
        <div>
          <select
            className="bg-white w-full max-w-[30px]"
            defaultValue={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);
              startTrasition(async () => {
                await setProdctQuantity(menuItem.id, newQuantity);
              });
            }}
          >
            <option value={0}>0 (Remove)</option>
            {quantityOptions}
          </select>
        </div>
        <div>
          {formatPrice(menuItem.price * quantity)}
          {isPending && <span className="loading loading-spinner loading-xs" />}
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
