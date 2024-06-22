import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { FormFields } from './FormFields'

export const EquipmentFormDrawer = ({ children, open, setOpen, title, description, equipment, device }) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left pt-4 pr-4 pl-4'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>

        <FormFields setOpen={setOpen} equipment={equipment} device={device} />

      </DrawerContent>
    </Drawer>
  )
}
