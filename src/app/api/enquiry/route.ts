import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { company, website, industry, size, services, description, budget, startDate, foundUs, name, email, phone, contactPref } = body;

    // Build plain-text email summary
    const html = `
<h2>New Project Enquiry from Avorria</h2>
<table cellpadding="8" style="border-collapse:collapse">
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Company</th><td>${company || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Website</th><td>${website || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Industry</th><td>${industry || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Company Size</th><td>${size || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Services Needed</th><td>${services?.join(", ") || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Budget</th><td>${budget || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Start Date</th><td>${startDate || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Found Us</th><td>${foundUs || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Contact Name</th><td>${name || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Email</th><td>${email || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Phone</th><td>${phone || "—"}</td></tr>
  <tr><th style="text-align:left;color:#6B6B72;font-size:11px;text-transform:uppercase">Preferred Contact</th><td>${contactPref || "—"}</td></tr>
</table>
<h3>Project Description</h3>
<p>${description || "—"}</p>
    `;

    const promises: Promise<unknown>[] = [];

    // Resend
    if (process.env.RESEND_API_KEY) {
      promises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Avorria Website <noreply@avorria.com>",
            to: process.env.NOTIFICATION_EMAIL ?? "pete@avorria.com",
            subject: `New Enquiry: ${company || name || "Unknown"} — ${services?.[0] ?? "General"}`,
            html,
          }),
        })
      );
    }

    // Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      promises.push(
        fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🚀 *New Project Enquiry*\n*Company:* ${company || "—"}\n*Services:* ${services?.join(", ") || "—"}\n*Budget:* ${budget || "—"}\n*Contact:* ${name} <${email}>\n*Phone:* ${phone || "—"}`,
          }),
        })
      );
    }

    await Promise.allSettled(promises);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
