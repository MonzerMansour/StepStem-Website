"use server"

import { Resend } from "resend"

// Define the form data type
export interface ContactFormData {
  name: string
  email: string
  school: string
}

export async function sendContactEmailResend(formData: ContactFormData) {
  try {
    console.log("Starting email sending process with Resend...")

    // Check if the API key is configured
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Resend API key is not configured")
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // In testing mode, we can only send to the verified email
    const verifiedEmail = "stepstememailserver@gmail.com"

    // Store the intended recipients for the email body
    const intendedRecipients = ["monzer.mansour@gmail.com", "stepSTEM2024@gmail.com"]

    // Email content with notification about the intended recipients
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>School:</strong> ${formData.school}</p>
      <hr />
      <p><em>Note: This email would normally be sent to: ${intendedRecipients.join(", ")}</em></p>
      <p><em>To send emails to these addresses directly, please verify a domain at <a href="https://resend.com/domains">resend.com/domains</a></em></p>
    `

    console.log(`In testing mode: Sending email to ${verifiedEmail} only`)

    const { data, error } = await resend.emails.send({
      from: "StepSTEM Contact <onboarding@resend.dev>", // Using Resend's default domain
      to: [verifiedEmail], // Only sending to the verified email
      subject: `New Contact Form Submission from ${formData.name}`,
      html: emailContent,
      reply_to: formData.email,
    })

    if (error) {
      console.error("Resend API error:", error)
      throw new Error(`Resend API error: ${error.message}`)
    }

    console.log("Email sent successfully with Resend:", data?.id)

    return {
      success: true,
      message: "Email sent successfully",
      messageId: data?.id,
    }
  } catch (error) {
    console.error("Error sending email with Resend:", error)
    return {
      success: false,
      message: "Failed to send email",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
