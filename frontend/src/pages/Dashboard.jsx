'use client'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { CircleUser, Printer, Package2, Package, SquarePlus } from 'lucide-react'

import { DataTable } from '@/components/DataTable/DataTable'
import { EquipmentForm } from '@/components/EquipmentForm/EquipmentForm'

import { AuthContext } from '@/context/auth'
import { useContext } from 'react'

export function Dashboard () {
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  }

  return (
    <div className='grid w-full bg-muted/40'>

      <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
        <ResizablePanel defaultSize={15} className='min-w-[200px] max-w-[400px] hidden md:block bg-background'>
          <div className='border-r min-h-screen'>
            <div className='flex h-full max-h-screen flex-col gap-2'>
              <div className='flex h-[60px] items-center border-b px-6'>
                <Link className='flex items-center gap-2 font-semibold'>
                  <Package2 className='h-6 w-6' />
                  <span className=''>Usuario</span>
                </Link>
              </div>
              <div className='flex-1 overflow-auto py-2'>
                <nav className='grid items-start px-4 text-sm font-medium'>
                  <Link className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
                    <Package className='h-4 w-4' />
                    Dashboard
                  </Link>

                  <Link className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'>
                    <Package className='h-4 w-4' />
                    Dashboard
                  </Link>

                  <Link className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
                    <Package className='h-4 w-4' />
                    Dashboard
                  </Link>

                  <Link className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
                    <Package className='h-4 w-4' />
                    Dashboard
                  </Link>

                  <Link className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
                    <Package className='h-4 w-4' />
                    Dashboard
                  </Link>
                </nav>
              </div>

              <div className='flex space-x-2 p-4 md:gap-8 md:p-6'>
                <Button className='m-auto' variant='destructive' onClick={handleLogout}>Cerrar sesión </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={85}>
          <div className='w-full p-8 min-h-screen'>
            <div className='flex items-center justify-between pb-4'>
              <h1 className='font-semibold text-lg md:text-2xl'>Sistema PcDoctor</h1>
              <div className='flex space-x-2'>
                <Button className='ml-auto' variant='outline'>
                  <Printer width={20} height={20} className='mr-2' />
                  Imprimir
                </Button>

                <EquipmentForm
                  title='Nuevo Equipo'
                  description='Completa el formulario para agregar un nuevo equipo.'
                >
                  <Button>
                    <SquarePlus width={20} height={20} className='mr-2' />
                    Nuevo Equipo
                  </Button>
                </EquipmentForm>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='overflow-hidden rounded-full'
                    >
                      <CircleUser
                        width={20}
                        height={20}
                        alt='Avatar'
                        className='overflow-hidden rounded-full'
                      />

                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Configuración</DropdownMenuItem>
                    <DropdownMenuItem>Soporte</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Separator />

            <DataTable />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
