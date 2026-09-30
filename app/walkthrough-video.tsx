/**
 * Batch 3 video slot: "Maz walks through one system" (60 seconds).
 * TODO(Maz): record it (Loom or a phone is fine), export an .mp4, a poster
 * image and a .vtt caption file into public/video/, then fill in
 * WALKTHROUGH_VIDEO below. Until then nothing renders.
 */
export const WALKTHROUGH_VIDEO: { src: string; poster: string; captions: string } | null = null;

export function WalkthroughVideo() {
  if (!WALKTHROUGH_VIDEO) return null;
  return (
    <figure className="s-video">
      <video controls preload="none" playsInline poster={WALKTHROUGH_VIDEO.poster} width={1280} height={720}>
        <source src={WALKTHROUGH_VIDEO.src} type="video/mp4" />
        <track kind="captions" src={WALKTHROUGH_VIDEO.captions} srcLang="en" label="English" default />
      </video>
      <figcaption className="s-small">Manazir walks through one system, start to finish.</figcaption>
    </figure>
  );
}
