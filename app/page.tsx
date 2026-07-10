import type { Metadata } from "next";
import { TelemetryDeck } from "./TelemetryDeck";

export const metadata: Metadata = {
  title: "Car Telemetry Data Engineering Pipeline",
  description:
    "A 16-slide conference-style presentation for an end-to-end batch and real-time streaming data engineering pipeline.",
};

export default function Home() {
  return <TelemetryDeck />;
}
