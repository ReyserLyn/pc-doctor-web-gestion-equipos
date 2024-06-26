import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useState, useContext } from 'react'
import { ChevronDown } from 'lucide-react'

import { Columns } from '@/components/DataTable/Columns'
import { EquipmentContext } from '@/context/equipment'

export const DataTable = () => {
  const { equipments, statusCounts } = useContext(EquipmentContext)

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const data = equipments
  const columns = Columns()

  const [stateFilter, setStateFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const badges = [
    { label: `Todos ${statusCounts.Todos}`, filterValue: '' },
    { label: `En reparación ${statusCounts['En reparación']}`, filterValue: 'En reparación' },
    { label: `Reparado ${statusCounts.Reparado}`, filterValue: 'Reparado' },
    { label: `Entregado ${statusCounts.Entregado}`, filterValue: 'Entregado' }
  ]

  const handleBadgeClick = (filterValue) => {
    setStateFilter(filterValue)
    table.getColumn('state')?.setFilterValue(filterValue)
  }

  return (
    <>
      <div className='p-4 space-y-4 md:flex md:justify-between md:items-center md:space-x-4'>
        <div className='space-y-2 md:space-x-2'>
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant={badge.filterValue === stateFilter ? 'default' : 'secondary'}
              onClick={() => handleBadgeClick(badge.filterValue)}
              className='cursor-pointer'
            >
              {badge.label}
            </Badge>
          ))}
        </div>

        <div className='flex-1 min-w-48'>
          <Input
            placeholder='Filtrar clientes'
            value={table.getColumn('customer')?.getFilterValue() ?? ''}
            onChange={event => table.getColumn('customer')?.setFilterValue(event.target.value)}
            className='w-full'
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columnas
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table.getAllColumns()
              .filter(column => column.getIndex() !== 1 && column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                )
              })}

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className='rounded-md border bg-background'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted()

                  return (
                    <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      {
                        header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                      }
                      {
                        isSorted === 'asc'
                          ? ' ⭡'
                          : isSorted === 'desc'
                            ? ' ⭣'
                            : ''
                      }

                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No hay resultados.
                  </TableCell>
                </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </>
  )
}
