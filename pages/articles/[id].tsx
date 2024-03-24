// pages/articles/[id].tsx
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import ArticleDetail from '../../components/ArticleDetail'
import http from '../../lib/http'
import { Article } from '../../components/types/types'

//文章详情组件
const ArticlePage: NextPage<{ article: Article }> = ({ article }) => {
  return (
    <div>
      {article === undefined ? (
        ''
      ) : article ? (
        <ArticleDetail article={article} />
      ) : (
        <p>Article not found</p>
      )}
    </div>
  )
}

// 通过getStaticProps的方式获取文章详情，传递给文章详情组件
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id
  if (!id) {
    return {
      notFound: true,
    }
  }

  try {
    // 通过接口查询文章详细
    const response = await http.get(`/api/articles/${id}`)
    const article: Article = response.data

    return {
      props: {
        article,
      },
      // 5分钟重新生成
      revalidate: 60 * 5,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
// 通过getStaticPaths的方式获取文章所有ID，为动态路由生成静态路径
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 通过接口查询所有文章Id
    const response = await http.get('/api/articles/allIds')

    const articleIds: { id: number }[] = response.data
    // Generate paths for each article ID
    const paths = articleIds.map((item) => ({
      params: { id: item.id.toString() },
    }))
    return {
      paths,
      fallback: true,
    }
  } catch (error) {
    console.error('Failed to fetch article IDs:', error)
    return {
      paths: [],
      fallback: true,
    }
  }
}

export default ArticlePage
