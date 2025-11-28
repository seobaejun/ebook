'use client'

import { Navbar } from '@/components/Navbar'
import { DesignNavbar } from '@/components/DesignNavbar'
import { CardDesignTest } from '@/components/CardDesignTest'

export default function DesignPage() {
  return (
    <main>
      <Navbar />
      <DesignNavbar />
      <CardDesignTest />
    </main>
  )
}

