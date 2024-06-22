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
    <div className='grid grid-cols-1 sm:grid-cols-[60%_40%] h-screen w-full'>
      <div className='relative hidden sm:block'>
        <img
          src='/img/Fondo.png'
          width={1920}
          height={1080}
          alt='Background'
          className='h-full w-full object-cover'
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <img
            src='/img/Icon-pc-doctor.jpg'
            width={250}
            height={250}
            alt='Logo'
            className='mx-auto mb-2 rounded-lg'
            style={{ borderRadius: '30px' }}
          />
          <div className='text-5xl font-medium text-white'>Sistema PcDoctor</div>
        </div>
        <div className='absolute bottom-4 left-0 w-full text-center text-sm text-muted-foreground'>
          version 1.0 by ReyserLyn
        </div>
      </div>

      <div className='flex items-center justify-center bg-background h-screen'>
        <div className='max-w-[400px] w-full p-6 bg-white rounded-lg shadow-lg m-4'>
          <div className='sm:hidden'>
            <img
              src='/img/Icon-pc-doctor.jpg'
              width={200}
              height={200}
              alt='Logo'
              className='mx-auto rounded-lg'
              style={{ borderRadius: '30px' }}
            />
          </div>

          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Iniciar Sesión</h1>
            <p className='text-muted-foreground'>Ingresa tus credenciales para poder acceder al sistema</p>
          </div>

          {
            error
              ? (
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Error al inciar sesión</AlertTitle>
                  <AlertDescription>
                    El usuario no existe o los datos son incorrectos
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
