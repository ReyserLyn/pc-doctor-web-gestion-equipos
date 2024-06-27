/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export function PDFEquipment ({ equipments, setPdf }) {
  const [pdfUrl, setPdfUrl] = useState(null)

  async function modifyPdf () {
    try {
      const url = './ContradoPcDoctor.pdf'
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

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

          const { customer, phone, reception_date, brand, delivery_date, device, entry_condition, exit_condition, model } = equipment
          const [fechaRecepcion, horaRecepcion] = reception_date.split(' ')
          const [fechaEntrega, horaEntrega] = delivery_date.split(' ')

          page.drawText(customer, {
            x: 69,
            y: height - 189,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(phone, {
            x: 304,
            y: height - 189,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(fechaRecepcion, {
            x: 60,
            y: height - 207,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(horaRecepcion, {
            x: 182,
            y: height - 207,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(device, {
            x: 89,
            y: height - 245,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(brand, {
            x: 191,
            y: height - 245,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(model, {
            x: 302,
            y: height - 245,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(entry_condition, {
            x: 24,
            y: height - 425,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(exit_condition, {
            x: 24,
            y: height - 475,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(fechaEntrega, {
            x: 60,
            y: height - 512,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          })

          page.drawText(horaEntrega || 'Pendiente', {
            x: 182,
            y: height - 512,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0)
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
