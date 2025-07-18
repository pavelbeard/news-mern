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
import { useFetcher, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export default function NewsDeleteArchiveDialog() {
  const location = useLocation();
  const navigation = useNavigate();
  const fetcher = useFetcher();

  const goToHome = () => {
    navigation("/", { replace: true });
  };

  useEffect(() => {
    if (fetcher.state === "submitting") goToHome();
  }, [fetcher.state]);

  return (
    <AlertDialog>
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
            <fetcher.Form action={location.pathname} method="delete">
              <Button variant="destructive" type="submit">
                Delete
              </Button>
            </fetcher.Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
