import { SignUp } from '@clerk/nextjs'
function Page() {
  return (
    <div className='md:ml-40 lg:ml-32'>
      <SignUp afterSignInUrl={'/'} afterSignUpUrl={'/'} />
    </div>
  )
}

export default Page

//