import * as z from 'zod'
export interface Category {
    id: string;
    category_title: string;
  }
  
  export interface Event {
    id: string;
    event_title: string;
    event_start_date: Date |string;
    event_end_date: Date | string;
    price: string;
    event_image: string;
    event_description: string;
    event_location: string;
    createdAt: Date | string;
    isFree: boolean;
    event_url: string;
    organizer: Organizer;
    tickets_available:number | string;
    ticket_sale_end_date:Date | string
    accessibilities:Accessibility[] 
    age_restriction :any
    timezone :string
    description:string,
    category:Category
  }
  
  // Example of a more structured 'organizer' type if needed
  export interface Organizer {
    name: string;
    contact_email: string; 
  }
  export interface Accessibility{
    id? :string,
    accesibility_name:string,

  }

  export type createEventFromType =z.infer<typeof createEventFormObject>
  export const createEventFormObject = z.object({
      event_title:z.string().min(10,{
          message:"Event Title must be at least 10 characters long."
      }),
      event_start_date:z.date(),
      description:z.string().min(3).max(250,{
        message:"Your Description Must not exceed 250 characters!"
      }),
      price:z.string().optional().default(""),
      event_image:z.string().optional().default("https://cdn.leonardo.ai/users/be34e3d9-8456-49f8-b15a-dda75af03b5d/generations/098b2010-c9db-464d-8d00-ea2552f979bb/variations/alchemyrefiner_alchemymagic_0_098b2010-c9db-464d-8d00-ea2552f979bb_0.jpg"),
      event_location:z.string(),
      isFree:z.boolean().default(false),
      tickets_available:z.string(),
      age_restriction:z.string(),
      timezone:z.string(),
      category_id:z.string().optional()
  })
  export const createCategoryFormSchema=z.object({
    title:z.string().min(3).max(32)
  })
  export type createCategoryFormType=z.infer<typeof createCategoryFormSchema>

  export type eventOrganizer={
    username:string
  }