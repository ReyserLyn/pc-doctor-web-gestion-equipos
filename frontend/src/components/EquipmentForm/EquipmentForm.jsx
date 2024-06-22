import React, { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { EquipmentFormDialog } from './EquipmentFormDialog'
import { EquipmentFormDrawer } from './EquipmentFormDrawer'

export const EquipmentForm = ({ children, title, description, equipment, device }) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {
        isDesktop
          ? (
            <EquipmentFormDialog
              open={open}
              setOpen={setOpen}
              title={title}
              description={description}
              equipment={equipment}
              device={device}
            >
              {children}
            </EquipmentFormDialog>
            )
          : (
            <EquipmentFormDrawer
              open={open}
              setOpen={setOpen}
              title={title}
              description={description}
              equipment={equipment}
              device={device}
            >
              {children}
            </EquipmentFormDrawer>
            )
      }
    </>
  )
}
