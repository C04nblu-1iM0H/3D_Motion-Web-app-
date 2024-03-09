import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {

  const connection  = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    post: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await connection.execute(query, values);
    connection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     post: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
// });

// export const execute = async (query, params = []) => {
//   const connection = await pool.getConnection();
//   try {
//     const [rows] = await connection.execute(query, params);
//     return rows;
//   } finally {
//     connection.release();
//   }
// };