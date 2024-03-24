import Link from 'next/link'
// 头部组件
const Header = () => {
  return (
    <>
      <header className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 flex justify-between items-center">
        你好，欢迎！
        <Link href="/admin/new-article" className="text-white mr-10">
          新建文章
        </Link>
      </header>
    </>
  )
}
export default Header
