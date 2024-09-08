import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteProduct } from "@/hooks/useAdmin";

export function AlertDeleteProduct({ id, name }: { id: string; name: string }) {
  const { mutate: deleteProduct } = useDeleteProduct()

  const handleRemoveItem = () => {
    deleteProduct(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} title="Delete">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to delete <span className="font-bold">{name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={handleRemoveItem}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
