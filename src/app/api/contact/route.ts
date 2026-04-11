import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, phone, company } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If RESEND_API_KEY is configured, send via Resend
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Avorria Website <noreply@avorria.com>",
          to: ["hello@avorria.com"],
          subject: `New Contact: ${name} - ${company || "No company"}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        }),
      });
    }

    // Log to console regardless (useful for development)
    console.log("[Contact Form]", { name, email, phone, company, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
