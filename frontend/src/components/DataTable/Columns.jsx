'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { RowActions } from './RowActions'

export const Columns = () => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Seleccionar todos'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Seleccionar fila'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'customer',
    header: 'Clientes',
    cell: ({ row }) => <div className='capitalize pl-4'>{row.getValue('customer')}</div>
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => (
      <div>{row.getValue('phone')}</div>
    )
  },
  {
    accessorKey: 'device',
    header: 'Dispositivo',
    cell: ({ row }) => (
      <div>{row.getValue('device')}</div>
    )
  },
  {
    accessorKey: 'brand',
    header: 'Marca',
    cell: ({ row }) => (
      <div>{row.getValue('brand')}</div>
    )
  },
  {
    accessorKey: 'model',
    header: 'Modelo',
    cell: ({ row }) => (
      <div>{row.getValue('model')}</div>
    )
  },
  {
    accessorKey: 'reception_date',
    header: 'Fecha de Recepción',
    cell: ({ row }) => {
      return <div>{row.getValue('reception_date')}</div>
    },
    sortType: (rowA, rowB, columnId, desc) => {
      const dateA = parseDate(rowA.original.reception_date)
      const dateB = parseDate(rowB.original.reception_date)

      return desc ? dateB - dateA : dateA - dateB
    }
  },
  {
    accessorKey: 'delivery_date',
    header: 'Fecha de Entrega',
    cell: ({ row }) => {
      // const date = row.getValue('delivery_date').split(' ')[0]
      return <div>{row.getValue('delivery_date')}</div>
    }
  },
  {
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => {
      const state = row.getValue('state')
      const warranty = row.original.warranty !== 0
      let backgroundColorClass = ''
      let textColorClass = ''

      let backgroundColorWarraty = ''
      let textColorWarranty = ''

      switch (state) {
        case 'En reparación':
          backgroundColorClass = 'bg-yellow-100'
          textColorClass = 'text-yellow-800'
          break
        case 'Reparado':
          backgroundColorClass = 'bg-green-100'
          textColorClass = 'text-green-800'
          break
        case 'Entregado':
          backgroundColorClass = 'bg-blue-100'
          textColorClass = 'text-blue-800'
          break
        default:
          backgroundColorClass = 'bg-gray-100'
          textColorClass = 'text-gray-800'
          break
      }

      if (warranty) {
        backgroundColorWarraty = 'bg-orange-100'
        textColorWarranty = 'text-orange-800'
      }

      return (
        <div className=''>
          {warranty && <div className={`${backgroundColorWarraty} ${textColorWarranty} mb-1 rounded-lg px-2 py-1 text-xs font-semibold`}>Garantía</div>}
          <div className={`${backgroundColorClass} ${textColorClass} rounded-lg px-2 py-1 text-xs font-semibold`}>{state}</div>
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Acciones</div>,
    enableHiding: false,
    cell: ({ row }) => (
      <RowActions row={row} />
    ),
    enableSorting: false
  }

]

function parseDate (dateString) {
  const [datePart, timePart] = dateString.split(' ')
  const [day, month, year] = datePart.split('/')
  const [hours, minutes] = timePart.split(':')
  return new Date(year, month - 1, day, hours, minutes)
}
