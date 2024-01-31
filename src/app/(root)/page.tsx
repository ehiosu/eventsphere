import { Button } from '@/components/ui/button'
import React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Event } from '@/lib/types'
import { redirect } from 'next/navigation'
import { PaginationEllipsis } from '@/components/ui/pagination'

async function getEvents(page=1,pageSize=10){
  const res = await fetch(`http://localhost:3000/api/events?page=${page}&pageSize=${pageSize}`,{
    method:"GET",
    next:{
      tags:['events']
    }
  })
  if (res.ok){
    const resp= await res.json()
    console.log(resp)
    return {...resp}

  }
  return []
}
export const Home =async (context) => {
  const page:number = parseInt(context.searchParams.page) || 1
  const pageSize=10
  const {events,page_count}=await getEvents(page,pageSize)
  if(page > page_count){
    return redirect('/?page=1')
  }
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

<section id='events' className='px-6 my-8 grid grid-cols-1  h-auto md:grid-cols-3 lg:grid-cols-4   gap-4 '>
  <h4 className='md:text-[1.7rem] font-bold text-black col-span-full'>Trusted By Thousands of Events</h4>
  <div className='col-span-full flex justify-end items-center'>
<Pagination page={page} pageCount={page_count} />
  </div>
  { 
  events?.length ?
    events?.map((event)=>(
      <Link href={`/event/${event.id}`} key={event.id}><div className=' bg-white rounded-xl border-2 border-neutral-100 shadow-sm p-2 flex flex-col col-span-1  md:h-full max-w-[250px] h-[300px] md:mx-0 mx-auto md:max-w-[420px]  lg:max-w-auto' >
        <img src={event.event_image.trim().length>0 ?event.event_image:"https://cdn.leonardo.ai/users/be34e3d9-8456-49f8-b15a-dda75af03b5d/generations/098b2010-c9db-464d-8d00-ea2552f979bb/variations/alchemyrefiner_alchemymagic_0_098b2010-c9db-464d-8d00-ea2552f979bb_0.jpg"} className='w-full h-32 object-cover object-top  aspect-video  rounded-t-xl ' alt={event.event_title} />
        <p className='text-[0.77rem] text-neutral-400 my-2 pl-3'>{format(event.event_start_date,'dd MMMM,yyyy')}</p>
        <p className='text-[0.875rem] text-neutral-700 pl-3 '>{event.event_title}</p>
        {event.organizer?.username &&
        <p className=" text-[0.72rem] text-neutral-400 pl-2 mt-8"><span className='font-semibold'>Contact: </span>
        {" "+event.organizer?.username }
        </p>
        }
     <div className={` ${!event.organizer?.username &&"mt-auto "} flex gap-2 pl-2 items-center my-2 `}>
     {
        event.isFree && <span className='w-max px-2 bg-green-400 text-[0.67rem] rounded-full py-1 font-bold'>FREE</span>
       }
       {
        !event.isFree && <span className='w-max px-2 bg-green-400 text-[0.67rem] rounded-full py-1'>{event.price}</span>
       }
       <span className='w-max px-2 bg-neutral-400 text-[0.67rem] rounded-full py-1 font-semibold text-neutral-700'>{event.category.category_title}</span>
     </div>
    
      
      </div></Link>
    )) :  <div>
      <p className='text-[0.8275rem] font-semibold text-neutral-500'>No events available</p>
    </div>
  }
  </section>
  </div>
  )
}

const Pagination=({page,pageCount}:{page:number,pageCount:number})=>{
  return(
    <div className='flex items-center  gap-2  w-72 justify-start  h-8 '>
    {pageCount>1 &&   <Link href={`/?page=${page-1}`} className='disabled:bg-transparent px-2 text-[0.75rem] py-1 aria-disabled:bg-transparent bg-neutral-200 rounded-md font-semibold aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none' aria-disabled={page==1}>Previous</Link>}
{
  Array.from({length:3}).map((el,index)=>
   index+page < pageCount? <Link href={`/?page=${index+page}`} key={`pagination-${index}`} className={`${index+page === page ?'bg-neutral-200 font-semibold ':'hover:bg-neutral-300 transition-all'} rounded-md px-2 py-1 text-[0.75rem]`}>{index+page}</Link>:<></>
  )
}
{
  page+3 < pageCount && <PaginationEllipsis className='h-full grid place-items-center'/>
}
{pageCount >1 && <Link className='disabled:bg-transparent px-2 text-[0.75rem] py-1 aria-disabled:bg-transparent bg-neutral-200 rounded-md font-semibold aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none'  href={`/?page=${page+1}`} aria-disabled={page===pageCount}>Next</Link>}

    </div>
      
    
  )
}

export default Home

