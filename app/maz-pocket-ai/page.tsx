import type { Metadata } from "next";
import MazPocketAiBridge from "./MazPocketAiBridge";
import "./maz-pocket-ai.css";

export const metadata: Metadata = {
  title: "MAZ Pocket AI Bridge",
  description: "Private capability-link client for MAZ Pocket through MAZ Core.",
  robots: { index: false, follow: false, nocache: true },
};

export default function MazPocketAiPage() {
  return <MazPocketAiBridge />;
}
