import { useState } from "react";
import { Popover, PopoverContent } from "./popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { currentTime } from "@/utils/current-time";

export default function DatePicker<T extends FieldValues>({
  props,
}: {
  props: ControllerRenderProps<T>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!props.value}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
        >
          <CalendarIcon />
          {props.value ? (
            format(currentTime(props.value), "yyyy-MM-dd HH:mm")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
          {...props}
          mode="single"
          selected={new Date(props.value)}
          onSelect={(date) => {
            props.onChange(currentTime(date as Date).toISOString());
            setOpen(false);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
