/* eslint-disable camelcase */
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormFields } from './FormFields'

export const EquipmentFormDrawer = ({ children, open, setOpen, title, description, equipment, device, exit_condition }) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent className='max-h-[90vh]'>

        <DrawerHeader className='text-left pt-4 pr-4 pl-4'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className='h-auto overflow-y-auto'>
          <div className='mx-4'>
            <FormFields setOpen={setOpen} equipment={equipment} device={device} exit_condition={exit_condition} />
          </div>
        </ScrollArea>

      </DrawerContent>

    </Drawer>
  )
}
