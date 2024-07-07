/* eslint-disable camelcase */
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormFields } from './FormFields'

export const EquipmentFormDialog = ({ children, open, setOpen, title, description, equipment, device, exit_condition }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className='max-w-screen-md'>
        <DialogHeader className='pt-4 pr-4 pl-4'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

        </DialogHeader>

        <FormFields setOpen={setOpen} equipment={equipment} device={device} exit_condition={exit_condition} />

      </DialogContent>
    </Dialog>
  )
}
