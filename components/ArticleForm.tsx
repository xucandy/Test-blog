// components/ArticleForm.tsx
import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'easymde/dist/easymde.min.css'
import { FormProps } from '../components/types/types'
// 动态加载第三方react-simplemde-editor
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})
// 添加文章Form组件
const ArticleForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [optionsForMDE] = useState({
    spellChecker: false,
    placeholder: '写文章可以使用Markdown...',
    status: false,
  })
  // 提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    onSubmit({ title, content, published_date: publishedDate })

    setTitle('')
    setContent('')
    setPublishedDate('')
  }
  // 验证表单
  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!title.trim()) {
      errors.title = '标题必填'
    }

    if (!content.trim()) {
      errors.content = '内容必填'
    }

    if (!publishedDate.trim()) {
      errors.publishedDate = '发布日期必填'
    } else {
      const dateFormatRegex = /^\d{4}\-\d{2}\-\d{2}$/

      if (!dateFormatRegex.test(publishedDate.trim())) {
        errors.publishedDate = '日期格式不对'
      }
    }
    setErrors(errors)

    return Object.keys(errors).length === 0
  }
  return (
    <form onSubmit={handleSubmit} className="w-full px-4 max-w-xl">
      {errors.title && <p className="text-red-500 mb-2">{errors.title}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="标题"
        className={`w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
          errors.title ? 'border-red-500' : ''
        }`}
      />
      {errors.content && <p className="text-red-500 mb-2">{errors.content}</p>}
      <div className="w-full mb-4 min-h-[400px]">
        <SimpleMDE
          value={content}
          onChange={(value) => setContent(value)}
          options={optionsForMDE}
          className={`w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 prose ${
            errors.content ? 'border-red-500' : ''
          }`}
        />
      </div>
      {errors.publishedDate && (
        <p className="text-red-500 mb-2">{errors.publishedDate}</p>
      )}
      <div>
        <DatePicker
          selected={publishedDate ? new Date(publishedDate) : null}
          onChange={(date: Date | null) =>
            setPublishedDate(date ? date.toISOString().substring(0, 10) : '')
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="发布日期"
          className={`w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
            errors.publishedDate ? 'border-red-500' : ''
          }`}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          发布
        </button>
      </div>
    </form>
  )
}

export default ArticleForm
