'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DesignNavbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] bg-gray-800/95 backdrop-blur-md border-r border-gray-700 z-40 overflow-y-auto">
      <div className="flex flex-col py-4">
        <Link
          href="/design"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Box Shadow Designer
        </Link>
        <Link
          href="/design/layout"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/layout'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Box Layout
        </Link>
        <Link
          href="/design/glassmorphism"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/glassmorphism'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Glassmorphism
        </Link>
        <Link
          href="/design/neumorphism"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/neumorphism'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Neumorphism
        </Link>
        <Link
          href="/design/animation"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/animation'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Animation
        </Link>
        <Link
          href="/design/gradient"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/gradient'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Gradient
        </Link>
        <Link
          href="/design/color-palette"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/color-palette'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Color Palette
        </Link>
        <Link
          href="/design/typography"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/typography'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Typography
        </Link>
        <Link
          href="/design/button"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/button'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Button
        </Link>
        <Link
          href="/design/border-radius"
          className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
            pathname === '/design/border-radius'
              ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
          }`}
        >
          Border Radius
        </Link>
      </div>
    </nav>
  )
}

