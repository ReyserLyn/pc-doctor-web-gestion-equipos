/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export function PDFEquipment ({ equipments, setPdf }) {
  const [pdfUrl, setPdfUrl] = useState(null)

  function formatNumberToSixDigits (number) {
    return String(number).padStart(6, '0')
  }

  async function modifyPdf () {
    try {
      const url = './ContratoPcDoctor.pdf'
      const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

      const pdfDoc = await PDFDocument.create()
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      if (equipments.length === 0) {
        const template = await PDFDocument.load(existingPdfBytes)
        const [page] = await pdfDoc.copyPages(template, [0])
        const [pageReverse] = await pdfDoc.copyPages(template, [1])
        pdfDoc.addPage(page)
        pdfDoc.addPage(pageReverse)
      } else {
        for (const equipment of equipments) {
          const template = await PDFDocument.load(existingPdfBytes)
          const [page] = await pdfDoc.copyPages(template, [0])
          const [pageReverse] = await pdfDoc.copyPages(template, [1])
          const { height } = page.getSize()

          const { rowid, customer, phone, reception_date, brand, delivery_date, device, entry_condition, exit_condition, model, services } = equipment
          const [fechaRecepcion, horaRecepcion] = reception_date.split(' ')
          const [fechaEntrega, horaEntrega] = delivery_date.split(' ')

          const serviceCoordinates = {
            Mantenimiento: { x: 133, y: height - 349 },
            Internet: { x: 239, y: height - 349 },
            Windows: { x: 385, y: height - 349 },

            Limpieza: { x: 133, y: height - 364 },
            'Recarga Tintas': { x: 239, y: height - 364 },
            Juegos: { x: 385, y: height - 364 },

            Reparación: { x: 133, y: height - 379 },
            Programas: { x: 239, y: height - 379 },
            Drivers: { x: 385, y: height - 379 },

            Formateo: { x: 133, y: height - 394 },
            Antivirus: { x: 239, y: height - 394 },
            Actualizaciones: { x: 385, y: height - 394 }
          }

          page.drawText(formatNumberToSixDigits(rowid), {
            x: 353,
            y: height - 163,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(customer, {
            x: 69,
            y: height - 189,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(phone, {
            x: 304,
            y: height - 189,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(fechaRecepcion, {
            x: 60,
            y: height - 207,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(horaRecepcion, {
            x: 182,
            y: height - 207,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(device, {
            x: 89,
            y: height - 245,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(brand, {
            x: 208,
            y: height - 245,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(model, {
            x: 330,
            y: height - 245,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(entry_condition, {
            x: 24,
            y: height - 425,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(exit_condition, {
            x: 24,
            y: height - 475,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(fechaEntrega, {
            x: 60,
            y: height - 512,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(horaEntrega || 'Pendiente', {
            x: 182,
            y: height - 512,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          const servicesArray = services.split(',').map(service => service.trim())

          servicesArray.forEach(service => {
            const { x, y } = serviceCoordinates[service]
            page.drawText('×', { x, y, size: 20, color: rgb(0, 0, 0) })
          })

          pdfDoc.addPage(page)
          pdfDoc.addPage(pageReverse)
        }
      }

      const pdfBytes = await pdfDoc.save()

      const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))
      setPdfUrl(pdfUrl)
      setPdf(pdfUrl)
    } catch (error) {
      console.error('Error al modificar el PDF:', error)
    }
  }

  useEffect(() => {
    modifyPdf()
  }, [])

  return (
    <>
      {pdfUrl && (
        <object
          className='min-h-full w-full'
          data={pdfUrl}
          type='application/pdf'
        >
          <p>El visualizador de PDF no funciona en este dispositivo.</p>
        </object>
      )}
    </>
  )
}
