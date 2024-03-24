import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { DetailProps } from '../components/types/types'
import Layout from '../components/Layout'
// 文章详情组件
const ArticleDetail: React.FC<DetailProps> = ({ article }) => {
  // 构建结构化数据对象
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.title,
    datePublished: article.published_date,
    author: {
      '@type': 'Person',
      name: 'blog',
    },
  }
  return (
    <Layout
      title={article.title} // 确保提供了标题属性
      description={article.title}
      canonicalUrl={`${process.env.BASE_URL}/articles/${article.id}`}
      metaKeywords={`${article.title},'文章', '详情'`}
      structuredData={structuredData}>
      <div className="max-w-4xl mx-auto px-4 p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">{article.title}</h1>

        <div className="py-4 flex justify-between min-h-[28rem]">
          <ReactMarkdown
            className="text-gray-500  max-w-full whitespace-pre-line  prose"
            skipHtml={true}>
            {article.content}
          </ReactMarkdown>
        </div>
        <Link
          href="/"
          className="text-blue-500 border-t hover:underline mr-2  bottom-20  md:bottom-20">
          返回文章列表
        </Link>
      </div>
    </Layout>
  )
}

export default ArticleDetail
