'use client'

import { Navbar } from '@/components/Navbar'
import { DesignNavbar } from '@/components/DesignNavbar'
import { GradientGenerator } from '@/components/GradientGenerator'

export default function GradientPage() {
  return (
    <main>
      <Navbar />
      <DesignNavbar />
      <GradientGenerator />
    </main>
  )
}

