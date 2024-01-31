import Error from "next/error"
import { Category } from "./types"
import prisma from "./prisma"
import { cache } from "react"
export const getEvents=cache( async ()=>{
    try{
        const events = await prisma?.event.findMany({
            take:20,
            include:{
              category:{
                select:{
                  category_title:true
                }
              }
            }
          })
          return events
    }
    catch(err){
        return []
    }
  })

export const getCategories= cache(async (): Promise<Category[]> =>{
    try{
        const categories = await prisma?.category.findMany()
        return categories as Category[]
    }catch(err ){
      console.log(err)
        return []
    }
})
export const fetchCategories = async (): Promise<Category[]> => {
    const categories = await getCategories()
    console.log(categories)
    return categories 
};
