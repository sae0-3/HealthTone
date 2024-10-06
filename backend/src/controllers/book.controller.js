import {
  getBookById as getById,
  getBookAll as getAll
} from '../models/book.model.js'


export const getBookById = async (req, res) => {
  const id = req.params.id

  try {
    const result = await getById(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obetner los datos' })
  }
}

export const getBookAll = async (_, res) => {
  try {
    const result = await getAll()
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obetner los datos' })
  }
}
