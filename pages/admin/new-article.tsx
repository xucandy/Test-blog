// pages/admin/new-article.tsx
import React, { useState } from 'react'
import ArticleForm from '../../components/ArticleForm'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Article } from '../../components/types/types'
import http from '../../lib/http'
// 新建文章组件
const NewArticle: React.FC = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (newArticle: Article) => {
    setIsSubmitting(true)
    try {
      const response = await http.post('/api/articles/new', newArticle)

      const responseData = response.data
      if (!response.status) {
        throw new Error('Failed to add article')
      }
      toast.success('新增文章成功!1秒后跳转到文章列表', {
        autoClose: 1000,
        closeOnClick: true,
        onClose: () => {
          router.push('/')
        },
      })
    } catch (error) {
      toast.warn('服务器错误，请联系管理员', {
        autoClose: 50,
      })
    }
  }

  return (
    <div className="flex flex-col items-center p-4  min-h-screen">
      {isSubmitting && (
        <div
          id="disable-layer"
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white">文章提交中...</p>
        </div>
      )}
      <h2 className="text-blue-500 text-2xl font-bold mb-4">新建文章</h2>
      <ArticleForm onSubmit={handleSubmit} />
      <Link
        href="/"
        className="text-blue-500 border-t hover:underline w-full text-center  relative mt-2">
        返回列表
      </Link>
    </div>
  )
}

export default NewArticle
