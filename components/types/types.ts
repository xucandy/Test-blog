import { ReactNode } from 'react'

export interface Article {
  id?: number
  title: string
  published_date: string
  content?: string
}

export interface ListProps {
  articles: Article[]
}

export interface FormProps {
  onSubmit: (article: Article) => void
}

export interface DetailProps {
  article: Article
}

export interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  metaKeywords?: string
  canonicalUrl?: string
  structuredData?: object
}
