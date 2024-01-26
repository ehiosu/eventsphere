export const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex'>
        <div className='lg:w-1/4 md:w-1/3 w-full h-full bg-custom-pink flex flex-col gap-4 items-center px-4'>
          <img src='https://res.cloudinary.com/dpxuxtdbh/image/upload/v1706098803/private/eventsphere-high-resolution-logo-transparent_h1ry7q.png' className='w-[50%] mt-4 mx-auto'></img>
         {children}
        </div>
        <div className="flex-1 bg-[url(https://cdn.leonardo.ai/users/be34e3d9-8456-49f8-b15a-dda75af03b5d/generations/b757aa2c-407c-4e2b-8835-7491aa2d0528/variations/alchemyrefiner_alchemymagic_0_b757aa2c-407c-4e2b-8835-7491aa2d0528_0.jpg)]  bg-no-repeat bg-cover md:block hidden">

        </div>
    
      
      
    </div>
  )
}
export default layout