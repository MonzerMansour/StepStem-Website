"use client"

import { useEffect, useState } from "react"
import { getRecaptchaConfig } from "@/app/actions/get-recaptcha-config"

export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [siteKey, setSiteKey] = useState<string | null>(null)

  useEffect(() => {
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
          console.error("reCAPTCHA failed to load")
          setError("reCAPTCHA failed to load")
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

        // Add timeout
        const timeout = setTimeout(() => {
          if (!isLoaded) {
            console.warn("reCAPTCHA loading timeout")
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

    initializeRecaptcha()
  }, [])

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (isDisabled || !siteKey) {
      console.log("reCAPTCHA execution skipped")
      return null
    }

    if (!isLoaded || !window.grecaptcha) {
      console.error("reCAPTCHA not loaded")
      return null
    }

    try {
      if (typeof window.grecaptcha.execute !== "function") {
        console.error("reCAPTCHA execute method not available")
        return null
      }

      console.log(`Executing reCAPTCHA for action: ${action}`)
      const token = await window.grecaptcha.execute(siteKey, { action })
      console.log("reCAPTCHA token generated successfully")
      return token
    } catch (err) {
      console.error("Failed to execute reCAPTCHA:", err)
      return null
    }
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
