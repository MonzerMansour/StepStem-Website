"use server"

export async function getRecaptchaConfig() {
  // Temporarily disable reCAPTCHA to fix deployment
  return {
    siteKey: null,
    isEnabled: false,
  }
}
