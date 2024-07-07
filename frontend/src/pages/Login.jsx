'use client'

import { AlertCircle } from 'lucide-react'

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert'

import { useContext } from 'react'
import { AuthContext } from '@/context/auth'
import { LoginForm } from '@/components/LoginForm'

export default function Login () {
  const { error } = useContext(AuthContext)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[60%_40%] h-screen w-full relative'>
      <div className='absolute inset-0 bg-cover bg-center blur-[1.5px]' style={{ backgroundImage: 'url(\'/img/Fondo.webp\')' }} />

      <div className='relative hidden md:block'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <img
            src='/img/logo-pc-doctor.webp'
            width={300}
            height={300}
            alt='Logo'
            className='mx-auto mb-2 rounded-lg bg-white'
            style={{ borderRadius: '30px' }}
          />
        </div>
        <div className='absolute bottom-4 left-0 w-full text-center text-sm text-muted-foreground'>
          version 1.0 by ReyserLyn
        </div>
      </div>

      <div className='flex items-center justify-center  relative'>
        <div className='absolute inset-0 md:bg-white rounded-s-[30px] opacity-90 hidden sm:block ' />

        <div className='max-w-[450px] w-full p-10 m-6 bg-white rounded-lg shadow-xl sm:m-6 relative z-10'>
          <div className='md:hidden'>
            <img
              src='/img/logo-pc-doctor.webp'
              width={200}
              height={200}
              alt='Logo'
              className='mx-auto rounded-lg'
              style={{ borderRadius: '30px' }}
            />
          </div>

          <div className='space-y-2 text-center mb-5'>
            <h1 className='text-3xl font-bold'>Iniciar Sesión</h1>
            <p className='text-muted-foreground'>Ingresa tus credenciales para poder acceder al sistema</p>
          </div>

          {
            error
              ? (
                <Alert variant='destructive' className='mb-5'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Error al inciar sesión</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
                )
              : <></>
          }

          <LoginForm />

        </div>
      </div>
    </div>
  )
}
