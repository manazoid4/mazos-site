'use client';

/** Also works when the visitor has no desktop email application configured. */
export function EnquiryRecovery({ href }: { href: string }) {
  const recovery = new URL(href);
  const message = recovery.searchParams;
  return (
    <details className="enquiry-recovery">
      <summary>No email app? Copy your enquiry</summary>
      <label>
        <span>Copy this into your email or webmail</span>
        <textarea
          readOnly
          rows={7}
          value={`To: ${recovery.pathname}\nSubject: ${message.get('subject') ?? ''}\n\n${message.get('body') ?? ''}`}
          onFocus={(event) => event.currentTarget.select()}
        />
      </label>
    </details>
  );
}
