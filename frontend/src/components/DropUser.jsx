import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'
import { AuthContext } from '@/context/auth'
import { useContext } from 'react'

export function DropUser () {
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  }

  const handleSupportClick = () => {
    const whatsappLink = 'https://api.whatsapp.com/send?phone=51987471074&text=%E2%9A%A0%EF%B8%8F%C2%A1Hola!%20He%20encontrado%20un%20problema%20en%20el%20sistema%20*PcDoctor*%20y%20me%20gustar%C3%ADa%20reportarlo%20para%20su%20revisi%C3%B3n%3A%0A%5BBreve%20descripci%C3%B3n%20del%20problema%5D%0AGracias%20por%20tu%20ayuda.'

    // Open WhatsApp link in a new window
    window.open(whatsappLink, '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='overflow-hidden rounded-full'
        >
          <CircleUser
            width={20}
            height={20}
            alt='Avatar'
            className='overflow-hidden rounded-full'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSupportClick}>Soporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
