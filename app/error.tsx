'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h2 className="text-3xl font-bold mb-4">문제가 발생했습니다!</h2>
      <p className="text-lg text-center mb-6">
        죄송합니다. 페이지를 로드하는 중 오류가 발생했습니다.
      </p>
      <button
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        다시 시도
      </button>
      <p className="mt-4 text-sm text-gray-600">
        오류 메시지: {error.message}
      </p>
    </div>
  )
}
