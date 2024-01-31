"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { DatePickerForm } from "./datepicker";
import { Checkbox } from "../ui/checkbox";
import {  useState } from "react";
import { Button } from "../ui/button";
import {
  Category,
  createEventFormObject,
  createEventFromType,
} from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { fetchCategories } from "@/lib/functions";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Link from "next/link";
import CreateCategoryForm from "./CreateCategoryForm";
import FileUploader from "./fileUploader";
import {  useUser } from "@clerk/nextjs";
import {  createEventProps, refreshEvents } from "@/lib/actions/event.actions";
import { toast } from "../ui/use-toast";


export const CreateEventForm = ({categories,submitForm}:{categories:Category[],submitForm:(values:createEventProps)=>{}}) => {
  const [canInputPrice, setCanInputPrice] = useState<boolean | undefined>(
    false
  );
  const [imageSrc, setImageSrc] = useState<string>("");
  const [filteredCategory,setFilteredCategory]=useState<string>("")
  const {user}=useUser()
  const form = useForm<createEventFromType>({
    mode: "onChange",
    resolver: zodResolver(createEventFormObject),
  });
  async function onSubmit(values: createEventFromType) {
    console.log("submitted");
  try{
    const event = await submitForm({...values,organizer:{username:user?.username || user?.primaryEmailAddress?.emailAddress || " "as string},ownerId:user?.id as string})
    if(event){
      refreshEvents()
      toast({
        title:"Success!",
        description:"Event Created Successfully!",
        className:"bg-white dark:bg-white dark:border-custom-yellow border-custom-yellow text-neutral-700 dark:text-neutral-700 border-2 "
      })
    }
    else{
      toast({
        title:"Error!",
        description:"Failed to create event",
        variant:"destructive"
      })
    }
    
  }
  catch(err){
    toast({
      title:"Error!",
      description:"Failed to create event",
      variant:"destructive"
    })
  }
}


  const toggleIsFree = (field: any, value: boolean | undefined) => {
    field.onChange(value);
    setCanInputPrice(value);
  };

  return (
    <div className="w-full p-2 text-neutral-700 dark:text-neutral-700 ">
      <Form {...form}>
        <form>
          <FormField
          
            control={form.control}
            name="event_title"
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel className="dark:text-neutral-700">
                    Event Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Name of the Event"
                    {...field}
                    className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem >
                  <FormLabel className="dark:text-neutral-700">
                    Event Desription
                  </FormLabel>
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          {imageSrc.length > 0 ? (
           <div className="flex flex-col gap-3 my-3">
            <p className="text-[0.8275rem] dark:text-neutral-700  font-semibold">Event Image</p>
             <img
              src={imageSrc}
              className="w-full object-contain aspect-video "
              alt="event image"
            />
           </div>
          ) : (
            <FormField
              control={form.control}
              name="event_image"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="dark:text-neutral-700">
                      Event Image
                    </FormLabel>
                    <FileUploader
                      imageSrc={imageSrc}
                      onFieldChange={field.onChange}
                      setImageSrc={setImageSrc}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          )}

          <DatePickerForm
            className="flex-1 my-3 "
            form={form}
            name="event_start_date"
            label="Event Date"
            description="Date the Event is to hold."
          />

          <FormField
            control={form.control}
            name="event_location"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="">Event Location</FormLabel>
                  <Input
                    type="text"
                    placeholder="2a XYZ Street"
                    {...field}
                    className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="">Event Price</FormLabel>
                  <Input
                    type="text"
                    placeholder="20,000"
                    disabled={canInputPrice}
                    {...field}
                    onChange={field.onChange}
                    className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                  />
                  <FormDescription>Currency is in NGN</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => {
              return (
                <FormItem className="my-2 flex items-end gap-2">
                  <FormLabel className="mt-2">Is This event Free?</FormLabel>
                  <FormControl className="">
                    <Checkbox
                      checked={field.value}
                      className="border-2 dark:aria-checked:bg-custom-yellow p-x-1 h-4 w-4  dark:data-[state=checked]:text-white dark:text-white dark:data-[state=checked]:bg-custom-yellow dark:border-custom-yellow "
                      defaultChecked={field.value}
                      onCheckedChange={(value: boolean) => {
                        toggleIsFree(field, value);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="tickets_available"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="">Available Tickets</FormLabel>
                  <Input
                    type="number"
                    placeholder="1000"
                    {...field}
                    className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={""}>
                  <FormControl>
                    <SelectTrigger className="w-full dark:bg-neutral-100 bg-neutral-100 dark:focus:bg-neutral-200 focus:bg-neutral-200 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent">
                      <SelectValue placeholder="Select a category for your Event " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:bg-neutral-100 dark:border-none border-none bg-neutral-100">
                    {/* {getCategoriesQuery.isSuccess && getCategoriesQuery.data.map((category:Category) => {
                      return (
                        <SelectItem className="dark:bg-neutral-200 bg-neutral-200 dark:hover:bg-neutral-300 hover:bg-neutral-300 text-black" value={category.id} key={category.id}>
                          {category.category_title}
                        </SelectItem>
                      );
                    })}
                    {getCategoriesQuery.isSuccess &&getCategoriesQuery.data.length == 0 && (
                      <p className="text-neutral-400 text-[0.8275rem] h-20 place-items-center grid">
                        No Categories Available
                      </p>
                    )}
                    {
                      getCategoriesQuery.isLoading && <div className="flex flex-col gap-2">
                        <Skeleton className="w-full h-8"/>
                      <Skeleton className="w-full h-8"/>
                      <Skeleton className="w-full h-8"/>
                      </div>
                    } */}
                   <SelectGroup className="">
                   {
                      categories.map((category)=>(
                         
                          <SelectItem className="dark:bg-neutral-200 bg-neutral-200 dark:hover:bg-neutral-300 hover:bg-neutral-300 text-black" value={category.id} key={category.id}>
                            {category.category_title}
                          </SelectItem>
                        
                      ))
                    }
                   </SelectGroup>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full h-8 my-2 dark:bg-custom-yellow bg-custom-yellow rounded-lg text-[0.75rem]">
                        Add Category
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-neutral-100 bg-neutral-100 ">
                        <CreateCategoryForm />
                      </AlertDialogContent>
                    </AlertDialog>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between my-3">
            <FormField
              control={form.control}
              name="age_restriction"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">Minimum Age</FormLabel>
                    <Input
                      type="text"
                      placeholder="13"
                      {...field}
                      className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">Timezone</FormLabel>
                    <Input
                      type="text"
                      placeholder="GMT+1"
                      {...field}
                      className="w-full dark:bg-neutral-100 bg-neutral-100 dark:border-white text-neutral-400 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>

          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full dark:bg-custom-yellow dark:text-white hover:bg-custom-pink dark:hover:bg-custom-pink transition-colors  bg-custom-yellow text-white text-center h-10 my-2"
          >
            {
              form.formState.isSubmitting?'Submitting...':'Submit Event'
            }
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEventForm;
