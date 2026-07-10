"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";

type Accent = "cyan" | "green" | "blue" | "amber";
type MediaFit = "contain" | "cover";

type MediaItem = {
  file: string;
  alt: string;
  fit?: MediaFit;
  tone?: Accent;
  caption?: string;
  expandable?: boolean;
};

type Slide = {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  layout:
    | "cover"
    | "overview"
    | "architecture"
    | "batch"
    | "screenshotSplit"
    | "dbt"
    | "streaming"
    | "sqlQuery"
    | "challenge"
    | "structure"
    | "results"
    | "qa";
  accent: Accent;
  bullets?: string[];
  flow?: string[];
  secondaryFlow?: string[];
  media?: MediaItem[];
};

const pic = (file: string) => `/pic/${file}`;

const batchFlow = [
  "Vehicle Simulator",
  "JSONL",
  "Apache Airflow",
  "PostgreSQL Bronze",
  "dbt Silver",
  "dbt Gold",
];

const streamingFlow = [
  "Vehicle Simulator",
  "Azure IoT Hub",
  "Azure Stream Analytics",
  "Azure SQL Database",
  "Power BI",
];

const dbtLayers = [
  {
    label: "Bronze",
    title: "Raw ingested telemetry",
    copy: "Source-aligned vehicle events loaded into PostgreSQL for traceability and replay.",
  },
  {
    label: "Silver",
    title: "Cleaned and validated telemetry",
    copy: "Standardized types, quality checks, health logic, tyre analytics, and consistent event shape.",
  },
  {
    label: "Gold",
    title: "Analytics-ready models",
    copy: "Facts, dimensions, metrics, aggregates, and Power BI-ready outputs for reporting.",
  },
];

const folderLabels = [
  { name: "airflow/", detail: "DAG orchestration and batch ingestion" },
  { name: "simulator/", detail: "Vehicle telemetry event generation" },
  { name: "dbt_project/", detail: "Bronze, Silver, and Gold models" },
  { name: "postgres/", detail: "Warehouse schema and storage" },
  { name: "azure/", detail: "Stream Analytics SQL and alert queries" },
  { name: "docker-compose.yml", detail: "Reproducible local platform" },
];

const resultItems = [
  "End-to-end batch pipeline completed",
  "End-to-end streaming pipeline completed",
  "Duplicate ingestion fixed",
  "Docker file synchronization implemented",
  "dbt Silver and Gold models completed",
  "Azure IoT Hub ingestion validated",
  "Stream Analytics job validated",
  "Azure SQL live storage implemented",
  "Individual tyre analytics implemented",
  "Power BI-ready outputs delivered",
];

const outcomeItems = [
  "Batch Processing",
  "Streaming Data Engineering",
  "Apache Airflow",
  "dbt",
  "PostgreSQL",
  "Azure IoT Hub",
  "Azure Stream Analytics",
  "Azure SQL Database",
  "Docker",
  "Data Warehousing",
  "Data Quality",
  "SQL Optimization",
];

const techStack = [
  "Python",
  "PostgreSQL",
  "Apache Airflow",
  "dbt",
  "Docker",
  "Docker Compose",
  "Azure IoT Hub",
  "Azure Stream Analytics",
  "Azure SQL Database",
  "Power BI",
  "SQL",
  "JSON",
];

