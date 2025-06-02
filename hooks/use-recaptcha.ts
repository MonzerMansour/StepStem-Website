"use client"

import { useEffect, useState } from "react"
import { getRecaptchaConfig } from "@/app/actions/get-recaptcha-config"

export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(true) // Always loaded since disabled
  const [error, setError] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(true) // Always disabled for now
  const [siteKey, setSiteKey] = useState<string | null>(null)

  useEffect(() => {
    // Fetch reCAPTCHA configuration from server
    const initializeRecaptcha = async () => {
      try {
        const config = await getRecaptchaConfig()

        if (!config.siteKey || !config.isEnabled) {
          console.log("reCAPTCHA is not configured - reCAPTCHA will be disabled")
          setIsDisabled(true)
          setIsLoaded(true)
          return
        }

        setSiteKey(config.siteKey)

        // Check if we're in an iframe (like Vercel preview)
        const isInIframe = window !== window.top
        if (isInIframe) {
          console.log("reCAPTCHA disabled in iframe context (Vercel preview)")
          setIsDisabled(true)
          setIsLoaded(true)
          return
        }

        // Check if reCAPTCHA is already loaded
        if (window.grecaptcha) {
          setIsLoaded(true)
          return
        }

        // Create error handler for reCAPTCHA
        window.recaptchaErrorCallback = () => {
          console.error("reCAPTCHA failed to load - this may be due to domain restrictions or network issues")
          setError("reCAPTCHA failed to load. This may be due to domain restrictions.")
          setIsDisabled(true)
          setIsLoaded(true)
        }

        // Load reCAPTCHA script
        const script = document.createElement("script")
        script.src = `https://www.google.com/recaptcha/api.js?render=${config.siteKey}&onload=recaptchaOnload&onerror=recaptchaErrorCallback`
        script.async = true
        script.defer = true

        // Create onload handler
        window.recaptchaOnload = () => {
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
              console.log("reCAPTCHA loaded successfully")
              setIsLoaded(true)
              setError(null)
            })
          }
        }

        // Add timeout to handle cases where reCAPTCHA doesn't load
        const timeout = setTimeout(() => {
          if (!isLoaded) {
            console.warn("reCAPTCHA loading timeout - proceeding without it")
            setIsDisabled(true)
            setIsLoaded(true)
          }
        }, 10000)

        document.head.appendChild(script)

        return () => {
          clearTimeout(timeout)
          if (script.parentNode) {
            document.head.removeChild(script)
          }
          delete window.recaptchaOnload
          delete window.recaptchaErrorCallback
        }
      } catch (err) {
        console.error("Failed to initialize reCAPTCHA:", err)
        setIsDisabled(true)
        setIsLoaded(true)
      }
    }

    // reCAPTCHA is temporarily disabled to fix deployment issues
    console.log("reCAPTCHA is temporarily disabled")
    // initializeRecaptcha() // Commented out to disable reCAPTCHA
  }, [])

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    // Always return null since reCAPTCHA is disabled
    console.log(`reCAPTCHA execution skipped for action: ${action} (temporarily disabled)`)
    return null
  }

  return { isLoaded, error, executeRecaptcha, isDisabled }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    grecaptcha: any
    recaptchaOnload: () => void
    recaptchaErrorCallback: () => void
  }
}
