/** Static first: the final list is readable without scripts or motion. */
export function InboxStory() {
  return (
    <figure className="s-inbox-story" data-reveal aria-label="Illustration: calls, email and messages gathered into one enquiry list">
      <figcaption>One place to see who needs a reply.</figcaption>
      <div className="s-inbox-list">
        <div className="s-inbox-heading"><strong>Your enquiries</strong><span>Next step</span></div>
        {[
          ['Phone call', 'Booking question', 'Reply'],
          ['Email', 'Quote requested', 'Quote'],
          ['Direct message', 'Next available slot?', 'Reply'],
        ].map(([channel, subject, next], index) => (
          <div className="s-inbox-item" key={channel} style={{ ['--i' as string]: index }}>
            <span>{channel}</span><strong>{subject}</strong><span>{next}</span>
          </div>
        ))}
      </div>
      <p className="s-small">Illustration, not a customer inbox.</p>
    </figure>
  );
}
