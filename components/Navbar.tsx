'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-2.5 text-2xl font-bold text-black hover:opacity-80 transition-opacity">
          <i className="fas fa-code text-2xl"></i>
          <span>부스트 바이브코딩</span>
        </Link>
        <ul className="hidden md:flex list-none gap-8">
          <li>
            <Link href="#ebook" className="text-gray-800 font-medium transition-colors hover:text-indigo-600">
              전자책
            </Link>
          </li>
          <li>
            <Link href="/design" className="text-gray-800 font-medium transition-colors hover:text-indigo-600">
              디자인
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-800 font-medium transition-colors hover:text-indigo-600">
              문의
            </Link>
          </li>
        </ul>
        <div 
          className="md:hidden flex flex-col cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-gray-800 mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 py-5 flex flex-col items-center gap-5">
          <li>
            <Link href="#ebook" className="text-gray-800 font-medium hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
              전자책
            </Link>
          </li>
          <li>
            <Link href="/design" className="text-gray-800 font-medium hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
              디자인
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-800 font-medium hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
              문의
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
