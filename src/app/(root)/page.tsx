import { Button } from '@/components/ui/button'
import React from 'react'
import { Event } from '@/lib/types'
import prisma from '@/lib/prisma'
import { getEvents } from '@/lib/functions'
import { SignedIn } from '@clerk/nextjs'
export const Home =async () => {
  const events=  await getEvents()
  return (
   <div className=' bg-slate-100 px-4 py-2 ' >
    <section className="w-full  h-full">
   <div className="flex flex-wrap items-start justify-between ">
  <div className="flex flex-col justify-center items-center  w-full md:text-start text-center  md:w-[40%] mt-[10%]  ">
  <h3 className='md:text-[2.2rem] text-[1.8rem] font-bold lg:ml-6'>Craft unforgettable events effortlessly with <span className='gradient-text'>EventSphere</span> <br></br>where planning meets perfection.</h3>
  <p className='md:text-[1rem] text-[0.75rem] max-w-full text-neutral-500 font-thin my-2  lg:ml-6'>From venue selection to guest lists, catering to timelines, turn your vision into reality with just a few taps.</p>
  <Button className='md:w-60 lg:w-52 w-full dark:bg-custom-yellow bg-custom-yellow text-white rounded-full mx-auto dark:hover:bg-custom-pink hover:bg-custom-pink transition-colors my-3'>
    Explore Now
  </Button>
  </div>
    <div className='md:w-[60%] w-full grid place-items-center'>
    <img src="https://res.cloudinary.com/dpxuxtdbh/image/upload/v1706141203/hero_oe43b5.png" className=' w-full md:w-[55%] lg:w-[48%] ' alt="" />
    </div>
   </div>
</section>

<section id='events' className='px-6 my-8'>
  <h4 className='md:text-[1.7rem] font-bold text-black'>Trusted By Thousands of Events</h4>
  { 
  events?.length ?
    events?.map((event)=>(
      <div>
        <p>{event.event_title}</p>
      </div>
    )) :  <div>
      <p className='text-[0.8275rem] font-semibold text-neutral-500'>No events available</p>
    </div>
  }
  </section>
  </div>
  )
}

export default Home

