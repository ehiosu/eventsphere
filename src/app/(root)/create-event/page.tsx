import CreateEventForm from '@/components/shared/createEventForm'
import { createEvent, createEventProps } from '@/lib/actions/event.actions'
import { Category, createEventFromType } from '@/lib/types'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { cache } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

async function fetchCategories() {
  const res = await fetch('http://localhost:3000/api/events/category',{
    method:"GET", 
    next:{
      tags:['categories']
    }
  })
  if(res.ok)
  {
    const categories = await res.json()
    return categories as Category[]
  }
  return [] as Category[]
}


export const Page = async () => {
  const [categories]=await Promise.all([fetchCategories()])
  return (
    <div className='div-w-full h-full p-2 grid place-items-center'>
      <div className='md:w-[50%] lg:w-[30%] w-full rounded-xl  min-h-full  bg-white shadow-md'>
        <div className="flex items-center justify-between dark:text-slate-950 px-2 py-4">
          <p className='text-[1.2rem] font-[500] '>Create Event</p>
          <Link href={'/'} ><AiOutlineClose className='aspect-square p-1 h-6 w-6 dark:hover:text-neutral-700 transition-all rounded-md text-[1.4rem] hover:bg-neutral-100 border-[1px] border-neutral-100'/></Link>
        </div>  <CreateEventForm categories={categories} submitForm={createEvent}/>
   
      </div>
    </div>
  )
}


export default Page