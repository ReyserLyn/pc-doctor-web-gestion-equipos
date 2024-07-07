// src/Login.js
import React, { useState } from 'react'

const Block = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica de autenticación
    if (password !== 'correct_password') {
      setError(true)
    } else {
      setError(false)
      // redirigir o hacer algo más
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-red-200'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Welcome to Bonita BPM Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>User</label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>Password</label>
            <div className='relative'>
              <input
                type='password'
                id='password'
                className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                <svg className='h-5 w-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
              </span>
            </div>
            {error && <p className='text-red-500 text-xs mt-1'>Your password is incorrect</p>}
          </div>
          <button type='submit' className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Block
