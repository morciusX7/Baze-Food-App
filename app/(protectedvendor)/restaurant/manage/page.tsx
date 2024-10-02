"use client";

import {
  CreateCategory,
  GetCategory,
  SelectCategory,
  DeleteCategory,
  CreateMenuItem,
  GetMenuItems,
  DeleteMenuItem,
} from "@/actions/category";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { CategorySchema, MenuItemSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";

const ManageRestaurant = () => {
  const session = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    GetCategory().then((data) => setCategories(data));
    GetMenuItems().then((data) => setItems(data));
  }, []);

  const handleSelectCategory = (id: string) => {
    SelectCategory(id).then((data) => setSelectedCategory(data));
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      DeleteCategory(selectedCategory.id).then(() => {
        setCategories(
          categories.filter((category) => category.id !== selectedCategory.id)
        );
        setSelectedCategory(null);
      });
    }
  };

  const handleDeleteMenuItem = (id: string) => {
    // Call API to delete menu item
    DeleteMenuItem(id).then(() => {
      // Update menu items state
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const itemform = useForm<z.infer<typeof MenuItemSchema>>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      CreateCategory(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    form.reset();
  };

  const AddMenuItem = (values: z.infer<typeof MenuItemSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      CreateMenuItem(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    form.reset();
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Dialog>
        <DialogTrigger className="flex flex-row items-center justify-center bg-gray-300 p-8 w-[70%] text-lg mt-[5%] text-center hover:cursor-pointer rounded-2xl">
          <Icon
            icon="lets-icons:add-duotone"
            className="h-10 w-10 text-primary-500"
          />
          Add a Category
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Add a Category</DialogTitle>
            <DialogDescription>
              This will add a meal category of ur choice
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Snacks"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />

              <DialogFooter>
                <Button type="submit">Add Category</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-row justify-center gap-2 items-center m-5 ">
        {categories.map((category) => (
          <Button
            key={category.id}
            className={cn(
              "flex flex-row items-center justify-center p-2 bg-gray-400 hover:bg-green-300 hover:text-black rounded-2xl my-2",
              selectedCategory?.id === category.id && "bg-green-500 text-white"
            )}
            onClick={() => handleSelectCategory(category.id)}
          >
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4 items-center w-[100%] h-[50vh] overflow-auto">
        {selectedCategory?.name === "All"
          ? items.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-center justify-around bg-white gap-2 w-[70%] p-5 rounded-xl"
              >
                <span>{item.name}</span>
                <span>{item.price} $</span>
                <span>{item.quantity} units</span>
                <Icon
                  icon="mdi-trash"
                  className="h-10 w-10 text-primary-500  hover:cursor-pointer hover:text-red-500"
                  onClick={() => handleDeleteMenuItem(item.id)}
                />
              </div>
            ))
          : items
              .filter((item) => item.category === selectedCategory?.name)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center justify-around bg-white gap-2 w-[70%] p-5 rounded-xl"
                >
                  <span>{item.name}</span>
                  <span>{item.price} $</span>
                  <span>{item.quantity}</span>
                  <Icon
                    icon="mdi-trash"
                    className="h-10 w-10 text-primary-500  hover:cursor-pointer hover:text-red-500"
                    onClick={() => handleDeleteMenuItem(item.id)}
                  />
                </div>
              ))}
      </div>

      <div className="flex flex-row gap-2 mt-10">
        <Button
          className="flex flex-1 px-36 bg-green-600 py-6 rounded-xl"
          onClick={handleDeleteCategory}
        >
          <Icon
            icon="lets-icons:trash-duotone"
            className="h-6 w-6 text-primary-500 hover:text-red-500"
          />
          Delete Categry
        </Button>
        <Dialog>
          <DialogTrigger className="flex flex-row items-center bg-slate-400 px-24 py-1 rounded-xl">
            <Icon
              icon="lets-icons:add-duotone"
              className="h-10 w-10 text-primary-500"
            />
            Add Product to Category
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Please Add a Product to the selected Category
              </DialogTitle>
              <DialogDescription>
                This will add a product of ur choice
              </DialogDescription>
            </DialogHeader>
            <Form {...itemform}>
              <form onSubmit={itemform.handleSubmit(AddMenuItem)}>
                <div>
                  <FormField
                    control={itemform.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Snacks"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={itemform.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="$10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={itemform.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={itemform.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />

                <DialogFooter>
                  <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageRestaurant;
