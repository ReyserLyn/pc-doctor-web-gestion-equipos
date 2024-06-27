import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Loader2, Trash, X } from 'lucide-react'

export const AlertDialogDelete = ({ children, title, description, deleteFunction, loading }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>
              <X className='w-4 h-4 mr-2' />
              Cancelar
            </Button>
          </DialogClose>

          {
            loading
              ? (
                <Button disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                  Cargando
                </Button>
                )
              : (
                <Button
                  onClick={deleteFunction}
                  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
                >
                  <Trash className='w-4 h-4 mr-2' />
                  Continuar
                </Button>
                )
          }

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
