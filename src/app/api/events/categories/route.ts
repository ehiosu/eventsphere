import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(requet:NextRequest){
    const categories = await prisma?.category.findMany({
        select:{
            category_title:true,
            id:true
        }
    })
    return new Response(JSON.stringify(categories))
}