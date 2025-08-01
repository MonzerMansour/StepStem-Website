"use server"

// Define the form data type
export interface ContactFormData {
  name: string
  email: string
  school: string
  message: string
}

export async function sendContactEmailJS(formData: ContactFormData) {
  try {
    console.log("Processing email submission in server action...")

    // Check if the API keys are configured
    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PUBLIC_KEY) {
      throw new Error("EmailJS configuration is missing")
    }

    // Return the necessary information for the client to make the EmailJS call
    return {
      success: true,
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      formData,
    }
  } catch (error) {
    console.error("Error in server action:", error)
    return {
      success: false,
      message: "Failed to process email request",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
