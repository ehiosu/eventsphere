import {Roboto_Slab} from 'next/font/google'
import './shared.css'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import NavBar, { NavSheet } from './Navbar'
const roboto=Roboto_Slab({
    subsets:['latin']
})
export const Header = () => {
  return (
    <nav className="  p-4 flex items-center justify-between">
      <Link href={'/'} className={`text-[1.6rem] ${roboto.className}  gradient-text  `}> EventSphere</Link>
     <NavBar/>
      <div>
        <SignedOut>
           <Link href={'/sign-in'}><Button   className='rounded-full bg-[#fcad1f] text-black w-24 hover:bg-[#db206c] hover:text-white transition-colors'>Login</Button></Link> 
        </SignedOut>
        <SignedIn>
          <div className='ml-auto flex gap-2 items-center'> <UserButton/>   <NavSheet/></div>
        
        </SignedIn>
      </div>
    </nav>
  )
}



export default Header