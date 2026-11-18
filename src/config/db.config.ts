import { Pool, types } from 'pg';

// PostgreSQL devuelve los NUMERIC (precio, total) como texto; así llegan como número
types.setTypeParser(1700, (valor) => parseFloat(valor));

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
