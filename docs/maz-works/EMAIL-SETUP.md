# Maz Works email setup

Everything lands in one Gmail inbox; Maz sends from Gmail.

- **Receiving:** ImprovMX (free) forwards every `@mazworks.uk` address to Maz's Gmail. Root MX records point to `mx1/mx2.improvmx.com`.
- **Sending 1-to-1:** Gmail "Send mail as" `info@mazworks.uk` (Gmail SMTP). Root SPF: `v=spf1 include:spf.improvmx.com include:_spf.google.com ~all`.
- **Site mail (signup alerts, newsletter):** Resend via `send.mazworks.uk`, used by `api/subscribe.js`. Opt-in mail only: Resend's policy bans cold outreach.
- **Booking calls:** `cal.com/mazworks/quick-chat` (`BOOKING_URL` in `app/site.ts`).

DNS lives at Fasthosts, not Vercel. Don't edit the `send` or `resend._domainkey` records.
