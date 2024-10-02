"use client";

import { CardWrapper } from "@/app/student/auth/card-wrapper";
import { Button } from "../ui/button";
import { StudentLoginButton } from "./student-login-button";
import { VendorLoginButton } from "./vendor-login-button";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StudentLoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { studentLogin } from "@/actions/login";

export const StudentLoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof StudentLoginSchema>>({
    resolver: zodResolver(StudentLoginSchema),
    defaultValues: {
      matric: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof StudentLoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      studentLogin(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="SIGN IN"
      backButtonLabel="Don't have an Account?"
      backButtonHref="/student/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="matric"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matric Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Enter Matric Number"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passwrd</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="*****"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
