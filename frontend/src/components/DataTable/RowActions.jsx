import { ChevronDown, ShieldPlus, ClipboardCopy, ClipboardList, Trash, FilePenLine, CircleCheckBig, Package, PackageCheck, FileSpreadsheet } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { EquipmentForm } from '../EquipmentForm/EquipmentForm'

import { useContext, useState } from 'react'

import { EquipmentContext } from '@/context/equipment'
import { StatusForm } from '../StatusForm/StatusForm'
import { DetailsEquipment } from '../DetailsEquipment'
import { AlertDialogDelete } from '../AlertDialogDelete'

const statusMap = {
  'En reparación': {
    icon: <CircleCheckBig className='h-4 w-4' />,
    title: 'Equipo reparado',
    description: 'Si el equipo ya está listo, registra su condición de salida y cambia su estado'
  },
  Reparado: {
    icon: <Package className='h-4 w-4' />,
    title: 'Equipo reparado',
    description: 'El equipo está reparado y listo para ser entregado'
  },
  Entregado: {
    icon: <PackageCheck className='h-4 w-4' />
  }
}

export const RowActions = ({ row }) => {
  const { deleteEquipment } = useContext(EquipmentContext)
  const [loading, isLoading] = useState(false)

  const transformDataClient = (data) => {
    const fieldMapping = {
      customer: 'Nombre',
      phone: 'Teléfono',
      device: 'Dispositivo',
      brand: 'Marca',
      model: 'Modelo',
      reception_date: 'Fecha de recepción',
      delivery_date: 'Fecha de entrega',
      state: 'Estado',
      entry_condition: 'Condición de entrada',
      exit_condition: 'Condición de salida',
      services: 'Servicios'
    }

    const outputLines = Object.keys(data)
      .filter(key => key !== 'id')
      .map(key => `${fieldMapping[key]}: ${data[key]}`)

    const outputText = outputLines.join('\n')

    return outputText
  }

  const handleCopyData = () => {
    const dataText = transformDataClient(row.original)
    navigator.clipboard.writeText(dataText)

    toast.info('Datos del cliente copiados')
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(row.original.phone)
    toast.info('Teléfono del cliente copiado')
  }

  const handleDelete = () => {
    isLoading(true)
    deleteEquipment(row.original.id)
    isLoading(false)
  }

  const { icon, title, description } = statusMap[row.original.state] || {
    icon: <CircleCheckBig className='h-4 w-4' />,
    title: 'Estado no reconocido',
    description: 'El estado del equipo no está definido correctamente',
    disabled: false
  }

  const isDelivered = row.original.state === 'Entregado'
  const isWarranty = row.original.warranty !== 0

  return (
    <div className='flex items-center justify-center'>
      <StatusForm
        title={title}
        description={description}
        equipment={row.original}
      >
        <Button variant='outline' size='icon' disabled={isDelivered}>
          {icon}
        </Button>
      </StatusForm>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0 flex'>
            <span className='sr-only'>Abrir Menú</span>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DetailsEquipment equipment={row.original}>
            <DropdownMenuItem onSelect={(e) => { e.preventDefault() }}>
              <FileSpreadsheet className='h-4 w-4 mr-2' />
              Ver equipo
            </DropdownMenuItem>

          </DetailsEquipment>

          {
            isWarranty &&
              <DetailsEquipment isWarranty equipment={row.original}>
                <DropdownMenuItem onSelect={(e) => { e.preventDefault() }}>
                  <FileSpreadsheet className='h-4 w-4 mr-2' />
                  Ver equipo pre-Garantía
                </DropdownMenuItem>

              </DetailsEquipment>
          }

          {
            isDelivered
              ? (

                <EquipmentForm
                  title='Ingresar equipo por garantía'
                  description='Completa el formulario para ingresar una nueva entrada por garantía de este equipo'
                  equipment={row.original}
                  device={row.original.device}
                >
                  <DropdownMenuItem onSelect={(e) => { e.preventDefault() }}>
                    <ShieldPlus className='h-4 w-4 mr-2' />
                    Garantía
                  </DropdownMenuItem>

                </EquipmentForm>

                )
              : ('')

          }

          <EquipmentForm
            title='Editar equipo'
            description='Completa el formulario para modificar este equipo.'
            equipment={row.original}
            device={row.original.device}
          >
            <DropdownMenuItem onSelect={(e) => { e.preventDefault() }} disabled={isDelivered}>
              <FilePenLine className='h-4 w-4 mr-2' />
              Editar Equipo
            </DropdownMenuItem>
          </EquipmentForm>

          <AlertDialogDelete
            deleteFunction={handleDelete}
            title='¿Estás seguro de eliminar este equipo?'
            description='Esta acción no se puede deshacer. El equipo se eliminará permanentemente y sus datos asociados.'
            loading={loading}
            isLoading={isLoading}
          >
            <DropdownMenuItem onSelect={(e) => { e.preventDefault() }}>
              <Trash className='h-4 w-4 mr-2' />
              Eliminar equipo
            </DropdownMenuItem>
          </AlertDialogDelete>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Datos</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleCopyPhone()}>
            <ClipboardCopy className='h-4 w-4 mr-2' />
            Copiar Teléfono
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(handleCopyData)}>
            <ClipboardList className='h-4 w-4 mr-2' />
            Copiar datos
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}
