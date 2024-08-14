"use client";
import { useCurrentUser, useUpdateProfile } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <LoaderIcon className="animate-spin mt-10" />
      </div>
    );
  return <ProfileContentPage user={user} />;
}

interface UserProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
}

const schema = z.object({
  full_name: z.string().min(1, "Name is required"),
  username: z.string().readonly(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

function ProfileContentPage( { user } : { user: UserProps}) {
  const { mutate: updateProfile } = useUpdateProfile();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: user?.name,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    updateProfile(data);
  };

  return (
    <div className="md:px-16">
      <div className="flex md:px-5 mb-10">
        <div className="flex gap-5 items-center mb-5">
          <div className="bg-orange-500 w-2 h-10 rounded-md"></div>
          <h2 className="text-orange-500 font-bold text-2xl">Profile</h2>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:grid grid-cols-4 gap-20 mx-auto"
        >
          <header className="space-y-1">
            <div className="flex flex-col items-center space-x-4">
              <Avatar className="h-24 w-24 lg:h-48 lg:w-48">
                <AvatarImage src="/images/avtUser.png" alt="Avatar" />
              </Avatar>
              <div className="space-y-1.5 text-center mt-4">
                <h1 className="text-2xl font-bold italic">@{user.username}</h1>
              </div>
            </div>
          </header>
          <div className="mt-10 md:mt-0 space-y-6 col-span-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <div className="flex flex-col lg:grid grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Phone</FormLabel>
                      <Input
                        placeholder="Enter your phone"
                        type="tel"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Address</FormLabel>
                      <Textarea placeholder="Enter your address" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-8">
              <Button size="lg" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
