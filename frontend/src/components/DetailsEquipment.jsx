import { useState } from 'react'
import { Laptop, PcCase, Printer, Ban, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from './ui/button'

export const DetailsEquipment = ({ children, equipment }) => {
  const [open, setOpen] = useState(false)

  const renderDeviceIcon = () => {
    switch (equipment.device) {
      case 'Laptop':
        return <Laptop className='h-16 w-16' />
      case 'Computadora':
        return <PcCase className='h-16 w-16' />
      case 'Impresora':
        return <Printer className='h-16 w-16' />
      default:
        return <Ban className='h-16 w-16' />
    }
  }

  return (
    <Dialog className='w-full sm:w-[350px]' open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className='rounded-lg shadow-md p-4 max-w-3xl mx-auto'>

        <div className='grid gap-6 p-6'>
          <div className='flex items-center gap-4'>
            {renderDeviceIcon()}
            <div className='grid gap-1'>
              <div className='text-2xl font-bold'>Detalles de este equipo</div>
              <div className='text-sm text-muted-foreground'>Id: {equipment.id}</div>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Nombre Completo:</div>
              <div>{equipment.customer}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Teléfono:</div>
              <div>{equipment.phone}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Dispostivo:</div>
              <div>{equipment.device}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Marca:</div>
              <div>{equipment.brand}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Modelo:</div>
              <div>{equipment.model}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Estado:</div>
              <div>{equipment.state}</div>
            </div>

            <div className='col-span-full grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Servicios:</div>
              <div>{equipment.services}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Fecha de recepción:</div>
              <div>{equipment.reception_date}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Fecha de entrega:</div>
              <div>{equipment.delivery_date}</div>
            </div>

            <div className='grid grid-rows-[24px_1fr] gap-4'>
              <div className='font-medium'>Como entró:</div>
              <div className='text-muted-foreground'>
                {equipment.entry_condition}
              </div>
            </div>

            <div className='grid grid-rows-[24px_1fr] gap-4'>
              <div className='font-medium'>Como salió:</div>
              <div className='text-muted-foreground'>
                {equipment.exit_condition}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type='button' variant='secondary' onClick={() => setOpen(false)}>
            <X className='w-4 h-4 mr-2' />
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
