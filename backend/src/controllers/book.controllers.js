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


export { getBookAll, getBookById }
