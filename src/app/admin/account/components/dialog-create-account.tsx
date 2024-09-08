import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, PlusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAdminAccount, useAdminRegister } from "@/hooks/useAdmin";

export default function DialogCreateAccount() {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Account
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account action</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="create" className="w-[400px]">
          {/* <TabsList>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="role">Set Role</TabsTrigger>
          </TabsList> */}
          <TabsContent value="create">
            <CreateTab setOpen={handleCloseModal} />
          </TabsContent>
          <TabsContent value="role">
            <RoleTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function CreateTab({ setOpen }: { setOpen: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const signUpSchema = z
    .object({
      full_name: z
        .string()
        .min(1, "Full name is required")
        .max(30, "Full name must not be at greater 30 characters"),
      username: z
        .string()
        .min(1, "Username is required")
        .max(30, "Username must not be at greater 30 characters"),
      role: z.string().min(1, "Role is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Confirm password must be at least 6 characters"),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      },
    );

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      username: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { control, handleSubmit } = form;
  const { mutate: register } = useAdminRegister();

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    register(data);
    setOpen();
    setIsLoading(false);
  }

  return (
    <div className="p-5 pl-0">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="grid gap-2 mb-2">
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="grid gap-2 mb-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="grid gap-2 mb-2">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SELLER">Seller</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2 mb-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2 mb-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="flex gap-2 w-full"
            type="submit"
          >
            {isLoading && <Loader className="animate-spin" />}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}

function RoleTab() {
  return "Role tab";
}
