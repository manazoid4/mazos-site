# Maz Works email setup

Everything lands in one Gmail inbox; Maz sends from Gmail.

**This is how every lead email is sent, cold or warm: from Gmail with `info@mazworks.uk` as the From address. No other sending tool is used for outreach.**

- **Receiving:** ImprovMX (free) forwards every `@mazworks.uk` address to Maz's Gmail. Root MX records point to `mx1/mx2.improvmx.com`.
- **Sending 1-to-1:** Gmail "Send mail as" `info@mazworks.uk` (Gmail SMTP), confirmed working 26 Sep 2026. Root SPF: `v=spf1 include:spf.improvmx.com include:_spf.google.com ~all`.
- **Site mail (signup alerts, newsletter):** Resend via `send.mazworks.uk`, used by `api/subscribe.js`. Opt-in mail only: Resend's policy bans cold outreach.
- **Booking calls:** `cal.com/mazworks/quick-chat` (`BOOKING_URL` in `app/site.ts`).

DNS lives at Fasthosts, not Vercel. Don't edit the `send` or `resend._domainkey` records.
