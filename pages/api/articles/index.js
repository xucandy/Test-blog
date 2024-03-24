// pages/api/articles/index.js
import { query } from '../../../lib/db'

// 查询所有文章
export default async function handler (req, res) {
  try {
    const results = await query('SELECT id,title,published_date FROM articles order by id desc')
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
