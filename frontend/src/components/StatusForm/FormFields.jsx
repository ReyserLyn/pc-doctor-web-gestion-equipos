import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { es } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popoverDialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { EquipmentContext } from '@/context/equipment'
import { useContext, useState } from 'react'

const formSchema = z.object({
  exit_condition: z.string(),
  delivery_date: z.date({
    required_error: 'Es obligatorio escoger una fecha.'
  }),
  isWarranty: z.boolean()
})

export function FormFields ({ setOpen, equipment, state }) {
  const { setRepairEquipment, setDeliveredEquipment } = useContext(EquipmentContext)
  const [loading, isLoading] = useState(false)

  const receptionDate = equipment.reception_date.split(' ')[0]
  const dateString = receptionDate
  const [day, month, year] = dateString.split('/').map(Number)
  const dateObj = new Date(year, month - 1, day)

  const currentDate = new Date()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exit_condition: '',
      delivery_date: currentDate,
      isWarranty: false
    }
  })

  function onSubmit (values) {
    isLoading(true)

    if (state === 'En reparación') {
      const exitCondition = { exit_condition: values.exit_condition }
      setRepairEquipment(equipment.id, exitCondition)
      isLoading(false)
    } else if (state === 'Reparado') {
      const formattedDate = format(new Date(values.delivery_date), 'dd/MM/yyyy HH:mm')
      const date = { delivery_date: formattedDate }
      setDeliveredEquipment(equipment.id, date)
      isLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-4 pr-4 pl-4'>
        <div className='grid w-full items-center gap-4'>
          {
            state === 'En reparación'
              ? (
                <div className='flex flex-col space-y-1.5'>
                  <FormField
                    control={form.control}
                    name='exit_condition'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='exit_condition'>Condición de salida del equipo</FormLabel>
                        <FormControl>
                          <Textarea
                            id='exit_condition'
                            placeholder='Describe la condición del equipo después de la reparación'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                )
              : (
                <div className='flex flex-col space-y-1.5'>
                  <FormField
                    control={form.control}
                    name='delivery_date'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Fecha de entrega del equipo</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value
                                  ? (
                                      format(field.value, 'dd/MM/yyyy')
                                    )
                                  : (
                                    <span>Selecciona un día</span>
                                    )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              weekStartsOn={0}
                              locale={es}
                              mode='single'
                              selected={field.value}
                              /* eslint-disable react/jsx-handler-names */
                              onSelect={field.onChange}
                              disabled={date =>
                                date > new Date() || date < dateObj}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Tienes que seleccionar la fecha de entrega del equipo
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                )
          }
        </div>

        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='equipment'>Equipo Reparado</Label>
          <div className='grid gap-1'>
            <div className='flex items-center justify-between'>
              <span>Cliente:</span>
              <span>{equipment.customer}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Teléfono: </span>
              <span>{equipment.phone}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Dispositivo: </span>
              <span>{equipment.device}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Marca y modelo:</span>
              <span>
                {equipment.brand} - {equipment.model}
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:justify-end gap-2'>
          {
            loading
              ? (
                <Button disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                  Cargando
                </Button>
                )
              : (
                <Button type='submit' className='w-full md:w-auto'>
                  <Save className='w-4 h-4 mr-2' />
                  Guardar
                </Button>
                )
          }

          <Button type='button' variant='secondary' onClick={() => setOpen(false)}>
            <X className='w-4 h-4 mr-2' />
            Cancelar
          </Button>
        </div>
      </form>
    </Form>

  )
}
