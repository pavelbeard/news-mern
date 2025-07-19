import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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
import { useEditNews } from "@/lib/hooks/news/use-edit-news";
import { useLoaderData } from "react-router";
import { INewsObject__Database } from "@/lib/types/news";

export default function NewsEditArticleDialog({
  className,
}: {
  className?: string;
}) {
  const data = useLoaderData<INewsObject__Database>();
  const { _id, ...defaultData } = data.object;
  const { form, onSubmit, isOpen, setIsOpen } = useEditNews(
    defaultData as INewsObject__Database["object"]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <Button variant="secondary" size="icon">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit News Item</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <section className="space-y-4">
                <FormField
                  control={form.control}
                  name="data.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.replace(/data./, "").capitalize()}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.replace(/data./, "").capitalize()}
                      </FormLabel>
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
                    name="data.date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {field.name.replace(/data./, "").capitalize()}
                        </FormLabel>
                        <FormControl>
                          <DatePicker props={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="data.author"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {field.name.replace(/data./, "").capitalize()}
                        </FormLabel>
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
                  name="data.content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.replace(/data./, "").capitalize()}
                      </FormLabel>
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
                Save
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
