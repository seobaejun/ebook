'use client'

import { Navbar } from '@/components/Navbar'
import { DesignNavbar } from '@/components/DesignNavbar'
import { ButtonGenerator } from '@/components/ButtonGenerator'

export default function ButtonPage() {
  return (
    <main>
      <Navbar />
      <DesignNavbar />
      <ButtonGenerator />
    </main>
  )
}

