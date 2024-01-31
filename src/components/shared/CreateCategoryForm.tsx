import { createCategoryFormSchema, createCategoryFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  createCategory,
  createCategoryType,
  refreshCategories,
} from "@/lib/actions/event.actions";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { revalidateTag } from "next/cache";


const CreateCategoryForm = () => {
  const form = useForm<createCategoryFormType>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createCategoryFormSchema),
  });
  const onSubmit = async (values: { title: string }) => {
    console.log(values)
    createNewCategory(values);
  };
  const createNewCategory = async (values: { title: string }) => {
    console.log(values,'newCat')
    try {
      const newCategory = await createCategory({values})
        .then((category) => {
          refreshCategories()
          toast({
            title: "Complete!",
            description: "New Category Created!",
            className:"bg-white dark:bg-white dark:border-custom-yellow border-custom-yellow text-neutral-700 dark:text-neutral-700 border-2 "
          });
          form.reset();
        })
        .catch((err) => {
          console.log(err);
          toast({
            title:"Error",
            variant:"destructive",
            description:"Error Creating Form! Ensure the category being created doesn't exist already."
          })
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex flex-col space-y-3">
      <Form {...form}>
        <form action="">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="dark:text-neutral-700">
                    Event Title
                  </FormLabel>
                  <FormControl>
                  <Input
                    type="text"
                    placeholder="Technology"
                    {...field}
                    className="w-full dark:bg-neutral-200 bg-neutral-200 dark:border-white text-neutral-700 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                  />
                  </FormControl>
                  <FormItem />
                </FormItem>
              );
            }}
          ></FormField>
          <Button
            className="w-full dark:bg-custom-pink bg-custom-pink text-white rounded-lg dark:hover:bg-custom-pink hover:bg-custom-pink dark:text-white"
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;
