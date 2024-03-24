// pages/api/articles/[id].js
import { query } from '../../../lib/db'

// 获取所有文章的 ID
export default async function handler (req, res) {
  try {
    const results = await query('SELECT id FROM articles')
    if (results.length === 0) {
      res.status(404).json({ message: 'id is not exist!' })
    } else {
      res.status(200).json(results)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
