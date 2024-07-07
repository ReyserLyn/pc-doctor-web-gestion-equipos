import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/context/user'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: 'El nombre es muy corto' })
    .max(100, { message: 'El nombre es muy largo' }),
  last_name: z
    .string()
    .min(3, { message: 'El apellido es muy corto' })
    .max(100, { message: 'El apellido es muy largo' }),
  username: z
    .string()
    .min(5, { message: 'El nombre de usuario es muy corto' })
    .max(50, { message: 'El nombre de usuario es muy largo' }),
  password: z
    .string()
    .max(50, { message: 'La contraseña es muy larga' }),
  email: z
    .string()
    .email({ message: 'Correo electrónico inválido' })
    .min(1, { message: 'El correo electrónico es muy corto' })
    .max(50, { message: 'El correo electrónico es muy largo' }),
  phone: z
    .string()
    .regex(/^(\+51)?[1-9]\d{8}$/, { message: 'Número de teléfono inválido' }),
  role_id: z.string(),
  status_id: z.string()
})

export function FormFields ({ setOpen, user, role, status }) {
  const { createUser, editUser } = useContext(UserContext)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, isLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role_id: '',
      status_id: ''
    }
  })

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role_id: getRoleId(role),
        status_id: getStatusId(status)
      })

      setIsEdit(true)
    }
  }, [user])

  const getRoleId = (roleName) => {
    switch (roleName) {
      case 'Administrador':
        return '1'
      case 'Técnico':
        return '2'
      default:
        return ''
    }
  }

  const getStatusId = (statusName) => {
    switch (statusName) {
      case 'Activo':
        return '1'
      case 'Inactivo':
        return '2'
      default:
        return ''
    }
  }

  async function onSubmit (values) {
    isLoading(true)
    console.log(values)

    try {
      let success = false

      if (isEdit) {
        success = await editUser(values, user.id)
      } else {
        success = await createUser(values)
      }

      if (success) {
        setOpen(false)
      }
    } catch (error) {
      console.error('Error al procesar el formulario:', error.message)
    } finally {
      isLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-4 pr-4 pl-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='first_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='first_name'>Nombres</FormLabel>
                  <FormControl>
                    <Input id='first_name' placeholder='Ingresa los nombres' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='last_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='last_name'>Apellidos</FormLabel>
                  <FormControl>
                    <Input id='last_name' placeholder='Ingresa los apellidos' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='username'>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input id='username' placeholder='Ingresa el nombre de usuario' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='password'>Contraseña</FormLabel>
                  <FormControl>
                    <Input id='password' placeholder='Ingresa la contraseña' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input id='email' placeholder='Ingresa el corre electrónico' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='phone'>Teléfono</FormLabel>
                  <FormControl>
                    <Input id='phone' placeholder='Ingresa número de celular' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='role_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    defaultValue={role ? getRoleId(role) : field.value}

                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona el Rol' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={1} value='1'>Administrador</SelectItem>
                      <SelectItem key={2} value='2'>Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='status_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    defaultValue={status ? getStatusId(status) : field.value}

                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona el Rol' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={1} value='1'>Activo</SelectItem>
                      <SelectItem key={2} value='2'>Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        <div className='flex flex-col md:flex-row md:items-center md:justify-end gap-2'>
          {
             loading
               ? (
                 <Button disabled>
                   <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                   Cargando
                 </Button>
                 )
               : (
                 <Button type='submit' className='w-full md:w-auto'>Guardar</Button>
                 )
          }

          <Button type='button' variant='secondary' onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </form>
    </Form>
  )
}
