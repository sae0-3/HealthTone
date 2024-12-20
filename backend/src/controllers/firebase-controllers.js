import { bucket } from '../config/firebase-config.js'

export const listStorageFiles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles()
    const filesList = files
      .filter(file => file.name.endsWith('.epub'))
      .map(file => ({
        name: file.name,
        size: file.metadata.size,
        contentType: file.metadata.contentType,
        timeCreated: file.metadata.timeCreated,
        updated: file.metadata.updated
      }))

    res.json({
      success: true,
      count: filesList.length,
      files: filesList
    })
  } catch (error) {
    console.error('Error al listar archivos:', error)
    res.status(500).json({
      success: false,
      error: 'Error al listar archivos de Firebase Storage',
      details: error.message
    })
  }
}

export const streamEpub = async (req, res) => {
  try {
    const fileName = req.params.fileName
    const file = bucket.file(fileName)

    const [exists] = await file.exists()
    if (!exists) {
      console.log('Archivo no encontrado:', fileName)
      return res.status(404).json({
        success: false,
        error: 'Archivo EPUB no encontrado'
      })
    }

    res.setHeader('Content-Type', 'application/epub+zip')
    res.setHeader('Content-Disposition', `inline filename="${fileName}"`)

    const readStream = file.createReadStream()

    readStream.on('error', (error) => {
      console.error('Error en el stream:', error)
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Error al transmitir el archivo EPUB'
        })
      }
    })

    readStream.pipe(res)

  } catch (error) {
    console.error('Error al obtener EPUB:', error)
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener archivo EPUB',
        details: error.message
      })
    }
  }
}