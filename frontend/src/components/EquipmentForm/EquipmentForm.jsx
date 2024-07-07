/* eslint-disable camelcase */
import React, { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { EquipmentFormDialog } from './EquipmentFormDialog'
import { EquipmentFormDrawer } from './EquipmentFormDrawer'

export const EquipmentForm = ({ children, title, description, equipment, device, exit_condition }) => {
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
              exit_condition={exit_condition}
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
              exit_condition={exit_condition}
            >
              {children}
            </EquipmentFormDrawer>
            )
      }
    </>
  )
}
