"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { sendContactEmailJS } from "@/app/actions/send-email-emailjs"

// We'll load EmailJS from CDN
declare global {
  interface Window {
    emailjs: any
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailJSLoaded, setEmailJSLoaded] = useState(false)

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    script.async = true
    script.onload = () => {
      setEmailJSLoaded(true)
      console.log("EmailJS script loaded successfully")
    }
    script.onerror = () => {
      console.error("Failed to load EmailJS script")
      setError("Failed to load email service. Please try again later.")
    }
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (!emailJSLoaded) {
        throw new Error("Email service is not loaded yet. Please try again.")
      }

      // Call the server action to process the email
      const serverResult = await sendContactEmailJS(formData)

      if (!serverResult.success) {
        throw new Error(serverResult.error || "Failed to process email request")
      }

      // Initialize EmailJS with the public key from the server action
      window.emailjs.init(serverResult.publicKey)

      // Send the email using the client-side EmailJS
      console.log("Sending email with client-side EmailJS...")
      const result = await window.emailjs.send(serverResult.serviceId, serverResult.templateId, {
        name: formData.name,
        email: formData.email,
        school: formData.school,
        message: formData.message || `Contact form submission from ${formData.school}.`,
      })

      console.log("Email sent successfully:", result)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", school: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error("Form submission error:", err)
      setError(
        err instanceof Error
          ? `Failed to send email: ${err.message}`
          : "An unexpected error occurred. Please try again later.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Thank you!</strong>
          <span className="block sm:inline"> We've received your message and will get back to you soon.</span>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Your email"
            />
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-medium mb-1">
              Interested School
            </label>
            <input
              id="school"
              name="school"
              type="text"
              required
              value={formData.school}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="School name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Tell us about your needs or any questions you have"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "SUBMIT"}
          </Button>
        </>
      )}
    </form>
  )
}
