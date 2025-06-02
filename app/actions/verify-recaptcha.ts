export async function verifyRecaptcha(token: string | null): Promise<boolean> {
  // If no token provided (reCAPTCHA disabled), allow the action to proceed
  if (!token) {
    console.log("reCAPTCHA verification skipped (no token provided)")
    return true
  }

  // Rest of the function remains the same...
}
