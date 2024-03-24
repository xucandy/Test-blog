import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import Layout from '../components/Layout'
// 自定义组件
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </Layout>
  )
}
