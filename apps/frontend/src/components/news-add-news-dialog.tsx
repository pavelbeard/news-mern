import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useSaveNews } from "@/lib/hooks/news/use-save-news";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import DatePicker from "./ui/date-picker";

export default function NewsAddNewsDialog({
  className,
}: {
  className?: string;
}) {
  const { form, onSubmit, isOpen, setIsOpen, isError } = useSaveNews();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <Button>
          <PlusIcon /> Add news?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add News Item</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <section className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{field.name.capitalize()}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{field.name.capitalize()}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div
                  aria-label="input group"
                  className="flex items-center gap-2"
                >
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{field.name.capitalize()}</FormLabel>
                        <FormControl>
                          <DatePicker props={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{field.name.capitalize()}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{field.name.capitalize()}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="max-h-[400px] overflow-y-auto"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <Button disabled={!form.formState.isValid} type="submit">
                Add news
              </Button>
              {isError && (
                <p className="text-red-500">
                  An error occurred while saving the news. Please try again.
                </p>
              )}
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
