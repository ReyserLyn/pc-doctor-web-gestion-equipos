import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { PDFEquipment } from './PDFEquipment'
import { Loader2, Download } from 'lucide-react'

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
  const [loading, isLoading] = useState(false)

  const handleDownloadPDF = () => {
    isLoading(true)

    if (pdfUrl) {
      downloadBlob(pdfUrl, 'boleta-pc-doctor.pdf')
    }
    isLoading(false)
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
            {
              loading
                ? (
                  <Button disabled>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                    Cargando
                  </Button>
                  )
                : (
                  <>
                    <Button onClick={handleDownloadPDF}>
                      <Download className='w-4 h-4 mr-2' />
                      Descargar PDF
                    </Button>
                  </>
                  )
            }

          </div>
          <div className='flex-1 overflow-hidden'>
            <PDFEquipment equipments={equipments} setPdf={setPdfUrl} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
