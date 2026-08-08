const RESEND_API_URL = "https://api.resend.com/emails"

type SendEmailInput = {
  to: string
  subject: string
  html: string
}

/**
 * Sends a transactional email via the Resend REST API.
 * Falls back to a console log when AUTH_RESEND_KEY isn't set (e.g. local dev
 * without the emulator or a Resend key configured).
 */
export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const apiKey = process.env.AUTH_RESEND_KEY
  const from = process.env.AUTH_EMAIL_FROM ?? "Cambridge Locals <noreply@cambridgelocals.com>"

  if (!apiKey) {
    console.log(`[mailer] AUTH_RESEND_KEY not set — would send to ${to}: "${subject}"`)
    return
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    })
    if (!res.ok) {
      console.error(`[mailer] Failed to send email to ${to}: ${res.status} ${await res.text()}`)
    }
  } catch (err) {
    console.error(`[mailer] Error sending email to ${to}:`, err)
  }
}

type GuideStatusEmailInput = {
  to: string
  guideTitle: string
  guideUrl: string
  status: "published" | "rejected"
}

export async function sendGuideStatusEmail({ to, guideTitle, guideUrl, status }: GuideStatusEmailInput): Promise<void> {
  if (status === "published") {
    await sendEmail({
      to,
      subject: `Your guide "${guideTitle}" is live`,
      html: `<p>Good news — your guide <strong>${guideTitle}</strong> has been published on Cambridge Locals.</p><p><a href="${guideUrl}">View it live →</a></p>`,
    })
  } else {
    await sendEmail({
      to,
      subject: `Your guide "${guideTitle}" wasn't published`,
      html: `<p>Your guide <strong>${guideTitle}</strong> was reviewed and wasn't published this time. You can edit it and resubmit from your dashboard.</p>`,
    })
  }
}
