import { pool } from '../../config/db.js'


const registerUser = async (newUser) => {
  const query = 'INSERT INTO USUARIO (nombre, apellidos, email, clave) VALUES ($1, $2, $3, $4) RETURNING *'
  const { name, lastname, email, password } = newUser

  try {
    const result = await pool.query(query, [name, lastname, email, password])
    const user = result.rows[0]
    return user
  } catch (err) {
    console.error(err)
    throw new Error('Error en la base de datos al crear el usuario')
  }
}

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM USUARIO WHERE email = $1`

  try {
    const result = await pool.query(query, [email])
    const user = result.rows[0]
    return user
  } catch (err) {
    console.error(err)
    throw new Error('Error en la base de datos al obtener el usuario')
  }
}

const getUserById = async (id) => {
  const query = `SELECT * FROM USUARIO WHERE id = $1`

  try {
    const result = await pool.query(query, [id])
    const user = result.rows[0]
    return user
  } catch (err) {
    console.error(err)
    throw new Error('Error en la base de datos al obtener el usuario')
  }
}

const updateClave = async (id_usuario, nuevaClave) => {
  const query = `
    UPDATE usuario
    SET clave = $1
    WHERE id = $2
    RETURNING id, clave;
  `;
  
  try {
    const result = await pool.query(query, [nuevaClave, id_usuario]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al actualizar la clave:', error);
    throw new Error('Error en la base de datos al actualizar la clave');
  }
};



export { getUserByEmail, getUserById, registerUser, updateClave }
