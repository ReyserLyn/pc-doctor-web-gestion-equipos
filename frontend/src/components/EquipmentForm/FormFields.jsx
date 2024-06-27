import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { useState, useEffect, useContext } from 'react'
import { EquipmentContext } from '@/context/equipment'

const formSchema = z.object({
  customer: z
    .string()
    .min(2, { message: 'El nombre completo es muy corto' })
    .max(100, { message: 'El nombre completo es muy largo' }),
  phone: z
    .string()
    .regex(/^(\+51)?[1-9]\d{8}$/, { message: 'Número de teléfono inválido' }),
  device_id: z
    .string({
      required_error: 'Seleccion inválida'
    }).min(1, { message: 'El equipo es muy corto' })
    .max(50, { message: 'El equipo es muy largo' }),
  brand: z
    .string()
    .min(2, { message: 'La marca es muy corta' })
    .max(50, { message: 'La marca es muy larga' }),
  model: z
    .string()
    .min(1, { message: 'El modelo es muy corto' })
    .max(50, { message: 'El modelo es muy largo' }),
  entry_condition: z
    .string()
    .min(5, { message: 'La condición de entrada es muy corta' })
    .max(1000, { message: 'La condición de entrada es muy larga' }),
  services: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'Tienes que seleccionar mínimo uno'
  })
})

const servicesFetch = [
  {
    name: 'Mantenimiento'
  },
  {
    name: 'Internet'
  },
  {
    name: 'Windows'
  },
  {
    name: 'Limpieza'
  },
  {
    name: 'Recarga Tintas'
  },
  {
    name: 'Juegos'
  },
  {
    name: 'Reparación'
  },
  {
    name: 'Programas'
  },
  {
    name: 'Drivers'
  },
  {
    name: 'Formateo'
  },
  {
    name: 'Antivirus'
  },
  {
    name: 'Actualizaciones'
  }
]

export function FormFields ({ setOpen, equipment, device }) {
  const { createEquipment, editEquipment } = useContext(EquipmentContext)

  const [showOtherInput, setShowOtherInput] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: '',
      phone: '',
      brand: '',
      model: '',
      device_id: '',
      entry_condition: '',
      services: ['Mantenimiento', 'Limpieza']
    }
  })

  useEffect(() => {
    if (equipment) {
      form.reset({
        customer: equipment.customer,
        phone: equipment.phone,
        brand: equipment.brand,
        model: equipment.model,
        device_id: getDeviceId(device),
        entry_condition: equipment.entry_condition,
        services: equipment.services ? equipment.services.split(', ') : ['Mantenimiento Interno', 'Activaciones']
      })

      if (getDeviceId(device) === '4') {
        form.setValue('device_id', device)
        setShowOtherInput(true)
      }

      setIsEdit(true)
    }
  }, [equipment])

  const getDeviceId = (deviceName) => {
    switch (deviceName) {
      case 'Laptop':
        return '1'
      case 'Computadora':
        return '2'
      case 'Impresora':
        return '3'
      default:
        return '4'
    }
  }

  const handleSelectChange = (value) => {
    if (value === '4') {
      form.setValue('device_id', '')
      setShowOtherInput(true)
    } else {
      setShowOtherInput(false)
    }
  }

  async function onSubmit (values) {
    if (isEdit) {
      const hasChanges =
        values.customer !== equipment.customer ||
        values.phone !== equipment.phone ||
        values.brand !== equipment.brand ||
        values.model !== equipment.model ||
        values.entry_condition !== equipment.entry_condition ||
        !arraysEqual(values.services, equipment.services.split(', '))

      let hasChangesDevice
      if (getDeviceId(device) === '4') {
        hasChangesDevice = values.device_id !== getDeviceId(device)
      } else {
        hasChangesDevice = values.device_id !== equipment.device
      }

      if (hasChanges && hasChangesDevice) {
        editEquipment(values, equipment.id)
      } else {
        toast.error('No se realizó ningún cambio')
      }
    } else {
      createEquipment(values)
      setOpen(false)
    }
  }

  function arraysEqual (array1, array2) {
    if (array1.length !== array2.length) return false

    array1 = array1.sort()
    array2 = array2.sort()

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) return false
    }
    return true
  }

  function transformServices (services) {
    return services.map(service => ({
      id: service.name.toLowerCase().replace(/\s+/g, '-'),
      label: service.name
    }))
  }

  const services = transformServices(servicesFetch)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-4 pr-4 pl-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='customer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='customer'>Nombre completo del cliente</FormLabel>
                  <FormControl>
                    <Input id='customer' placeholder='Ingresa el nombre completo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='phone'>Número de teléfono del cliente</FormLabel>
                  <FormControl>
                    <Input id='phone' placeholder='Ingresa el número de teléfono' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='device_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispositivo</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleSelectChange(value)
                    }}
                    defaultValue={device ? getDeviceId(device) : field.value}

                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona el dispositivo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={1} value='1'>Laptop</SelectItem>
                      <SelectItem key={2} value='2'>Computadora</SelectItem>
                      <SelectItem key={3} value='3'>Impresora</SelectItem>
                      <SelectItem key={4} value='4'>Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='brand'>Marca del equipo</FormLabel>
                  <FormControl>
                    <Input id='brand' placeholder='Ingresa la marca del equipo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='model'>Modelo del equipo</FormLabel>
                  <FormControl>
                    <Input id='model' placeholder='Ingresa el modelo del equipo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {
            showOtherInput
              ? (
                <div className='space-y-2'>
                  <FormField
                    control={form.control}
                    name='device_id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Otro dispositivo</FormLabel>
                        <FormControl>
                          <Input placeholder='Ingresa el dispositivo' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                )
              : <></>
          }
          <div className='space-y-2 md:col-span-3'>
            <FormField
              control={form.control}
              name='entry_condition'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='entry_condition'>Condición de entrada</FormLabel>
                  <FormControl>
                    <Textarea
                      id='entry_condition'
                      placeholder='Describe la condición de entrada del equipo'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2 md:col-span-3'>
            <FormField
              control={form.control}
              name='services'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>Servicios</FormLabel>
                    <FormDescription>
                      Seleccione los servicios a realizar.
                    </FormDescription>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    {services.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='services'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex flex-row items-start space-x-3 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => {
                                    const updatedValues = checked
                                      ? [...field.value, item.label]
                                      : field.value?.filter(value => value !== item.label)
                                    field.onChange(updatedValues)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        <div className='flex flex-col md:flex-row md:items-center md:justify-end gap-2'>
          <Button type='submit' className='w-full md:w-auto'>Guardar</Button>
          <Button type='button' variant='secondary' onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </form>
    </Form>
  )
}
