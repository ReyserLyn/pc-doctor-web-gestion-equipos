import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader2, LogIn } from 'lucide-react'
import { PasswordInput } from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useState, useContext } from 'react'

import { AuthContext } from '@/context/auth'

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Nombre de usuario muy corto' })
    .max(50, { message: 'Nombre de usuario muy largo' }),
  password: z
    .string()
    .min(2)
    .max(50)

})

export function LoginForm () {
  const { login, setError, error } = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [loading, isLoading] = useState(false)

  async function onSubmit (values) {
    setError(null)
    isLoading(true)
    await login(values)

    isLoading(false)
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='username' className='text-md'>Nombre de usuario</FormLabel>
              <FormControl>
                <Input id='username' placeholder='Ingresa tu nombre de usuario' className={`text-md border  ${error ? 'border-red-300' : ''} `} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='password' className='text-md'>Contraseña</FormLabel>
              <FormControl>
                <div>

                  <PasswordInput
                    id='password' placeholder='Ingresa tu contraseña' className={`text-md border ${error ? 'border-red-300' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    {...field}
                  />

                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          loading
            ? (
              <Button disabled className='w-full h-12 text-md'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                Cargando
              </Button>
              )
            : (
              <Button type='submit' className='w-full h-12 text-md'>
                <LogIn className='w-5 h-5 mr-2' />
                Iniciar Sesión
              </Button>
              )
        }
      </form>
    </Form>
  )
}