const slides: Slide[] = [
  {
    id: "cover",
    kicker: "Lacoste Team",
    title: "Car Telemetry Data Engineering Pipeline",
    subtitle: "End-to-End Batch + Real-Time Streaming Architecture",
    layout: "cover",
    accent: "cyan",
    bullets: [
      "From simulated vehicle events to analytics-ready batch and live streaming data.",
      "One technical story across orchestration, modeling, cloud streaming, and BI consumption.",
    ],
    media: [
      {
        file: "Architecture.png",
        alt: "Full architecture diagram for the telemetry platform",
        fit: "contain",
        caption: "Batch and streaming architecture",
        expandable: true,
      },
    ],
  },
  {
    id: "project-overview",
    kicker: "Project Overview",
    title: "A realistic simulator feeds two production-style data paths",
    subtitle:
      "The project processes vehicle telemetry through batch warehouse modeling and real-time Azure streaming so final data is ready for Power BI.",
    layout: "overview",
    accent: "blue",
    bullets: [
      "A simulator generates realistic vehicle telemetry.",
      "Batch data moves through Bronze, Silver, and Gold layers.",
      "Streaming data is processed with Azure IoT Hub, Stream Analytics, and Azure SQL.",
      "Both paths prepare trusted analytical outputs.",
    ],
    flow: ["JSONL", "Airflow", "PostgreSQL", "dbt"],
    secondaryFlow: ["Azure IoT Hub", "Stream Analytics", "Azure SQL Database"],
  },
  {
    id: "high-level-architecture",
    kicker: "High-Level Architecture",
    title: "The full system flow, from simulator to Power BI",
    subtitle:
      "Batch processing and real-time streaming stay separate operationally, then converge around analytics-ready telemetry outputs.",
    layout: "architecture",
    accent: "cyan",
    media: [
      {
        file: "Architecture.png",
        alt: "High-level batch and streaming architecture diagram",
        fit: "contain",
        caption: "Click to expand the full architecture",
        expandable: true,
      },
    ],
  },
  {
    id: "batch-overview",
    kicker: "Batch Pipeline Overview",
    title: "Batch ETL Pipeline",
    subtitle:
      "The batch path turns simulator files into modeled warehouse tables through a controlled Bronze, Silver, and Gold workflow.",
    layout: "batch",
    accent: "green",
    flow: batchFlow,
    bullets: [
      "Simulator writes telemetry in batches.",
      "Airflow orchestrates ingestion and dependencies.",
      "PostgreSQL stores raw Bronze data.",
      "dbt cleans, validates, and transforms data.",
      "Gold models provide analytics-ready outputs.",
    ],
  },
  {
    id: "airflow-orchestration",
    kicker: "Apache Airflow Orchestration",
    title: "Airflow controls the reliable batch execution sequence",
    subtitle:
      "The DAG makes ingestion observable, repeatable, and safe by coordinating task dependencies and Bronze load control.",
    layout: "screenshotSplit",
    accent: "green",
    bullets: [
      "DAG scheduling for batch ingestion.",
      "Clear task dependencies and execution order.",
      "Bronze load control after database commit.",
      "Stream file truncation only after successful insert.",
    ],
    media: [
      {
        file: "Airflow Graph.png",
        alt: "Airflow DAG graph showing orchestration tasks",
        fit: "contain",
        caption: "Airflow DAG graph",
        expandable: true,
      },
    ],
  },
  {
    id: "dbt-layers",
    kicker: "dbt Transformation Layers",
    title: "Bronze, Silver, and Gold make telemetry analytics-ready",
    subtitle:
      "dbt separates raw ingestion from validated event modeling and business-ready metrics.",
    layout: "dbt",
    accent: "green",
    bullets: [
      "Data quality tests and validation logic.",
      "Vehicle health and fault classification.",
      "Individual tyre pressure and temperature analytics.",
      "Power BI-ready facts, dimensions, and aggregates.",
    ],
    media: [{ file: "DBT Logo.png", alt: "dbt logo", fit: "contain", tone: "green" }],
  },
  {
    id: "dockerized-development",
    kicker: "Dockerized Development",
    title: "A reproducible local platform for orchestration and warehousing",
    subtitle:
      "Docker Compose coordinates the local services, shared volumes, and file synchronization needed for the pipeline.",
    layout: "screenshotSplit",
    accent: "blue",
    bullets: [
      "Multiple containers for Airflow services and PostgreSQL.",
      "Shared volumes connect simulator output to ingestion tasks.",
      "Permission handling keeps file truncation reliable.",
      "Local setup is repeatable for demos and development.",
    ],
    media: [
      {
        file: "Docker.png",
        alt: "Docker Desktop containers for the telemetry project",
        fit: "contain",
        caption: "Dockerized local environment",
        expandable: true,
      },
    ],
  },
  {
    id: "streaming-overview",
    kicker: "Streaming Pipeline Overview",
    title: "Real-Time Azure Streaming Pipeline",
    subtitle:
      "The streaming path receives live simulator events, processes them with SQL, stores structured outputs, and prepares them for Power BI DirectQuery.",
    layout: "streaming",
    accent: "blue",
    flow: streamingFlow,
    bullets: [
      "Low-latency telemetry ingestion.",
      "SQL-based stream transformation.",
      "Live telemetry and alert-ready storage.",
      "Power BI DirectQuery readiness.",
    ],
  },
  {
    id: "azure-iot-hub",
    kicker: "Azure IoT Hub",
    title: "IoT Hub is the live ingestion entry point",
    subtitle:
      "The service receives continuous vehicle events from the simulator and confirms active streaming message flow.",
    layout: "screenshotSplit",
    accent: "blue",
    bullets: [
      "Receives live telemetry messages.",
      "Handles continuous vehicle events.",
      "Confirms device connectivity and message flow.",
      "Starts the real-time Azure pipeline.",
    ],
    media: [
      {
        file: "Azure IotHub Overview.jpeg",
        alt: "Azure IoT Hub overview showing live ingestion metrics",
        fit: "contain",
        caption: "Azure IoT Hub overview",
        expandable: true,
      },
    ],
  },
  {
    id: "stream-analytics-job",
    kicker: "Azure Stream Analytics Job",
    title: "The streaming job connects IoT input to Azure SQL output",
    subtitle:
      "Stream Analytics validates the runtime path and keeps live event transformation observable.",
    layout: "screenshotSplit",
    accent: "cyan",
    bullets: [
      "Input from Azure IoT Hub.",
      "SQL-based event processing.",
      "Output to Azure SQL Database.",
      "Live job monitoring and runtime validation.",
      "No deserialization or conversion errors.",
    ],
    media: [
      {
        file: "Azure job Diagram.jpeg",
        alt: "Azure Stream Analytics job diagram",
        fit: "contain",
        caption: "Stream Analytics job topology",
        expandable: true,
      },
    ],
  },
  {
    id: "stream-query",
    kicker: "Stream Analytics SQL Query",
    title: "SQL transforms live telemetry into alert-ready records",
    subtitle:
      "The query filters faults, classifies subsystem health, calculates severity, and prepares downstream alert records.",
    layout: "sqlQuery",
    accent: "cyan",
    bullets: [
      "Filters active faults.",
      "Classifies subsystem health.",
      "Calculates alert severity.",
      "Summarizes tyre health.",
      "Prepares analytics-ready alert records.",
    ],
    media: [
      {
        file: "Azure Query editor.jpeg",
        alt: "Azure Stream Analytics SQL query editor",
        fit: "contain",
        caption: "Stream Analytics SQL query",
        expandable: true,
      },
    ],
  },
  {
    id: "azure-sql-live-output",
    kicker: "Azure SQL Live Output",
    title: "Azure SQL Live Telemetry Storage",
    subtitle:
      "Processed streaming data lands in Azure SQL as structured low-latency records for reporting and analysis.",
    layout: "screenshotSplit",
    accent: "blue",
    bullets: [
      "Stores processed live telemetry.",
      "Persists alert-ready records.",
      "Supports Power BI consumption.",
      "Includes speed, RPM, throttle, tyre pressure, tyre temperature, fault status, and fault type.",
    ],
    media: [
      {
        file: "Azure Query.jpeg",
        alt: "Azure SQL query output for live telemetry records",
        fit: "contain",
        caption: "Azure SQL live records",
        expandable: true,
      },
    ],
  },
  {
    id: "engineering-challenges",
    kicker: "Engineering Challenges & Fixes",
    title: "Production-like failure handling made the batch pipeline stable",
    subtitle:
      "Records were inserted into PostgreSQL, but Docker volume permissions prevented JSONL truncation, so Airflow repeatedly loaded the same Bronze records.",
    layout: "challenge",
    accent: "amber",
    flow: ["Read JSONL", "Bulk Insert", "Commit", "Truncate Stream File", "Resume Simulation"],
    bullets: [
      "Duplicate ingestion and repeated Bronze loading.",
      "Docker volume permission issue.",
      "Simulator and Airflow synchronization.",
      "Azure streaming debugging and validation.",
      "Stable batch processing after truncation control.",
    ],
  },
  {
    id: "project-structure",
    kicker: "Project Structure",
    title: "A portfolio-ready repository organized by pipeline responsibility",
    subtitle:
      "Each folder maps to a clear part of the Data Engineering system: orchestration, simulation, modeling, storage, cloud streaming, and documentation.",
    layout: "structure",
    accent: "green",
    media: [
      {
        file: "Project Structure.png",
        alt: "Project folder structure screenshot",
        fit: "contain",
        caption: "Project structure",
        expandable: true,
      },
    ],
  },
  {
    id: "results-outcomes",
    kicker: "Results, Features & Learning Outcomes",
    title: "A complete Data Engineering project across batch, streaming, warehousing, and quality",
    subtitle:
      "The final project demonstrates reliable ingestion, transformation, cloud streaming, storage, and analytics preparation.",
    layout: "results",
    accent: "green",
  },
  {
    id: "questions",
    kicker: "Lacoste Team",
    title: "Questions & Answers",
    subtitle:
      "One simulator. Two pipelines. Complete batch and real-time Data Engineering.",
    layout: "qa",
    accent: "cyan",
    flow: ["Simulator", "Batch + Streaming", "Analytics-Ready Data", "Power BI"],
  },
];

