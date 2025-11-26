'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Book } from '@/components/Book'

export default function Home() {
  useEffect(() => {
    // 새로고침 시 항상 상단으로 스크롤 (해시가 있어도 상단으로 이동)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <Navbar />
      <Hero />
      <Book />
    </main>
  )
}
