'use client'

import { Navbar } from '@/components/Navbar'
import { DesignNavbar } from '@/components/DesignNavbar'
import { BoxLayout } from '@/components/BoxLayout'

export default function BoxLayoutPage() {
  return (
    <main>
      <Navbar />
      <DesignNavbar />
      <BoxLayout />
    </main>
  )
}

