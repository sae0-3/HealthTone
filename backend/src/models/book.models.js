import { pool } from '../config/db.js'


const getBookById = async (id) => {
  const query = `
  SELECT
    co.id,
    co.nombre,
    autor,
    url_texto,
    url_portada,
    url_audio,
    COALESCE(
      json_agg(
        json_build_object(
          'id',ca.id,
          'name',ca.nombre
        )
      ) FILTER (WHERE ca.id IS NOT NULL),
      '[]'
    ) AS categorias
  FROM CONTENIDO co
    LEFT JOIN R_CONTENIDO_CATEGORIA r on id_contenido = co.id
    LEFT JOIN CATEGORIA ca on ca.id = id_categoria
  WHERE co.id = $1
  GROUP BY co.id,co.nombre,autor,url_texto,url_portada,url_audio
  `

  try {
    const result = await pool.query(query, [id])
    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener contenido:', error)
    throw new Error('Error en la base de datos al obtener contenido')
  }
}

const getBookAll = async (search, section) => {
  let query
  let params = []

  if (!!search) {
    query = `SELECT * FROM buscar($1)`
    params = [search]
  } else {
    switch (section) {
      case 'nuevos_lanzamientos':
        query = `
    SELECT
      co.id,
      co.nombre,
      autor,
      url_texto,
      url_portada,
      url_audio,
      COALESCE(
        json_agg(
          json_build_object(
            'id',ca.id,
            'name',ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categorias
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on r.id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
    GROUP BY co.id,co.nombre,autor,url_texto,url_portada,url_audio
    ORDER BY fecha_subida DESC
    `
        break;
      case 'populares':
        query = `
    SELECT
      co.id,
      co.nombre,
      autor,
      url_texto,
      url_portada,
      url_audio,
      COALESCE(
        json_agg(
          json_build_object(
            'id',ca.id,
            'name',ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categorias
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on r.id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
      LEFT JOIN VISUALIZACION v on v.id_contenido = co.id
    GROUP BY co.id,co.nombre,autor,url_texto,url_portada,url_audio
    ORDER BY COUNT(v.id) DESC
    `
        break;
      case 'proximos_lanzamientos':
        query = `
    SELECT
      e.id,
      e.nombre,
      autor,
      url_portada,
      publicado,
      COALESCE(
        json_agg(
          json_build_object(
            'id',ca.id,
            'name',ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categorias
    FROM ESTRENO e
      LEFT JOIN R_ESTRENO_CATEGORIA r on r.id_estreno = e.id
      LEFT JOIN CATEGORIA ca on ca.id = r.id_categoria
    GROUP BY e.id,e.nombre,autor,url_portada,publicado
    `
        break;
      default:
        query = `
    SELECT
      co.id,
      co.nombre,
      autor,
      url_texto,
      url_portada,
      url_audio,
      COALESCE(
        json_agg(
          json_build_object(
            'id',ca.id,
            'name',ca.nombre
          )
        ) FILTER (WHERE ca.id IS NOT NULL),
        '[]'
      ) AS categorias
    FROM CONTENIDO co
      LEFT JOIN R_CONTENIDO_CATEGORIA r on id_contenido = co.id
      LEFT JOIN CATEGORIA ca on ca.id = id_categoria
    GROUP BY co.id,co.nombre,autor,url_texto,url_portada,url_audio
    ORDER BY co.id
    `
    }
  }

  try {
    const result = await pool.query(query, params)
    return result.rows
  } catch (err) {
    console.error('Error al obtener contenido:', err)
    throw new Error('Error en la base de datos al obtener contenido')
  }
}

const saveFavorite = async (id_user, id_content) => {
  const query = 'INSERT INTO FAVORITO (id_contenido, id_usuario) VALUES ($1, $2)'

  try {
    await pool.query(query, [id_content, id_user])
  } catch (err) {
    console.error('Error al guardar favorito:', err)
    throw new Error('Error en la base de datos al guardar favorito')
  }
}

const deleteFavorite = async (id_user, id_content) => {
  const searchFavorite = 'SELECT 1 FROM FAVORITO WHERE id_contenido = $1 AND id_usuario = $2'
  const deleteQuery = 'DELETE FROM FAVORITO WHERE id_contenido = $1 AND id_usuario = $2'

  try {
    const result = await pool.query(searchFavorite, [id_content, id_user])

    if (result.rowCount === 0) {
      throw new Error('El favorito no existe o ya ha sido eliminado')
    }

    await pool.query(deleteQuery, [id_content, id_user])
  } catch (err) {
    console.error('Error al eliminar favorito:', err.message)
    throw new Error('Error en la base de datos al eliminar favorito')
  }
}

const getFavoriteAll = async (id_user) => {
  const query = `
  SELECT 
    fa.id_usuario,
    fa.id_contenido,
    fa.fecha,
    co.id,
    co.nombre,
    co.autor,
    co.url_texto,
    co.url_portada,
    co.url_audio,
    COALESCE(
      json_agg(
        json_build_object(
          'id', ca.id,
          'nombre', ca.nombre
        )
      ) FILTER (WHERE ca.id IS NOT NULL),
      '[]'
    ) AS categorias
    FROM FAVORITO fa
      JOIN CONTENIDO co ON fa.id_contenido = co.id
      LEFT JOIN R_CONTENIDO_CATEGORIA r ON co.id = r.id_contenido
      LEFT JOIN CATEGORIA ca ON ca.id = r.id_categoria
    WHERE fa.id_usuario = $1
    GROUP BY 
      fa.id_usuario,
      fa.id_contenido,
      fa.fecha,
      co.id,
      co.nombre,
      co.autor,
      co.url_texto,
      co.url_portada,
      co.url_audio
  `

  try {
    const result = await pool.query(query, [id_user])
    return result.rows
  } catch (err) {
    console.error('Error al obtener favoritos:', err)
    throw new Error('Error en la base de datos al obtener favoritos')
  }
}

const toggleFavorite = async (id_user, id_content) => {
  try {
    await deleteFavorite(id_user, id_content)
    return 'Eliminado'
  } catch (err) {
    await saveFavorite(id_user, id_content)
    return 'Agregado'
  }
}


export {
  deleteFavorite,
  getBookAll,
  getBookById,
  getFavoriteAll,
  saveFavorite,
  toggleFavorite
}
