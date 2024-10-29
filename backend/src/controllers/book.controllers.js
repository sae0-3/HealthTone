import {
  deleteFavorite as deleteFav,
  getBookAll as getAll,
  getBookById as getById,
  getFavoriteAll as getFavs,
  saveFavorite as saveFav
} from '../models/book.models.js'


const getBookById = async (req, res) => {
  const id = req.params.id

  try {
    const result = await getById(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obtener los datos' })
  }
}

const getBookAll = async (req, res) => {
  const { search, section } = req.query

  try {
    const result = await getAll(search, section)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obtener los datos' })
  }
}

const saveFavorite = async (req, res) => {
  const { id: id_user } = req.user
  const { id_content } = req.body

  try {
    await saveFav(id_user, id_content)
    res.status(201).send('Favorito registrado exitosamente')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al guardar favorito')
  }
}

const deleteFavorite = async (req, res) => {
  const { id: id_user } = req.user
  const { id_content } = req.body

  try {
    await deleteFav(id_user, id_content)
    res.status(201).send('Favorito eliminado exitosamente')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al eliminar favorito')
  }
}

const getFavoriteAll = async (req, res) => {
  const { id } = req.user

  try {
    const result = await getFavs(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Error al obtener los favoritos' })
  }
}


export { deleteFavorite, getBookAll, getBookById, getFavoriteAll, saveFavorite }
