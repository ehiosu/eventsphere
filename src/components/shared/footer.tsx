
export const Footer = () => {
  const year =new Date().getFullYear()
  return (
    <div className='w-full flex flex-col items-center justify-center py-4 bg-slate-200/70'>
     <img src="https://res.cloudinary.com/dpxuxtdbh/image/upload/v1706098803/private/eventsphere-high-resolution-logo-transparent_h1ry7q.png" className="h-24 aspect-video object-contain" alt="EventSphere logo"  />
     <p className="text-[0.78rem] text-neutral-600">{year} EventSphere, All Rights Reserved</p>
    </div>
  )
}

export default Footer