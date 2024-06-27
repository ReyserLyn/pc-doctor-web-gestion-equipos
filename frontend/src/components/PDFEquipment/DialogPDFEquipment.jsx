import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { PDFEquipment } from './PDFEquipment'

// Función para descargar una URL como archivo PDF
function downloadBlob (url, filename) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function DialogPDFEquipment ({ children, equipments }) {
  const [pdfUrl, setPdfUrl] = useState(null)

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      downloadBlob(pdfUrl, 'boleta-pc-doctor.pdf')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[90vw] h-[80vh]'>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between px-6 py-4 border-b'>
            <h3 className='text-lg font-medium'>Visualizador de PDF</h3>
            <Button onClick={handleDownloadPDF}>Descargar PDF</Button>
          </div>
          <div className='flex-1 overflow-hidden'>
            <PDFEquipment equipments={equipments} setPdf={setPdfUrl} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
