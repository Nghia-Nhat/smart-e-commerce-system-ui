"use client";
import { useCurrentUser, useUpdateProfile } from "@/hooks/useUser";
import React, { useRef, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, LoaderIcon } from "lucide-react";
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
import { useSaveAvatar } from "@/hooks/useAuth";
import { getCurrentUsername } from "@/lib/user.util";
import { fetchAdminUpload } from "@/apiRequests/admin";

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
  avatar?: string;
}

const schema = z.object({
  full_name: z.string().min(1, "Name is required"),
  username: z.string().readonly(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

function ProfileContentPage({ user }: { user: UserProps }) {
  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: saveAvatar } = useSaveAvatar();

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

  const fileInputRef = useRef(null);
  const username = getCurrentUsername();

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const res = await fetchAdminUpload(file);
      const avtUrl = res.urls[0]
      saveAvatar({ avatar: avtUrl, username });
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
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
            <div className="relative flex flex-col items-center space-x-4">
              <div
                className=" absolute top-0 -right-2 cursor-pointer"
                title="Change avatar"
                onClick={handleEditClick}
              >
                <Edit className="h-5 w-5" />
              </div>
              <Avatar className="h-24 w-24 lg:h-48 lg:w-48">
                <AvatarImage
                  src={user?.avatar || "/images/avtUser.png"}
                  alt="Avatar"
                  className="object-cover"
                />
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
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
