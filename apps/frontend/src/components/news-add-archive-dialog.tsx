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
import { Form, useLocation } from "react-router";

export default function NewsAddArchiveDialog() {
  const location = useLocation();

  return (
    <AlertDialog>
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
            <Form
              action={location.pathname.replace(/news/, "news-archive")}
              method="patch"
            >
              <Button
                type="submit"
                className="bg-amber-100 border-gray-600 text-black hover:bg-amber-300"
              >
                Continue
              </Button>
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
