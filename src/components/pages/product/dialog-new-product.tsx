import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ImageIcon, Loader, Plus, PlusCircle, X } from "lucide-react";
import { fetchAdminCreateProduct, fetchAdminUpload } from "@/apiRequests/admin";
import { useToast } from "@/components/ui/use-toast";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  locationId: z.string({
    required_error: "Please select a location.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
});

export default function DialogNewProduct({refetch}: {refetch: () => void}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [previews, setPreviews] = useState<string[] | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      locationId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!files) return alert("At least one image");
    setIsLoading(true);
    const uploadImages = await fetchAdminUpload(files);

    const formatData = {
      productTitle: values.name,
      price: values.price,
      category: values.category,
      imageURL: uploadImages.urls[0],
      images: uploadImages.urls,
      productType: null,
      discount: null,
      stock: null,
      usage: null,
      colour: null,
      subCategory: null,
      locationId: values.locationId,
    };
    const result = await fetchAdminCreateProduct(formatData);
    if (result) {
      setOpen(false);
      setFiles(null);
      setPreviews(null);
      setIsLoading(false);
      refetch();
      toast({
        variant: "success",
        description: "Create Product successfully",
      });
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const newPreviews = acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(newPreviews).then((results) => {
      setPreviews(results);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxFiles: 7,
  });

  const handleCloseModal = () => {
    setOpen(!open);
    setFiles(null);
    setPreviews(null);
    setIsLoading(false);
    form.reset();
  };

  const handleResetForm = (e: any) => {
    e.preventDefault();
    setFiles(null);
    setPreviews(null);
    form.reset();
  };

  const removeImageByIndex = (indexToRemove: number) => {
    setPreviews((prevPreviews) => {
      if (prevPreviews) {
        return prevPreviews.filter((_, index) => index !== indexToRemove);
      }
      return [];
    });
    setFiles((prevFiles) => {
      if (prevFiles) {
        return prevFiles.filter((_, index) => index !== indexToRemove);
      }
      return [];
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter product price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HN">Ha Noi</SelectItem>
                        <SelectItem value="DN">Da Nang</SelectItem>
                        <SelectItem value="HCM">Ho Chi Minh</SelectItem>
                        <SelectItem value="VT">Vung Tau</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div>
              <FormLabel>Images</FormLabel>
              <Input type="file" multiple onChange={handleChangeFile} />
            </div> */}
            <div>
              <FormLabel>Images</FormLabel>
              <div className="mt-2 grid grid-cols-5 gap-4">
                {previews &&
                  previews.map((imageSrc, index) => (
                    <div className="relative" key={index}>
                      <X
                        className="absolute top-0 -right-2 h-4 w-4 cursor-pointer"
                        onClick={() => removeImageByIndex(index)}
                      />
                      <Image
                        src={imageSrc}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="object-contain w-full aspect-square"
                      />
                    </div>
                  ))}
                <input {...getInputProps()} />
                {previews?.length !== 7 && (
                  <div
                    className="border-4 border-dashed flex justify-center items-center rounded-sm aspect-square cursor-pointer"
                    {...getRootProps()}
                  >
                    <Plus className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant={"outline"}
                className="flex gap-2"
                onClick={handleResetForm}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isLoading} className="flex gap-2">
                {isLoading && <Loader className="animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
