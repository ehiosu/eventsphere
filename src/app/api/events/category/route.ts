
import { NextRequest, NextResponse } from "next/server"
export async function GET(request:NextRequest) {
  try{
    const category= await prisma?.category.findMany({
        select:{
            id:true,
            category_title:true
        }
    })
    return new Response(JSON.stringify(category))
  }
  catch(err){
    console.log('Error')
    console.log(err)
  }
}