import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FormFields } from './FormFields'

export const StatusForm = ({ children, title, description, equipment }) => {
  const [open, setOpen] = useState(false)

  const titleText = title
  const descriptionText = description

  return (
    <Dialog className='w-[350px] ' open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className='rounded-lg shadow-md p-4 max-w-md mx-auto'>
        <DialogHeader className='pt-4 pr-4 pl-4'>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription>{descriptionText}</DialogDescription>
        </DialogHeader>

        <FormFields setOpen={setOpen} equipment={equipment} state={equipment.state} />
      </DialogContent>
    </Dialog>
  )
}
