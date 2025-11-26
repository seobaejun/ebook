'use client'

import { SplineScene } from '@/components/SplineScene'

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Left content - 문구 */}
        <div className="flex-1 p-8 md:p-16 md:pl-32 lg:pl-40 xl:pl-48 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-white">
            <span className="text-yellow-400">AI</span> 부스트 바이브 코딩
          </h1>
          <p className="text-neutral-300 max-w-2xl text-lg md:text-xl mb-2 leading-relaxed">
            실시간으로 코드를 작성하고 개선하는 과정을 생생하게 경험하세요.
          </p>
          <p className="text-neutral-300 max-w-lg text-lg md:text-xl mb-8 leading-relaxed">
            이론이 아닌 실전 경험을 통해 진짜 개발 실력을 키워보세요.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#ebook"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              전자책 바로가기
            </a>
            <a
              href="#design"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              디자인 바로가기
            </a>
          </div>
        </div>
        
        {/* Right content - Spline 3D 로봇 */}
        <div className="flex-1 relative w-full h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
