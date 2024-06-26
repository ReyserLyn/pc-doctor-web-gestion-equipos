'use client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

import { EquipmentForm } from '@/components/EquipmentForm/EquipmentForm'
import { Button } from '@/components/ui/button'
import { SquarePlus, PrinterIcon } from 'lucide-react'
import { DataTable } from '@/components/DataTable/DataTable'

import { NavBar } from '@/components/NavBar'
import { NavBarPhone } from '@/components/navBarPhone'

import { PDFEquipment } from '@/components/PDFEquipment'
import { useState } from 'react'

export function Dashboard () {
  const [selectedRows, setSelectedRows] = useState([])

  return (
    <div className='grid w-full bg-muted/40'>
      <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
        <ResizablePanel defaultSize={15} className='min-w-[200px] max-w-[400px] hidden md:block bg-background'>
          <NavBar />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={85}>
          <div className='w-full p-8 min-h-screen'>

            <NavBarPhone title='Sistema PcDoctor'>

              <PDFEquipment equipments={selectedRows}>
                <Button variant='outline'>
                  <PrinterIcon className='w-5 h-5 mr-2' />
                  Imprimir
                </Button>
              </PDFEquipment>

              <EquipmentForm
                title='Nuevo Equipo'
                description='Completa el formulario para agregar un nuevo equipo.'
              >
                <Button className='ml-auto md:ml-0'>
                  <SquarePlus className='w-5 h-5 mr-2' />
                  Nuevo Equipo
                </Button>
              </EquipmentForm>
            </NavBarPhone>

            <DataTable setSelectedRows={setSelectedRows} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
