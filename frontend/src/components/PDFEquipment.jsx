import React from 'react'
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from './ui/button'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  section: {
    marginBottom: 10
  },
  heading: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  row: {
    marginBottom: 20
  },
  label: {
    width: 120,
    marginRight: 10,
    fontWeight: 'bold'
  },
  value: {
    flex: 1
  }
})

export function PDFEquipment ({ children, equipments }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[90vw] h-[80vh]'>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between px-6 py-4 border-b'>
            <h3 className='text-lg font-medium'>Visualizador de PDF</h3>
            <PDFDownloadLink document={<PDFComponent equipments={equipments} />} fileName='equipments.pdf'>
              {({ loading }) =>
                loading
                  ? <Button variant='outline'>Cargando Documento...</Button>
                  : <Button variant='outline'>Descargar PDF</Button>}
            </PDFDownloadLink>
          </div>
          <div className='flex-1 overflow-hidden'>
            <PDFViewer width='100%' height='100%'>
              <PDFComponent equipments={equipments} />
            </PDFViewer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PDFComponent ({ equipments }) {
  return (
    <Document>
      <Page size='A5' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Equipos Seleccionados:</Text>
          {equipments.map((equipment, index) => (
            <View key={index} style={styles.row}>
              <Text>ID: {equipment.id}</Text>
              <Text>Marca: {equipment.brand}</Text>
              <Text>Modelo: {equipment.model}</Text>
              <Text>Cliente: {equipment.customer}</Text>
              <Text>Teléfono: {equipment.phone}</Text>
              <Text>Estado: {equipment.state}</Text>
              <Text>Fecha de Recepción: {equipment.reception_date}</Text>
              <Text>Fecha de Entrega: {equipment.delivery_date}</Text>
              <Text>Condición de Entrada: {equipment.entry_condition}</Text>
              <Text>Condición de Salida: {equipment.exit_condition}</Text>
              <Text>Servicios: {equipment.services}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
