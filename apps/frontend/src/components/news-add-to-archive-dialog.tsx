import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "./ui/button";
import { ArchiveIcon } from "lucide-react";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useAddToArchive } from "@/lib/hooks/news/use-add-to-archive";

export default function NewsAddToArchiveDialog() {
  const { onSubmit, isLoading, isError, isOpen, setIsOpen } = useAddToArchive();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <ArchiveIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to move that news to archive?
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
              <Button
                type="submit"
                className="bg-amber-100 border-gray-600 text-black hover:bg-amber-300"
              >
                Continue
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
