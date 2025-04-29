import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import InitializeLikes from "@/components/initialize-likes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StepSTEM Educational Program",
  description: "Empowering students through STEM education and environmental awareness",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <InitializeLikes />
        <Header />
        <ScrollToTop />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
