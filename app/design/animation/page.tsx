'use client'

import { Navbar } from '@/components/Navbar'
import { DesignNavbar } from '@/components/DesignNavbar'
import { AnimationTool } from '@/components/AnimationTool'

export default function AnimationPage() {
  return (
    <main>
      <Navbar />
      <DesignNavbar />
      <AnimationTool />
    </main>
  )
}

