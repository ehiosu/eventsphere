import CreateEventForm from '@/components/shared/createEventForm'
import Link from 'next/link'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export const Page = () => {
  return (
    <div className='div-w-full h-full p-2 grid place-items-center'>
      <div className='md:w-[28%] w-full rounded-xl  min-h-full  bg-white shadow-md'>
        <div className="flex items-center justify-between dark:text-slate-950 px-2 py-4">
          <p className='text-[1.2rem] font-[500] '>Create Event</p>
          <Link href={'/'} ><AiOutlineClose className='aspect-square p-1 h-6 w-6 dark:hover:text-neutral-700 transition-all rounded-md text-[1.4rem] hover:bg-neutral-100 border-[1px] border-neutral-100'/></Link>
        </div>
        <CreateEventForm/>
      </div>
    </div>
  )
}


export default Page