import pg from 'pg'


const { Pool } = pg

export const pool = new Pool({
  user: 'healthtone',
  password: '1234',
  host: '',
  database: 'db_healthtone',
  port: 5432
})

pool.connect()
  .then(() => { console.log('Conexion exitosa!') })
  .catch(err => { console.error('Error de conexion', err.stack) })
