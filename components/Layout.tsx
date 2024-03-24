// components/Layout.tsx
import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { LayoutProps } from './types/types'

// 布局组件
const Layout: React.FC<LayoutProps> = ({
  title = '我的博客',
  description = '我的博客',
  canonicalUrl = '/',
  metaKeywords = '博客',
  structuredData = {},
  children,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={metaKeywords} />
        {/* 其他头部元素 */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Head>
      <Header />

      <main className="container mx-auto p-4 flex-grow mt-10 overflow-auto ">
        {children}
      </main>
      {!Object.keys(structuredData).length && <Footer />}
    </div>
  )
}

export default Layout
