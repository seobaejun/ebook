import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: '부스트 바이브코딩 - 라이브 코딩 교육',
  description: '부스트 바이브코딩에 대한 설명 사이트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={notoSansKR.className}>{children}</body>
    </html>
  )
}
