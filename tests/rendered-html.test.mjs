import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the car telemetry presentation shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Car Telemetry Data Engineering Pipeline<\/title>/i);
  assert.match(html, /Car Telemetry Data Engineering Pipeline/);
  assert.match(html, /End-to-End Batch \+ Real-Time Streaming Architecture/);
  assert.match(html, /Lacoste Team/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps the presentation data-driven and media-aware", async () => {
  const [deck, packageJson] = await Promise.all([
    readFile(new URL("../app/TelemetryDeck.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(deck, /const slides:\s*Slide\[\]/);
  assert.match(deck, /SmartMedia/);
  assert.match(deck, /mediaIsVideo/);
  assert.match(deck, /ArrowRight/);
  assert.match(deck, /ArrowLeft/);
  assert.match(deck, /Azure IoT Hub/);
  assert.match(deck, /Duplicate ingestion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
