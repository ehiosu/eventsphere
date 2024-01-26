
import { format } from "date-fns";
import { Button } from "../ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export function DatePickerForm({form,name,label,description,className}:{form:any,name:string,label:string,description:string,className:string}) {
    return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={cn("flex flex-col ",className)}>
                <FormLabel className="dark:text-neutral-700 text-neutral-700">{label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-500 hover:text-neutral-500 font-normal dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent",
                          !field.value && ""
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 dark:bg-neutral-100 bg-neutral-100 dark:text-neutral-500 text-neutral-500" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                        
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() 
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

    )
  }