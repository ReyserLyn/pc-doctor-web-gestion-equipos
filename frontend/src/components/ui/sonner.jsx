import { Toaster as Sonner } from 'sonner'

const Toaster = ({
  ...props
}) => {
  return (
    (
      <Sonner
        theme='light'
        className='toaster group'
        toastOptions={{
          actionButtonStyle: {
            background: 'white',
            color: 'black'
          }
        }}
        {...props}
      />
    )
  )
}

export { Toaster }
