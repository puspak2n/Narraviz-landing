import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NarraViz AI - Transform Data into Insights Instantly',
  description: 'AI-powered data visualization and analytics platform. No coding required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}