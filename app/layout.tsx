import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SmartIntern - AI-Powered Internship Allocation Engine",
  description:
    "Connect talented students with perfect internship opportunities using AI-powered matching. Built for SIH25033 - Smart Internship Allocation Engine.",
  generator: "v0.app",
  keywords: ["internship", "AI matching", "students", "companies", "career", "SIH25033"],
  authors: [{ name: "SmartIntern Team" }],
  openGraph: {
    title: "SmartIntern - AI-Powered Internship Allocation Engine",
    description: "Connect talented students with perfect internship opportunities using AI-powered matching.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
