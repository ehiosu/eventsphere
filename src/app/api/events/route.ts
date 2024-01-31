import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url)
    const page=searchParams.get('page') || "1"
    const pageSize=searchParams.get('pageSize') || "20"
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);
    const events = await prisma?.event.findMany({
        take:parseInt(pageSize),
        skip,
        include:{
            category:{
                select:{
                    category_title:true,
                    id:true
                }
            }
        }
    })
    const num_pages:number=await prisma?.event.count()
    const page_count=Math.floor(num_pages/parseInt(pageSize)) +1
    return new Response(JSON.stringify({events,page_count}))
}