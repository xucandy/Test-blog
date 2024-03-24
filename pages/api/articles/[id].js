// pages/api/articles/[id].js
import { query } from '../../../lib/db'

// 获取文章详情
export default async function handler (req, res) {
  const { id } = req.query
  try {
    const results = await query('SELECT * FROM articles WHERE id = ?', [id])
    if (results.length === 0) {
      res.status(404).json({ message: 'Article not found' })
    } else {
      res.status(200).json(results[0])
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
