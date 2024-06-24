import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { FormFields } from './FormFields'

export function UserFormDialog ({ children, open, setOpen, title, description, user, role, status }) {
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

        <FormFields setOpen={setOpen} user={user} role={role} status={status} />

      </DialogContent>
    </Dialog>
  )
}
