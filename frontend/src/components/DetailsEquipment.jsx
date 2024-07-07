import { useState, useContext, useEffect } from 'react'
import { Laptop, PcCase, Printer, Ban, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from './ui/button'

import { EquipmentContext } from '@/context/equipment'

export const DetailsEquipment = ({ children, equipment, isWarranty }) => {
  const { getByIdEquipment } = useContext(EquipmentContext)
  const [open, setOpen] = useState(false)
  const [equipmentNew, setEquipmentNew] = useState(equipment)

  useEffect(() => {
    const fetchEquipment = async () => {
      if (isWarranty && equipment.warranty !== 0) {
        const fetchedEquipment = await getByIdEquipment(equipment.warranty)
        setEquipmentNew(fetchedEquipment)
      }
    }

    fetchEquipment()
  }, [equipment, getByIdEquipment])

  const renderDeviceIcon = () => {
    switch (equipmentNew.device) {
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
              <div className='text-sm text-muted-foreground'>Id: {equipmentNew.id}</div>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Nombre Completo:</div>
              <div>{equipmentNew.customer}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Teléfono:</div>
              <div>{equipmentNew.phone}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Dispostivo:</div>
              <div>{equipmentNew.device}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Marca:</div>
              <div>{equipmentNew.brand}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Modelo:</div>
              <div>{equipmentNew.model}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Estado:</div>
              <div>{equipmentNew.state}</div>
            </div>

            <div className='col-span-full grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Servicios:</div>
              <div>{equipmentNew.services}</div>
            </div>
            <div className='col-span-full grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Precio:</div>
              <div>{equipmentNew.price}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Fecha de recepción:</div>
              <div>{equipmentNew.reception_date}</div>
            </div>

            <div className='grid grid-cols-[150px_1fr] items-center gap-4'>
              <div className='font-medium'>Fecha de entrega:</div>
              <div>{equipmentNew.delivery_date}</div>
            </div>

            <div className='grid grid-rows-[24px_1fr] gap-4'>
              <div className='font-medium'>Como entró:</div>
              <div className='text-muted-foreground'>
                {equipmentNew.entry_condition}
              </div>
            </div>

            <div className='grid grid-rows-[24px_1fr] gap-4'>
              <div className='font-medium'>Como salió:</div>
              <div className='text-muted-foreground'>
                {equipmentNew.exit_condition}
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
