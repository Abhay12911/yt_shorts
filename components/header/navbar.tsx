import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { ModeToggle } from '../ModeToggle'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='flex items-center h-14 justify-between'>
        <div>
            <h1 className='font-bold text-xl'>YT <span className='text-red-500'>Shorts</span></h1>
        </div>

        {/* // search input  */}
        <div className='w-1/2'>
            <Input
            type='text'
            placeholder='Search...'

            />
        </div>

        {/* Account management */}
            <div className='flex items-center gap-2'>
              <Link href='/upload'>
                <Button><Plus/>Create</Button>
                </Link>
                <SignedOut>
              <SignInButton>
              <Button>SignIn</Button>
              </SignInButton>
              <SignUpButton>
              <Button>SignUp</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
                <ModeToggle/>
            </div>
    </div>
  )
}

export default Navbar