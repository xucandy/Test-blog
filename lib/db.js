// lib/db.js
import mysql from 'mysql'

// 创建mysql数据库
const pool = mysql.createPool({
  connectionLimit: process.env.CON_LIMIT, // Adjust the limit based on your application's needs
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})
// 封装mysql查询
export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
