// pages/index.tsx
import { NextPage, GetStaticProps } from 'next'
import ArticleList from '../components/ArticleList'
import { Article, ListProps } from '../components/types/types'
import http from '../lib/http'

//定义GraphQL查询结构
const GET_ARTICLES = `
  query GetArticles {
    articles {
      id
      title
      published_date
    }
  }
`
// 首页组件
const Home: NextPage<ListProps> = ({ articles }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {/* 博客列表组件 */}
      <ArticleList articles={articles} />
    </div>
  )
}
// 通过getStaticProps的方式获取文章列表，传递给首页组件
export const getStaticProps: GetStaticProps<ListProps> = async () => {
  try {
    // 通过GraphQL的方式查询文章列表
    const { data } = await http.post('/api/articles/graphql', {
      query: GET_ARTICLES,
    })

    const articles: Article[] = data?.data?.articles || []

    return {
      props: {
        articles,
      },
      revalidate: 60 * 5, // 5分钟重新生成
    }
  } catch (error) {
    return {
      props: {
        articles: [],
      },
    }
  }
}
export default Home
