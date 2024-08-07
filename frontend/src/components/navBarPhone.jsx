import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  LayoutDashboard,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DropUser } from './DropUser'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth'

export function NavBarPhone ({ children, title }) {
  const { user } = useContext(AuthContext)

  const location = useLocation()

  return (
    <div className='flex flex-col'>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 justify-between pb-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Menu de navegación</span>
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className='flex flex-col'>
            <nav className='grid gap-2 text-lg font-medium'>
              <div className='flex h-14 items-center border-b'>
                <div className='flex items-center gap-2 font-semibold'>
                  <img
                    src='/img/logo-pc-doctor.png'
                    width={40}
                    height={40}
                    alt='Logo'
                  />
                  <span className=''>PcDoctor</span>
                </div>
              </div>

              <Link
                to='/dashboard'
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                      ${location.pathname === '/dashboard' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
              >
                <LayoutDashboard className='h-4 w-4' />
                Dashboard
              </Link>

              {
                user.role_id === 1 &&

                  <Link
                    to='/usuarios'
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                      ${location.pathname === '/usuarios' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
                  >
                    <Users className='h-4 w-4' />
                    Usuarios
                  </Link>

              }
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className='font-bold text-lg md:text-2xl text-center'>{title}</h1>

        <div className='hidden md:flex items-center space-x-4'>
          {children}

          <div className='hidden md:block'>
            <DropUser />
          </div>
        </div>

        <div className='md:hidden'>
          <DropUser />
        </div>
      </header>

      <div className='flex flex-wrap justify-evenly space-x-2 pt-4 md:hidden'>
        {children}

        <div className='hidden md:block'>
          <DropUser />
        </div>
      </div>

    </div>
  )
}
