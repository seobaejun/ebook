'use client'

import { Navbar } from '@/components/Navbar'
import { DesignNavbar } from '@/components/DesignNavbar'
import { ColorPalette } from '@/components/ColorPalette'

export default function ColorPalettePage() {
  return (
    <main>
      <Navbar />
      <DesignNavbar />
      <ColorPalette />
    </main>
  )
}

