"use server";
import prisma from "@/lib/prisma";
import * as z from "zod";
import { createEventFormObject, createEventFromType } from "../types";
import { revalidateTag } from "next/cache";
export type createCategoryType = {
  values: {
    title: string;
  };
};
export const createCategory = async ({ values }: createCategoryType | any) => {
  console.log(values);
  try {
    const newCategory = await prisma?.category.create({
      data: {
        category_title: values.title.trim(),
        event_id: "",
      },
    });
    if (newCategory) {
      console.log(newCategory);
      return JSON.parse(JSON.stringify(newCategory));
    }
  } catch (err) {
    console.log(err);
    return new Error("Unable to create Category");
  }
};
export interface createEventProps extends createEventFromType {
  organizer: {
    username: string;
  };
  ownerId: string;
}
export const createEvent = async (values: createEventProps) => {
  const {
    event_title,
    event_location,
    event_start_date,
    event_image,
    category_id,
    age_restriction,
    tickets_available,
    timezone,
    isFree,
    price,
    description,
    organizer,
    ownerId,
  } = values;
  const newEvent = await prisma?.event.create({
    data: {
      event_title: event_title,
      event_description: description,
      event_image: event_image as string,
      event_location: event_location,
      event_start_date: event_start_date,
      category: {
        connect: {
          id: category_id,
        },
      },
      age_restriction: age_restriction,
      tickets_available: parseInt(tickets_available),
      timezone: timezone,
      isFree: isFree,
      price: price,
      event_url: "",
      organizer: organizer,
      ownerId: ownerId,
      description: description,
      
    },
  });
  return newEvent
};


export const getEventById=async(id:string,userId:string)=>{
  if(!id){
    return null
  }
  try{
    const event = await prisma?.event.findFirst({
      where:{
        id:id
      },
      include:{
        category:{
          select:{
            category_title:true
          }
        }
      }
    })
    const isOwner=event?.ownerId===userId
    if(!event){
      return null
    }
    return {...event,ownerId:"",isOwner}
  }
  
  catch(err){
    return null
  }
}

export async function refreshCategories(){
  revalidateTag('categories')
}
export async function refreshEvents(){
  revalidateTag('events')
}