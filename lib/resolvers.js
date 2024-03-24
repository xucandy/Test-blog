import { query } from './db'

// 查询构造器
export const resolvers = {
  Query: {
    // 获取所有文章列表的方法
    articles: async () => {
      try {
        const results = await query('SELECT id,title,content, published_date FROM articles ORDER BY id  DESC')
        return results
      } catch (error) {
        throw new Error('Failed to fetch articles')
      }
    },
  },
}
