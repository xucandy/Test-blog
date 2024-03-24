// pages/api/articles/new.js
import { query } from '../../../lib/db'
import moment from 'moment'

// 请求路径：POST /api/articles/new，新增文章。
export default async function handler (req, res) {

  try {
    let { title, content, published_date } = req.body
    // 格式化日期
    published_date = moment(published_date).format("yyyy-MM-DD")
    const updated_date = moment(new Date()).format("yyyy-MM-DD")

    const results = await query('INSERT INTO articles (title, content, published_date,updated_date) VALUES (?, ?, ?,?)', [title, content, published_date, updated_date])

    res.status(201).json({ id: results.insertId, title, content, published_date })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}