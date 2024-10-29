import {
  getBookAll as getAll,
  getBookById as getById
} from '../models/book.models.js'


const getBookById = async (req, res) => {
  const id = req.params.id

  try {
    const result = await getById(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obetner los datos' })
  }
}

const getBookAll = async (req, res) => {
  const { search, section } = req.query

  try {
    const result = await getAll(search, section)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obetner los datos' })
  }
}

const listFiles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    res.json({
      bucket: process.env.FIREBASE_STORAGE_BUCKET,
      files: files.map(file => ({
        name: file.name,
        size: file.metadata.size,
        type: file.metadata.contentType,
        updated: file.metadata.updated
      }))
    });
  } catch (error) {
    console.error('Error al listar archivos:', error);
    res.status(500).json({
      error: 'Error al listar archivos',
      details: error.message
    });
  }
};


export { getBookAll, getBookById, listFiles}
