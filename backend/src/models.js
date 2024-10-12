import { pool } from './config/db.js'


export const getBookById = async (id) => {
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

export const getBookAll = async (search, section) => {
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
