import type { Metadata } from "next";
import { TelemetryDeck } from "./TelemetryDeck";

export const metadata: Metadata = {
  title: "Car Telemetry Data Engineering Pipeline",
  description:
    "A 12-slide portfolio presentation for an end-to-end batch and real-time streaming data engineering pipeline.",
};

export default function Home() {
  return <TelemetryDeck />;
}
