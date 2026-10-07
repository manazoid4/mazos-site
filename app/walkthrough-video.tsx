/**
 * The 30 second demo: a missed call, the text that goes out on its own, the booking.
 * Rendered from code, no face or voice: `node scripts/render-demo-video.mjs`
 * (scene in scripts/demo-video/scene.html). Re-render when the words change.
 * Set to null to hide the video everywhere. No figcaption: the homepage word cap is 600,
 * and the poster and every frame already say "example, not a real customer".
 */
export const WALKTHROUGH_VIDEO: { src: string; poster: string; captions: string } | null = {
  src: '/video/demo.mp4',
  poster: '/video/demo-poster.webp',
  captions: '/video/demo.vtt',
};

export function WalkthroughVideo() {
  if (!WALKTHROUGH_VIDEO) return null;
  return (
    <figure className="s-video" id="demo-video">
      <video controls preload="none" playsInline poster={WALKTHROUGH_VIDEO.poster} width={1280} height={720} aria-label="30 second example, no sound: a missed call becomes a booking on its own. Not a real customer.">
        <source src={WALKTHROUGH_VIDEO.src} type="video/mp4" />
        <track kind="captions" src={WALKTHROUGH_VIDEO.captions} srcLang="en" label="English" />
      </video>
    </figure>
  );
}
