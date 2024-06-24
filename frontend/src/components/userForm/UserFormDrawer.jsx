import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormFields } from './FormFields'

export const UserFormDrawer = ({ children, open, setOpen, title, description, user, role, status }) => {
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
            <FormFields setOpen={setOpen} user={user} role={role} status={status} />
          </div>
        </ScrollArea>

      </DrawerContent>

    </Drawer>
  )
}
