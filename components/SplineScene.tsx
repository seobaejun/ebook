'use client'

import { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false) // Reset error state on scene prop change
  }, [scene])

  const handleError = (error: any) => {
    console.error("Spline scene failed to load:", error)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-black text-white ${className || ''}`}>
        <p className="text-lg mb-2">3D 로봇을 불러오는 데 실패했습니다.</p>
        <p className="text-sm text-gray-400">네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.</p>
      </div>
    )
  }

  return (
    <Suspense 
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-black ${className || ''}`}>
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => setHasError(false)} // Reset error on successful load
        onError={handleError}
      />
    </Suspense>
  )
}
