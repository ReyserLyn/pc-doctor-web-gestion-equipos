'use client'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users } from 'lucide-react'

export function NavBar () {
  const location = useLocation()

  return (
    <>
      <div className='flex h-[60px] items-center border-b px-6'>
        <div className='flex items-center gap-2 font-semibold'>
          <img
            src='/img/logo-pc-doctor.webp'
            width={40}
            height={40}
            alt='Logo'
          />
          <span className=''>PcDoctor</span>
        </div>
      </div>

      <div className='flex-1 overflow-auto py-2'>
        <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
          <Link
            to='/dashboard'
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                ${location.pathname === '/dashboard' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
          >
            <LayoutDashboard className='h-4 w-4' />
            Dashboard
          </Link>
          <Link
            to='/usuarios'
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                ${location.pathname === '/usuarios' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
          >
            <Users className='h-4 w-4' />
            Usuarios
          </Link>
        </nav>
      </div>
    </>
  )
}
