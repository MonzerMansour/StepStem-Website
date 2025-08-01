"use server"

import nodemailer from "nodemailer"

// Define the form data type
export interface ContactFormData {
  name: string
  email: string
  school: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    console.log("Starting email sending process...")

    // Log the environment variables (without exposing sensitive data)
    console.log("EMAIL_USER configured:", !!process.env.EMAIL_USER)
    console.log("EMAIL_PASSWORD configured:", !!process.env.EMAIL_PASSWORD)

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email credentials are not configured properly")
    }

    // Create a transporter with detailed logging
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, // Enable debug logs
      logger: true, // Log to console
    })

    // Verify the connection configuration
    try {
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)
      throw new Error(
        `SMTP verification failed: ${verifyError instanceof Error ? verifyError.message : String(verifyError)}`,
      )
    }

    // Email recipients
    const recipients = ["monzer.mansour@gmail.com", "stepSTEM2024@gmail.com"]
    console.log("Sending email to recipients:", recipients)

    // Email content
    const mailOptions = {
      from: `"StepSTEM Contact Form" <${process.env.EMAIL_USER}>`,
      to: recipients.join(", "),
      subject: `New Contact Form Submission from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        School: ${formData.school}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>School:</strong> ${formData.school}</p>
      `,
    }

    // Send email
    console.log("Attempting to send email...")
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)

    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send email",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
