import { createCategoryFormSchema, createCategoryFormType } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const CreateCategoryForm = () => {
    const form=useForm<createCategoryFormType>({
        defaultValues:{
            title:""
        },
        resolver:zodResolver(createCategoryFormSchema)
    })
    const onSubmit=(values:{title:string})=>{
        console.log(values)
    }
  return (
    <div className='w-full flex flex-col space-y-3'>
        <Form {...form}>
            <form action="">
                <FormField control={form.control} name="title" render={({field})=>{
                    return (
                        <FormItem>
                        <FormLabel className="dark:text-neutral-700">
                          Event Title
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="Technology"
                          {...field}
                          className="w-full dark:bg-neutral-200 bg-neutral-200 dark:border-white text-neutral-700 placeholder:text-neutral-500  px-2 py-1 rounded-lg text-[0.8275rem]  dark:focus:outline-none dark:focus-within:outline-none dark:focus:ring-transparent dark:focus-within:ring-transparent dark:focus:ring-offset-transparent dark:focus-within:ring-offset-transparent focus:ring-offset-transparent"
                        />
                        <FormItem />
                      </FormItem>
                    )
                }}>

                </FormField>
                <Button className="w-full dark:bg-custom-pink bg-custom-pink text-white rounded-lg dark:hover:bg-custom-pink hover:bg-custom-pink dark:text-white" onClick={form.handleSubmit(onSubmit)}>Create</Button>
            </form>
        </Form>
    </div>
  )
}

export default CreateCategoryForm