const slideCount = slides.length;

function mediaIsVideo(file: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(file);
}

function toneClass(tone: Accent = "cyan") {
  return `media-${tone}`;
}

function SlideHeader({ slide, compact = false }: { slide: Slide; compact?: boolean }) {
  return (
    <header className={compact ? "slide-header compact" : "slide-header"}>
      <p className="deck-kicker">{slide.kicker}</p>
      <h1>{slide.title}</h1>
      {slide.subtitle ? <p className="slide-subtitle">{slide.subtitle}</p> : null}
    </header>
  );
}

function ScreenshotPanel({
  item,
  priority = false,
  onExpand,
}: {
  item: MediaItem;
  priority?: boolean;
  onExpand?: (item: MediaItem) => void;
}) {
  const [missing, setMissing] = useState(false);
  const mediaClass = `smart-media ${toneClass(item.tone)} fit-${item.fit ?? "contain"}`;
  const src = pic(item.file);
  const canExpand = item.expandable !== false && !mediaIsVideo(item.file);

  const media = missing ? (
    <div className={`${mediaClass} media-fallback`} role="img" aria-label={`${item.alt} missing`}>
      <span>Media unavailable</span>
      <strong>{item.file}</strong>
    </div>
  ) : mediaIsVideo(item.file) ? (
    <video
      className={mediaClass}
      src={src}
      aria-label={item.alt}
      controls
      autoPlay
      muted
      loop
      playsInline
      onError={() => setMissing(true)}
    />
  ) : (
    <img
      className={mediaClass}
      src={src}
      alt={item.alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => setMissing(true)}
    />
  );

  return (
    <figure className={canExpand ? "screenshot-panel expandable" : "screenshot-panel"}>
      {canExpand ? (
        <button
          className="screenshot-trigger"
          type="button"
          aria-label={`Expand screenshot: ${item.alt}`}
          onClick={() => onExpand?.(item)}
        >
          {media}
        </button>
      ) : (
        media
      )}
      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  );
}

