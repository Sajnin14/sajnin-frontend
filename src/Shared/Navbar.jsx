import Container from '@/components/Common/Container'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navLink = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Skills',
    path: '/skills',
  },
  {
    name: 'Works',
    path: '/works',
  },
]

export default function Navbar() {
  const navClass = 'uppercase text-lg border-b cursor-pointer hover:text-white duration-300'
  return (
    <nav className='w-full py-3 bg-primary h-18'>
      <Container>

        <div className='text-border flex items-center justify-between'>
          <h2 className='text-2xl font-semibold italic'>h9x</h2>

          <div className='flex items-center gap-7'>
            {
              navLink?.map((option, idx) => <NavLink key={idx} to={option?.path} className={({ isActive }) => `${navClass} ${isActive ? 'font-semibold border-border text-white' : 'border-transparent'}`}>
                {option?.name}
              </NavLink>)
            }
          </div>
        </div>
      </Container>
    </nav>
  )
}
