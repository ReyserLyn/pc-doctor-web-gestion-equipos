'use client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { FilePenIcon, MailOpenIcon, PhoneIcon, UserPlus, PrinterIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NavBar } from '@/components/NavBar'
import { NavBarPhone } from '@/components/navBarPhone'
import { UserForm } from '@/components/userForm/UserForm'
import { useContext } from 'react'

import { UserContext } from '@/context/user'
import { AlertDialogDelete } from '@/components/AlertDialogDelete'

export function Usuarios () {
  const { users, deleteUser } = useContext(UserContext)

  const userData = users

  const handleDelete = (user) => {
    deleteUser(user.id)
  }

  return (
    <div className='grid w-full bg-muted/40'>
      <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
        <ResizablePanel defaultSize={15} className='min-w-[200px] max-w-[400px] hidden md:block bg-background'>
          <NavBar />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={85}>
          <div className='w-full p-8 min-h-screen'>
            <NavBarPhone title='Gestión de usuarios'>
              <Button variant='outline'>
                <PrinterIcon className='w-5 h-5 mr-2' />
                Imprimir
              </Button>

              <UserForm
                title='Añadir nuevo usuario'
                description='Complete el formulario para crear una nueva cuenta de usuario.'
              >
                <Button className='ml-auto md:ml-0'>
                  <UserPlus className='w-5 h-5 mr-2' />
                  Nuevo Usuario
                </Button>
              </UserForm>

            </NavBarPhone>

            <div className='my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
              {userData.map((user) => (
                <Card key={user.id} className={`p-4 flex flex-col ${user.status === 'Inactivo' ? 'bg-gray-200' : ''}`}>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-medium pr-3'>{user.first_name} {user.last_name}</h3>
                    <div className='flex flex-col items-center'>
                      <div className='mb-1'>
                        <Badge
                          className={`px-2 py-1 rounded-full text-xs font-medium hover:text-secondary 
                            ${user.role === 'Administrador'
                                ? 'bg-primary-foreground text-primary'
                                : 'bg-secondary-foreground text-secondary'
                            }
                            ${
                              user.status === 'Inactivo' ? 'bg-gray-300 text-primary' : ''}
                          `}
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <div>
                        <Badge
                          className={`px-2 py-1 rounded-full text-xs font-medium hover:text-secondary 
                            ${user.status === 'Inactivo'
                                ? 'bg-primary-foreground text-primary'
                                : 'bg-secondary-foreground text-secondary'
                            }
                            ${user.status === 'Inactivo' ? 'bg-gray-300 text-primary' : ''}
                          `}
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 justify-end mt-auto text-muted-foreground'>
                    <div className='flex items-center'>
                      <MailOpenIcon className='w-4 h-4 mr-2' />
                      <span>{user.email}</span>
                    </div>
                    <div className='flex items-center'>
                      <PhoneIcon className='w-4 h-4 mr-2' />
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2 pt-2'>
                    <UserForm
                      title='Editar usuario'
                      description='Completa el formulario para modificar este usuario.'
                      user={user}
                      role={user.role}
                      status={user.status}
                    >
                      <Button variant='outline' size='sm' className={`${user.status === 'Inactivo' ? 'bg-gray-200 border-gray-300' : ''}`}>
                        <FilePenIcon className='w-4 h-4 mr-2' />
                        Editar
                      </Button>
                    </UserForm>

                    <AlertDialogDelete
                      deleteFunction={() => { handleDelete(user) }}
                      title='¿Estás seguro de eliminar este usuario?'
                      description='Esta acción no se puede deshacer. El usuario se eliminará permanentemente del sistema'
                    >
                      <Button variant='outline' size='sm' className={`text-red-500 ${user.status === 'Inactivo' ? 'bg-gray-200 border-gray-300' : ''}`}>
                        <TrashIcon className='w-4 h-4 mr-2' />
                        Eliminar
                      </Button>
                    </AlertDialogDelete>

                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
