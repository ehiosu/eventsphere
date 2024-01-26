import Error from "next/error"
import { Category } from "./types"

export const getEvents=async ()=>{
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
  }

export const getCategories=async (): Promise<Category[]> =>{
    try{
        const categories = await prisma?.category.findMany({
            select:{
                id:true,
                category_title:true
            }
        })
        return categories ?? []
    }catch(err ){
        return []
    }
}
export const fetchCategories = async (): Promise<Category[]> => {
    const categories = await Promise.all([getCategories()]);
    return categories[0]; // Since Promise.all returns an array of results
};
