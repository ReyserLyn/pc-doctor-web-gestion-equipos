'use client'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Clientes
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha de Recepción
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
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
      let backgroundColorClass = ''

      switch (state) {
        case 'En reparación':
          backgroundColorClass = 'bg-yellow-200'
          break
        case 'Reparado':
          backgroundColorClass = 'bg-green-200'
          break
        case 'Entregado':
          backgroundColorClass = 'bg-blue-200'
          break
        default:
          backgroundColorClass = 'bg-gray-200'
          break
      }

      return (
        <div className={`px-2 py-1.5 rounded ${backgroundColorClass}`}>
          {state}
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
    )
  }

]

function parseDate (dateString) {
  const [datePart, timePart] = dateString.split(' ')
  const [day, month, year] = datePart.split('/')
  const [hours, minutes] = timePart.split(':')
  return new Date(year, month - 1, day, hours, minutes)
}
