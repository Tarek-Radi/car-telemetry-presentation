# Car Telemetry Data Engineering Pipeline Presentation

A professional animated web-based slide deck for the Lacoste Team car telemetry
data engineering project. The presentation explains an end-to-end system that
combines a scheduled batch pipeline with a real-time Azure streaming pipeline.

## What is included

- 16-slide responsive conference-style presentation
- Keyboard navigation with ArrowRight, Space, ArrowLeft, Home, and End
- Clickable previous and next controls
- Progress bar, slide numbers, and slide jump dots
- Reusable slide data in `app/TelemetryDeck.tsx`
- Media support for images and videos from `public/pic`
- Click-to-expand screenshot lightbox with Escape-to-close support
- Missing-media fallback UI
- Open Graph preview image at `public/og.png`

## Project content

Batch pipeline:

```text
JSONL -> Airflow -> PostgreSQL Bronze -> dbt Silver & Gold
```

Streaming pipeline:

```text
Azure IoT Hub -> Azure Stream Analytics -> Azure SQL Database -> Power BI
```

## Media

Place presentation screenshots, logos, and videos in:

```text
public/pic
```

The deck currently uses the provided Airflow, Architecture, Azure, dbt, Docker,
and project-structure images from that folder.

## Commands

```bash
npm install
npm run dev
npm run build
npm test
```

The npm scripts use a small cross-platform wrapper in `scripts/run-vinext.mjs`
so they work in PowerShell, cmd, bash, and CI shells.

## Main files

- `app/TelemetryDeck.tsx` - slide data, rendering, navigation, and media logic
- `app/globals.css` - presentation theme, layout, responsive behavior, motion
- `app/layout.tsx` - metadata and social preview configuration
- `public/pic` - project screenshots, logos, and videos