function ScreenshotModal({
  item,
  onClose,
}: {
  item: MediaItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt}>
      <button className="lightbox-backdrop" type="button" aria-label="Close image preview" onClick={onClose} />
      <div className="lightbox-content">
        <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close image preview">
          Close
        </button>
        <img src={pic(item.file)} alt={item.alt} />
        {item.caption ? <p>{item.caption}</p> : null}
      </div>
    </div>
  );
}

function PipelineFlow({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <div className={compact ? "pipeline-flow compact" : "pipeline-flow"}>
      {steps.map((step, index) => (
        <div
          className="pipeline-node stagger-item"
          key={`${step}-${index}`}
          style={{ "--delay": `${index * 70}ms` } as CSSProperties}
        >
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items = [] }: { items?: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item, index) => (
        <li
          key={item}
          className="stagger-item"
          style={{ "--delay": `${index * 85}ms` } as CSSProperties}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeatureCard({
  title,
  detail,
  index,
}: {
  title: string;
  detail?: string;
  index: number;
}) {
  return (
    <article
      className="feature-card stagger-item"
      style={{ "--delay": `${index * 55}ms` } as CSSProperties}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{title}</strong>
      {detail ? <p>{detail}</p> : null}
    </article>
  );
}

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <pre className="code-block">
      {lines.map((line) => (
        <code key={line}>{line}</code>
      ))}
    </pre>
  );
}

function CoverSlide({ slide, onExpand }: { slide: Slide; onExpand: (item: MediaItem) => void }) {
  return (
    <div className="cover-layout">
      <section className="cover-copy">
        <SlideHeader slide={slide} />
        <div className="tagline">From simulated vehicle events to analytics-ready batch and live streaming data.</div>
        <BulletList items={slide.bullets} />
      </section>
      <section className="cover-visual">
        {slide.media?.[0] ? (
          <ScreenshotPanel item={slide.media[0]} priority onExpand={onExpand} />
        ) : null}
        <div className="signal-strip" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
  );
}

function OverviewSlide({ slide }: { slide: Slide }) {
  return (
    <div className="overview-layout">
      <SlideHeader slide={slide} />
      <section className="flow-comparison">
        <article>
          <span>Batch</span>
          <PipelineFlow steps={slide.flow ?? []} compact />
        </article>
        <article>
          <span>Streaming</span>
          <PipelineFlow steps={slide.secondaryFlow ?? []} compact />
        </article>
      </section>
      <section className="overview-bottom">
        <BulletList items={slide.bullets} />
        <div className="tech-ribbon">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function ArchitectureSlide({ slide, onExpand }: { slide: Slide; onExpand: (item: MediaItem) => void }) {
  return (
    <div className="architecture-layout">
      <SlideHeader slide={slide} compact />
      <section className="screenshot-hero">
        {slide.media?.[0] ? (
          <ScreenshotPanel item={slide.media[0]} priority onExpand={onExpand} />
        ) : null}
      </section>
    </div>
  );
}

function BatchSlide({ slide }: { slide: Slide }) {
  return (
    <div className="batch-layout">
      <SlideHeader slide={slide} />
      <section className="batch-flow-panel">
        <PipelineFlow steps={slide.flow ?? []} />
      </section>
      <section className="feature-grid five">
        {slide.bullets?.map((item, index) => (
          <FeatureCard key={item} title={item} index={index} />
        ))}
      </section>
    </div>
  );
}

function ScreenshotSplitSlide({
  slide,
  onExpand,
}: {
  slide: Slide;
  onExpand: (item: MediaItem) => void;
}) {
  return (
    <div className="screenshot-split-layout">
      <section className="split-media">
        {slide.media?.[0] ? (
          <ScreenshotPanel item={slide.media[0]} priority onExpand={onExpand} />
        ) : null}
      </section>
      <section className="split-copy">
        <SlideHeader slide={slide} compact />
        <BulletList items={slide.bullets} />
      </section>
    </div>
  );
}

function DbtSlide({ slide }: { slide: Slide }) {
  return (
    <div className="dbt-layout">
      <SlideHeader slide={slide} />
      <section className="layer-stack">
        {dbtLayers.map((layer, index) => (
          <article
            className="layer-card stagger-item"
            key={layer.label}
            style={{ "--delay": `${index * 110}ms` } as CSSProperties}
          >
            <span>{layer.label}</span>
            <strong>{layer.title}</strong>
            <p>{layer.copy}</p>
          </article>
        ))}
      </section>
      <aside className="dbt-support">
        {slide.media?.[0] ? <img src={pic(slide.media[0].file)} alt={slide.media[0].alt} /> : null}
        <BulletList items={slide.bullets} />
      </aside>
    </div>
  );
}

function StreamingSlide({ slide }: { slide: Slide }) {
  return (
    <div className="streaming-layout">
      <SlideHeader slide={slide} />
      <section className="streaming-flow-panel">
        <PipelineFlow steps={slide.flow ?? []} />
      </section>
      <section className="feature-grid four">
        {slide.bullets?.map((item, index) => (
          <FeatureCard key={item} title={item} index={index} />
        ))}
      </section>
    </div>
  );
}

function SqlQuerySlide({
  slide,
  onExpand,
}: {
  slide: Slide;
  onExpand: (item: MediaItem) => void;
}) {
  return (
    <div className="sql-layout">
      <section className="sql-media">
        {slide.media?.[0] ? (
          <ScreenshotPanel item={slide.media[0]} priority onExpand={onExpand} />
        ) : null}
      </section>
      <section className="sql-copy">
        <SlideHeader slide={slide} compact />
        <CodeBlock
          lines={[
            "SELECT vehicle_id, event_time,",
            "       fault_status, fault_type,",
            "       severity, tyre_health",
            "INTO azure_sql_alerts",
          ]}
        />
        <BulletList items={slide.bullets} />
      </section>
    </div>
  );
}

function ChallengeSlide({ slide }: { slide: Slide }) {
  return (
    <div className="challenge-layout">
      <SlideHeader slide={slide} compact />
      <section className="challenge-grid">
        <article className="challenge-card problem">
          <span>Problem</span>
          <strong>Repeated Bronze loading</strong>
          <p>
            PostgreSQL inserts succeeded, but the JSONL stream file stayed in place because Docker volume
            write permissions blocked truncation.
          </p>
        </article>
        <article className="challenge-card solution">
          <span>Solution</span>
          <strong>Commit before truncation</strong>
          <p>
            Airflow now truncates the stream file only after the bulk insert is committed, then the simulator
            can safely resume.
          </p>
        </article>
      </section>
      <section className="challenge-flow">
        <PipelineFlow steps={slide.flow ?? []} compact />
      </section>
      <section className="feature-grid five compact-cards">
        {slide.bullets?.map((item, index) => (
          <FeatureCard key={item} title={item} index={index} />
        ))}
      </section>
    </div>
  );
}

function StructureSlide({
  slide,
  onExpand,
}: {
  slide: Slide;
  onExpand: (item: MediaItem) => void;
}) {
  return (
    <div className="structure-layout">
      <section className="structure-media">
        {slide.media?.[0] ? (
          <ScreenshotPanel item={slide.media[0]} priority onExpand={onExpand} />
        ) : null}
      </section>
      <section className="structure-copy">
        <SlideHeader slide={slide} compact />
        <CodeBlock
          lines={[
            "project/",
            "|-- airflow/",
            "|-- simulator/",
            "|-- dbt_project/",
            "|-- postgres/",
            "|-- azure/",
            "|   |-- stream_analytics_query.sql",
            "|   `-- alerts_query.sql",
            "|-- docker-compose.yml",
            "`-- README.md",
          ]}
        />
        <div className="folder-grid">
          {folderLabels.map((folder, index) => (
            <FeatureCard key={folder.name} title={folder.name} detail={folder.detail} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ResultsSlide({ slide }: { slide: Slide }) {
  return (
    <div className="results-layout">
      <SlideHeader slide={slide} compact />
      <section className="results-columns">
        <div>
          <h2>Project Results</h2>
          <div className="badge-grid results">
            {resultItems.map((item, index) => (
              <span className="status-badge stagger-item" key={item} style={{ "--delay": `${index * 35}ms` } as CSSProperties}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2>Learning Outcomes</h2>
          <div className="badge-grid outcomes">
            {outcomeItems.map((item, index) => (
              <span className="status-badge subtle stagger-item" key={item} style={{ "--delay": `${index * 28}ms` } as CSSProperties}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function QASlide({ slide }: { slide: Slide }) {
  return (
    <div className="qa-layout">
      <section className="qa-copy">
        <p className="deck-kicker">{slide.kicker}</p>
        <h1>{slide.title}</h1>
        <p className="hero-subtitle">{slide.subtitle}</p>
      </section>
      <section className="qa-flow">
        {slide.flow ? <PipelineFlow steps={slide.flow} compact /> : null}
      </section>
      <footer className="qa-footer">
        <strong>Car Telemetry Data Engineering Pipeline</strong>
        <span>Lacoste Team</span>
      </footer>
    </div>
  );
}

function SlideContent({
  slide,
  onExpand,
}: {
  slide: Slide;
  onExpand: (item: MediaItem) => void;
}) {
  if (slide.layout === "cover") return <CoverSlide slide={slide} onExpand={onExpand} />;
  if (slide.layout === "overview") return <OverviewSlide slide={slide} />;
  if (slide.layout === "architecture") return <ArchitectureSlide slide={slide} onExpand={onExpand} />;
  if (slide.layout === "batch") return <BatchSlide slide={slide} />;
  if (slide.layout === "screenshotSplit") return <ScreenshotSplitSlide slide={slide} onExpand={onExpand} />;
  if (slide.layout === "dbt") return <DbtSlide slide={slide} />;
  if (slide.layout === "streaming") return <StreamingSlide slide={slide} />;
  if (slide.layout === "sqlQuery") return <SqlQuerySlide slide={slide} onExpand={onExpand} />;
  if (slide.layout === "challenge") return <ChallengeSlide slide={slide} />;
  if (slide.layout === "structure") return <StructureSlide slide={slide} onExpand={onExpand} />;
  if (slide.layout === "results") return <ResultsSlide slide={slide} />;
  return <QASlide slide={slide} />;
}

export function TelemetryDeck() {
  const [index, setIndex] = useState(0);
  const [expandedMedia, setExpandedMedia] = useState<MediaItem | null>(null);
  const currentSlide = slides[index];
  const progress = useMemo(() => ((index + 1) / slideCount) * 100, [index]);

  const goTo = (nextIndex: number) => {
    setIndex(Math.min(Math.max(nextIndex, 0), slideCount - 1));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (expandedMedia) {
        if (event.key === "Escape") {
          event.preventDefault();
          setExpandedMedia(null);
        }
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goTo(index + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(slideCount - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedMedia, index]);

  useEffect(() => {
    document.body.style.overflow = expandedMedia ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedMedia]);

  return (
    <main className="deck-shell">
      <div className="deck-grid" aria-hidden="true" />
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <section
        className={`slide-stage accent-${currentSlide.accent}`}
        key={currentSlide.id}
        aria-live="polite"
      >
        <SlideContent slide={currentSlide} onExpand={setExpandedMedia} />
      </section>

      <nav className="deck-controls" aria-label="Slide navigation">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          Prev
        </button>
        <div className="slide-count" aria-label={`Slide ${index + 1} of ${slideCount}`}>
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <span>/ {String(slideCount).padStart(2, "0")}</span>
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === slideCount - 1}
          aria-label="Next slide"
        >
          Next
        </button>
      </nav>

      <div className="deck-dots" aria-label="Jump to slide">
        {slides.map((slide, dotIndex) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => goTo(dotIndex)}
            className={dotIndex === index ? "active" : ""}
            aria-label={`Go to slide ${dotIndex + 1}: ${slide.kicker}`}
          />
        ))}
      </div>

      <ScreenshotModal item={expandedMedia} onClose={() => setExpandedMedia(null)} />
    </main>
  );
}
