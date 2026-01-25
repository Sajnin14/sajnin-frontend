import React from 'react'
import Navbar from '../Shared/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
   <main>
    <Navbar/>
    <Outlet/>
    
   </main>
  )
}
