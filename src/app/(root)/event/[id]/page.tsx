import { getEventById } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Error from 'next/error'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

async function Page ({params}:{params:{id:string}}){
    const {userId}=auth()
    const {id}=params
    const event = await getEventById(id as string,userId as string)
    if(!id || event === null){
        notFound()      
    }
    
  return (
    <div>
        <div className="flex justify-end items-center my-2 p-2 ">
            {event?.isOwner&& <Link href={`/event/${event.id}/update}`} className='w-20 bg-custom-pink text-white px-2 py-1 rounded-full max-w-full '>
                Update
            </Link>}
        </div>
        <img src={event?.event_image?.trim().length >0?event?.event_image:'https://cdn.leonardo.ai/users/be34e3d9-8456-49f8-b15a-dda75af03b5d/generations/098b2010-c9db-464d-8d00-ea2552f979bb/variations/alchemyrefiner_alchemymagic_0_098b2010-c9db-464d-8d00-ea2552f979bb_0.jpg'} alt="" className='w-full h-[35vh] object-contain object-top' />

        <div className="px-16 my-4">
            <p className='text-[2rem] font-bold'>{event.event_title}</p>
            <p className='text-neutral-400 my-1 text-[0.8275rem]'><span className='text-neutral-700 font-semibold text-[0.9rem]'>Category : </span>{event.category.category_title}</p>
        </div>
    </div>
  )
}

export default Page