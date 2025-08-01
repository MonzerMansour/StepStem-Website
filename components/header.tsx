"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string }[]
  highlight?: boolean
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Handle hash navigation after page load
  useEffect(() => {
    // Check if there's a hash in the URL after navigation
    if (typeof window !== "undefined") {
      if (window.location.hash === "#contact" && isHomePage) {
        // Use setTimeout to ensure the DOM is fully loaded
        setTimeout(() => {
          const contactSection = document.getElementById("contact")
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      }
    }
  }, [isHomePage, pathname])

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Our Services", href: "/services" },
    {
      name: "Chapters",
      href: "/chapters",
      children: [
        { name: "Silicon Valley Chapter", href: "/california" },
        { name: "Ellicott City Chapter", href: "/ellicott-city" },
        { name: "Calgary Chapter", href: "/calgary" },
      ],
    },
    {
      name: "About Us",
      href: "/about",
      children: [
        { name: "Our Mission", href: "/about" },
        { name: "Environment", href: "/about/environment" },
        { name: "Reviews", href: "/reviews" },
      ],
    },
    { name: "News", href: "/news" },
    {
      name: "Get Involved",
      href: "/get-involved",
      children: [
        { name: "Start a Chapter", href: "/get-involved/start-chapter" },
        { name: "Become an Ambassador", href: "/get-involved/ambassador" },
        { name: "Partner with Us", href: "/get-involved/partner" },
      ],
    },
    { name: "Schedule a Lesson", href: "/#contact", highlight: true },
    { name: "Donate", href: "/donate" },
  ]

  // Function to handle contact navigation
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isHomePage) {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If not on home page, navigate to home page with contact hash
      window.location.href = "/#contact"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image src="/images/logo-droplet.png" alt="StepSTEM Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-black">Step</span>
                <span className="text-cyan-500">STEM</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              // Special handling for Contact link
              if (item.name === "Schedule a Lesson") {
                return (
                  <div key={item.name} className="relative group">
                    <a
                      href="/#contact"
                      className={`px-3 py-2 text-base font-medium transition-colors hover:text-cyan-500 flex items-center ${
                        item.highlight ? "bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white rounded-md" : ""
                      }`}
                      onClick={handleContactClick}
                    >
                      {item.name}
                    </a>
                  </div>
                )
              }

              // Regular links
              return (
                <div key={item.name} className="relative group">
                  {item.name === "Get Involved" ? (
                    <Link
                      href="/get-involved"
                      className={`px-3 py-2 text-base font-medium transition-colors hover:text-cyan-500 flex items-center ${
                        item.highlight ? "bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white rounded-md" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : item.children ? (
                    <button
                      className={`px-3 py-2 text-base font-medium transition-colors hover:text-cyan-500 flex items-center ${
                        item.highlight ? "bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white rounded-md" : ""
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-base font-medium transition-colors hover:text-cyan-500 flex items-center ${
                        item.highlight ? "bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white rounded-md" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.children && item.name !== "Get Involved" && (
                    <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <div className="relative h-8 w-8">
                    <Image src="/images/logo-droplet.png" alt="StepSTEM Logo" fill className="object-contain" />
                  </div>
                  <span className="text-lg font-bold">
                    <span className="text-black">Step</span>
                    <span className="text-cyan-500">STEM</span>
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => {
                  // Special handling for Contact link in mobile menu
                  if (item.name === "Schedule a Lesson") {
                    return (
                      <div key={item.name}>
                        <a
                          href="/#contact"
                          className="text-lg font-medium transition-colors hover:text-cyan-500"
                          onClick={(e) => {
                            setIsMenuOpen(false)
                            handleContactClick(e)
                          }}
                        >
                          {item.name}
                        </a>
                      </div>
                    )
                  }

                  // Regular links
                  return (
                    <div key={item.name}>
                      {item.name === "Get Involved" ? (
                        <Link
                          href="/get-involved"
                          className="text-lg font-medium transition-colors hover:text-cyan-500"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ) : item.children ? (
                        <span className="text-lg font-medium transition-colors hover:text-cyan-500">{item.name}</span>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-lg font-medium transition-colors hover:text-cyan-500"
                          onClick={() => !item.children && setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.children && item.name !== "Get Involved" && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block text-base text-gray-600 hover:text-cyan-500"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
