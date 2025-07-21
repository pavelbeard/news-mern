import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useDeleteArchive } from "@/lib/hooks/news/use-delete-archive";

export default function NewsDeleteArchiveDialog() {
  const { isLoading, isError, onSubmit, isOpen, setIsOpen } =
    useDeleteArchive();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <XIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to delete that archive news?
          </AlertDialogTitle>
          <AlertDialogDescription>
            That action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-4">
          <AlertDialogCancel asChild>
            <Button>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <form onSubmit={onSubmit}>
              <Button variant="destructive" type="submit">
                Delete
              </Button>
              {isLoading && <p className="text-gray-500 text-xs">Loading...</p>}
              {isError && <p className="text-red-500">An error occurred...</p>}
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
