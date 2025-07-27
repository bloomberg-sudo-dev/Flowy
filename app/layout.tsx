import type { Metadata, Viewport } from 'next'
import { Orbitron } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900']
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'FLOWY - Retro Workflow Builder',
  description: 'A cyberpunk-themed visual workflow builder for the digital age',
  generator: 'FLOWY v1.0',
  keywords: ['workflow', 'automation', 'retro', 'cyberpunk', 'visual programming'],
  authors: [{ name: 'FLOWY Systems' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${spaceMono.style.fontFamily};
  --font-display: ${orbitron.variable};
  --font-mono: ${spaceMono.variable};
}
        `}</style>
      </head>
      <body className={`${orbitron.variable} ${spaceMono.variable} font-mono antialiased min-h-screen bg-background text-foreground relative overflow-x-hidden`}>
        <div className="scanlines"></div>
        <div className="relative z-20">
          {children}
        </div>
      </body>
    </html>
  )
}
