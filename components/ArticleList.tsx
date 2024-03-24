import Link from 'next/link'
import moment from 'moment'
import { ListProps } from '../components/types/types'
// 文章列表组件
const ArticleList: React.FC<ListProps> = ({ articles }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">文章列表</h2>
      {articles.map((article) => (
        <div key={article.id} className="border-b py-4 flex justify-between">
          <Link
            href={`/articles/${article.id}`}
            className="text-blue-500 hover:underline mr-2">
            {article.title}
          </Link>
          <p className="text-gray-500">{article.published_date}</p>
        </div>
      ))}
    </div>
  )
}

export default ArticleList
