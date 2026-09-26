# Maz Works email setup

Everything lands in one Gmail inbox; Maz sends from Gmail.

**This is how every lead email is sent, cold or warm: from Gmail with `info@mazworks.uk` as the From address. No other sending tool is used for outreach.**

- **Receiving:** ImprovMX (free) forwards every `@mazworks.uk` address to Maz's Gmail. Root MX records point to `mx1/mx2.improvmx.com`.
- **Sending 1-to-1:** Gmail "Send mail as" `info@mazworks.uk` (Gmail SMTP), confirmed working 26 Sep 2026. Root SPF: `v=spf1 include:spf.improvmx.com include:_spf.google.com ~all`.
- **Site mail (signup alerts, newsletter):** Resend via `send.mazworks.uk`, used by `api/subscribe.js`. Opt-in mail only: Resend's policy bans cold outreach.
- **Booking calls:** `cal.com/mazworks/quick-chat` (`BOOKING_URL` in `app/site.ts`).

DNS lives at Fasthosts, not Vercel. Don't edit the `send` or `resend._domainkey` records.

## Looking professional, staying out of spam
- **Signature logo:** `https://www.mazworks.uk/email/mw-logo.png` (96px PNG of the site's MW mark, shown at 48px). PNG, not SVG: Gmail and Outlook don't render SVG.
- **DMARC:** root `_dmarc` TXT `v=DMARC1; p=none;` (monitor only, never blocks mail).
- **Per email:** plain text plus one small logo, at most two links, no tracking pixels, no attachments on a first email, personalised, under ~20 cold emails a day.
- Limit: sent through Gmail SMTP, some inboxes show "via gmail.com". Removing that needs a mailbox provider that signs DKIM for mazworks.uk (e.g. Google Workspace, paid). Not needed at this volume.
