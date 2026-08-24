import type { Metadata } from "next";
import MazCoreConsole from "./MazCoreConsole";
import "./maz-core.css";

export const metadata: Metadata = {
  title: "MAZ Core Console",
  description: "Private client-side console for a user-supplied MAZ Core endpoint.",
  robots: { index: false, follow: false, nocache: true },
};

export default function MazCorePage() {
  return <MazCoreConsole />;
}
