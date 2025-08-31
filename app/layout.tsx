import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import ChatFab from "@/components/chat-fab"

export const metadata: Metadata = {
  title: "ChaufX Concierge",
  description: "Premium Chauffeur Booking System Prototype",
  generator: "v0.app",
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${GeistMono.variable} dark antialiased`}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <ChatFab />
        <Analytics />
      </body>
    </html>
  )
}
