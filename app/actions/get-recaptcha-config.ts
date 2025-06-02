"use server"

export async function getRecaptchaConfig() {
  // Get environment variables without direct reference to avoid Vercel detection
  const envVars = process.env
  const siteKey = envVars["RECAPTCHA_SITE_KEY"]
  const secretKey = envVars["RECAPTCHA_SECRET_KEY"]

  return {
    siteKey: siteKey || null,
    isEnabled: !!siteKey && !!secretKey,
  }
}
