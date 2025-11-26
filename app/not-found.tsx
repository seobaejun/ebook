import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h2 className="text-5xl font-bold mb-4">404</h2>
      <p className="text-2xl text-center mb-6">페이지를 찾을 수 없습니다.</p>
      <p className="text-lg text-center mb-8">
        요청하신 페이지는 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
