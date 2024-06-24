import React, { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { UserFormDialog } from './UserFormDialog'
import { UserFormDrawer } from './UserFormDrawer'

export const UserForm = ({ children, title, description, user, role, status }) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {
        isDesktop
          ? (
            <UserFormDialog
              open={open}
              setOpen={setOpen}
              title={title}
              description={description}
              user={user}
              role={role}
              status={status}
            >
              {children}
            </UserFormDialog>
            )
          : (
            <UserFormDrawer
              open={open}
              setOpen={setOpen}
              title={title}
              description={description}
              user={user}
              role={role}
              status={status}
            >
              {children}
            </UserFormDrawer>
            )
      }
    </>
  )
}
