"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";

type MediaFit = "contain" | "cover";

type MediaItem = {
  file: string;
  alt: string;
  fit?: MediaFit;
  tone?: "cyan" | "green" | "blue" | "amber";
};

type Stat = {
  label: string;
  value: string;
  detail?: string;
};

type Slide = {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  layout:
    | "hero"
    | "overview"
    | "problem"
    | "architecture"
    | "tech"
    | "pipeline"
    | "telemetry"
    | "layers"
    | "fix"
    | "milestones"
    | "qa";
  bullets?: string[];
  media?: MediaItem[];
  flow?: string[];
  stats?: Stat[];
  accent?: "cyan" | "green" | "blue" | "amber";
};

const pic = (file: string) => `/pic/${file}`;

const batchFlow = [
  "Vehicle Simulator",
  "JSONL File",
  "Airflow",
  "PostgreSQL Bronze",
  "dbt Silver",
  "dbt Gold",
];

const streamingFlow = [
  "Vehicle Simulator",
  "Azure IoT Hub",
  "Stream Analytics",
  "Azure SQL Database",
  "Power BI",
];

const telemetryFields = [
  "Speed",
  "RPM",
  "Throttle",
  "Engine Temp",
  "Oil Temp",
  "Oil Pressure",
  "Battery Voltage",
  "Fuel Level",
  "Brake Pressure",
  "Gear",
  "Drive State",
  "Tyre Pressure FL",
  "Tyre Pressure FR",
  "Tyre Pressure RL",
  "Tyre Pressure RR",
  "Tyre Temp FL",
  "Tyre Temp FR",
  "Tyre Temp RL",
  "Tyre Temp RR",
  "Fault Status",
  "Fault Type",
];

const techStack = [
  { name: "Python", type: "runtime" },
  { name: "PostgreSQL", type: "warehouse" },
  { name: "Apache Airflow", type: "orchestration", media: "Airflow logo.png" },
  { name: "dbt", type: "modeling", media: "DBT Logo.png" },
  { name: "Docker", type: "containers", media: "Docker Logo.png" },
  { name: "Docker Compose", type: "local platform" },
  { name: "Azure IoT Hub", type: "stream ingress", media: "Azure Logo.jfif" },
  { name: "Azure Stream Analytics", type: "stream SQL" },
  { name: "Azure SQL Database", type: "serving store" },
  { name: "SQL", type: "queries" },
  { name: "JSON", type: "event format" },
  { name: "Power BI", type: "analytics" },
];

const slides: Slide[] = [
  {
    id: "title",
    kicker: "Lacoste Team Portfolio Demo",
    title: "Car Telemetry Data Engineering Pipeline",
    subtitle: "End-to-End Batch + Real-Time Streaming Architecture",
    layout: "hero",
    accent: "cyan",
    bullets: [
      "Production-style telemetry pipelines for analytics-ready vehicle intelligence.",
      "Designed to demonstrate orchestration, modeling, streaming, and cloud integration.",
    ],
    media: [
      {
        file: "Architecture.png",
        alt: "High-level architecture diagram for the car telemetry data pipeline",
        fit: "contain",
      },
    ],
  },
  {
    id: "overview",
    kicker: "Project Overview",
    title: "One simulator, two complete data paths",
    subtitle:
      "The system turns realistic vehicle telemetry into trusted analytics data through both scheduled batch processing and live Azure streaming.",
    layout: "overview",
    accent: "blue",
    bullets: [
      "Vehicle simulator generates continuous telemetry events.",
      "Batch: JSONL to Airflow to PostgreSQL to dbt.",
      "Streaming: Azure IoT Hub to Stream Analytics to Azure SQL.",
      "Final target: Power BI-ready data products.",
    ],
    stats: [
      { value: "2", label: "Pipelines", detail: "batch and real time" },
      { value: "21", label: "Telemetry Fields", detail: "vehicle health and behavior" },
      { value: "3", label: "Data Layers", detail: "bronze, silver, gold" },
    ],
  },
  {
    id: "problem",
    kicker: "Business / Engineering Problem",
    title: "Raw telemetry is noisy, continuous, and hard to trust",
    subtitle:
      "A production-like pipeline needs reliable ingestion, transformation, quality checks, and monitoring paths that can keep up with live vehicle events.",
    layout: "problem",
    accent: "amber",
    bullets: [
      "Raw signals arrive continuously and can contain operational noise.",
      "Data teams need repeatable ingestion and validation before analysis.",
      "Live monitoring requires low-latency transformation and serving storage.",
      "The goal is a realistic Data Engineering pipeline, not a one-off script.",
    ],
  },
  {
    id: "architecture",
    kicker: "High-Level Architecture",
    title: "Batch and streaming converge into analytics-ready outputs",
    subtitle:
      "The architecture separates scheduled historical processing from live event processing, while preserving a shared analytics goal.",
    layout: "architecture",
    accent: "cyan",
    media: [
      {
        file: "Architecture.png",
        alt: "Batch and streaming architecture flow",
        fit: "contain",
      },
    ],
  },
  {
    id: "technologies",
    kicker: "Technologies Used",
    title: "A modern engineering stack across orchestration, modeling, containers, cloud, and BI",
    layout: "tech",
    accent: "green",
    media: [
      { file: "Project Structure.png", alt: "Project folder structure screenshot", fit: "contain" },
    ],
  },
  {
    id: "batch",
    kicker: "Batch ETL Pipeline",
    title: "Airflow orchestrates raw JSONL ingestion into modeled warehouse layers",
    subtitle:
      "PostgreSQL stores raw Bronze data, while dbt builds cleaned Silver models and Gold analytics tables.",
    layout: "pipeline",
    accent: "green",
    flow: batchFlow,
    bullets: [
      "Airflow schedules and monitors ingestion tasks.",
      "PostgreSQL keeps raw telemetry in a Bronze table.",
      "dbt applies cleaning, validation, and business transformations.",
    ],
    media: [
      { file: "Airflow Graph.png", alt: "Airflow DAG graph screenshot", fit: "contain" },
      { file: "DBT Logo.png", alt: "dbt logo", fit: "contain", tone: "green" },
    ],
  },
  {
    id: "streaming",
    kicker: "Real-Time Azure Streaming Pipeline",
    title: "Live events move from IoT Hub through Stream Analytics into Azure SQL",
    subtitle:
      "The streaming path supports live telemetry monitoring, SQL-based event shaping, and alert-ready storage.",
    layout: "pipeline",
    accent: "blue",
    flow: streamingFlow,
    bullets: [
      "IoT Hub receives live simulator messages.",
      "Stream Analytics transforms events with SQL.",
      "Azure SQL stores live telemetry and alert outputs.",
    ],
    media: [
      { file: "Azure IotHub Overview.jpeg", alt: "Azure IoT Hub overview screenshot", fit: "cover" },
      { file: "Azure job Diagram.jpeg", alt: "Azure Stream Analytics job diagram", fit: "cover" },
      { file: "Azure Query editor.jpeg", alt: "Azure Stream Analytics query editor", fit: "cover" },
    ],
  },
  {
    id: "telemetry",
    kicker: "Telemetry Data",
    title: "Rich vehicle signals for behavior, health, tyre, and fault analytics",
    subtitle:
      "The simulator produces a broad event shape that can power dashboards, anomaly checks, and diagnostic reporting.",
    layout: "telemetry",
    accent: "cyan",
  },
  {
    id: "modeling",
    kicker: "Data Modeling & Analytics Layers",
    title: "Bronze, Silver, and Gold layers make telemetry usable for analysis",
    subtitle:
      "The data model separates raw ingestion from cleaned telemetry and curated analytics outputs.",
    layout: "layers",
    accent: "green",
    bullets: [
      "Individual tyre pressure and temperature analytics.",
      "Vehicle health classification and fault grouping.",
      "Reusable vehicle metrics, aggregates, and Power BI-ready tables.",
    ],
  },
  {
    id: "duplicate-fix",
    kicker: "Key Engineering Fix",
    title: "Duplicate ingestion was solved by synchronizing file truncation with database commits",
    subtitle:
      "A Docker volume permission issue prevented JSONL truncation, causing Airflow to reload records that were already inserted into PostgreSQL.",
    layout: "fix",
    accent: "amber",
    flow: [
      "Read JSONL",
      "Bulk Insert",
      "Commit",
      "Truncate Stream File",
      "Resume Simulation",
    ],
    bullets: [
      "Prevents duplicate PostgreSQL inserts.",
      "Stops unbounded stream-file growth.",
      "Keeps the simulator and Airflow ingestion cycle aligned.",
    ],
    media: [{ file: "Docker.png", alt: "Docker environment screenshot", fit: "cover" }],
  },
  {
    id: "milestones",
    kicker: "Current Status & Milestones",
    title: "Core engineering is complete, dashboard and portfolio polish are in progress",
    layout: "milestones",
    accent: "green",
  },
  {
    id: "qa",
    kicker: "Learning Outcomes / Q&A",
    title: "Learning Outcomes",
    subtitle: "Batch processing, streaming engineering, orchestration, transformation, warehousing, and cloud analytics in one portfolio project.",
    layout: "qa",
    accent: "cyan",
    bullets: [
      "Batch Processing",
      "Streaming Data Engineering",
      "Airflow Orchestration",
      "dbt Transformations",
      "PostgreSQL Warehousing",
      "Azure IoT Hub",
      "Azure Stream Analytics",
      "Azure SQL Database",
      "Dockerized Development",
      "Data Quality & Monitoring",
    ],
  },
];

const milestones = [
  { label: "Vehicle Telemetry Simulator", status: "Complete" },
  { label: "Batch ETL Pipeline", status: "Complete" },
  { label: "Real-Time Streaming Pipeline", status: "Complete" },
  { label: "Power BI Dashboard", status: "In Progress" },
  { label: "Documentation & Portfolio", status: "In Progress" },
];

const planned = [
  "Final Power BI dashboards",
  "Deployment documentation",
  "Alert improvements",
  "Affected tyre detection",
  "Human-readable failure reasons",
];

const layerCards = [
  {
    label: "Bronze",
    title: "Raw ingested telemetry",
    copy: "Append-friendly records preserve source events for replay, auditing, and debugging.",
  },
  {
    label: "Silver",
    title: "Cleaned and validated telemetry",
    copy: "Typed fields, normalized values, quality rules, and health-ready event shapes.",
  },
  {
    label: "Gold",
    title: "Analytics-ready outputs",
    copy: "Facts, dimensions, aggregates, tyre insights, and Power BI-ready tables.",
  },
];

function toneClass(tone: MediaItem["tone"] = "cyan") {
  return {
    cyan: "media-cyan",
    green: "media-green",
    blue: "media-blue",
    amber: "media-amber",
  }[tone];
}

function mediaIsVideo(file: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(file);
}

function SmartMedia({ item, priority = false }: { item: MediaItem; priority?: boolean }) {
  const [missing, setMissing] = useState(false);
  const mediaClass = `smart-media ${toneClass(item.tone)} fit-${item.fit ?? "contain"}`;
  const src = pic(item.file);

  if (missing) {
    return (
      <div className={`${mediaClass} media-fallback`} role="img" aria-label={`${item.alt} missing`}>
        <span>Media unavailable</span>
        <strong>{item.file}</strong>
      </div>
    );
  }

  if (mediaIsVideo(item.file)) {
    return (
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
    );
  }

  return (
    <img
      className={mediaClass}
      src={src}
      alt={item.alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => setMissing(true)}
    />
  );
}

function FlowRail({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <div className={compact ? "flow-rail compact" : "flow-rail"}>
      {steps.map((step, index) => (
        <div className="flow-node" key={`${step}-${index}`}>
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
          style={{ "--delay": `${index * 90}ms` } as CSSProperties}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function HeroSlide({ slide }: { slide: Slide }) {
  return (
    <div className="hero-layout">
      <section className="hero-copy">
        <p className="deck-kicker">{slide.kicker}</p>
        <h1>{slide.title}</h1>
        <p className="hero-subtitle">{slide.subtitle}</p>
        <div className="tagline">End-to-end telemetry engineering for analytics-ready fleet intelligence.</div>
        <BulletList items={slide.bullets} />
      </section>
      <section className="hero-visual">
        {slide.media?.[0] ? <SmartMedia item={slide.media[0]} priority /> : null}
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
    <div className="split-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
        <BulletList items={slide.bullets} />
      </section>
      <section className="stat-grid">
        {slide.stats?.map((stat, index) => (
          <article
            className="stat-card stagger-item"
            key={stat.label}
            style={{ "--delay": `${index * 110}ms` } as CSSProperties}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <small>{stat.detail}</small>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProblemSlide({ slide }: { slide: Slide }) {
  return (
    <div className="problem-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
      </section>
      <section className="problem-grid">
        {slide.bullets?.map((item, index) => (
          <article
            className="problem-card stagger-item"
            key={item}
            style={{ "--delay": `${index * 100}ms` } as CSSProperties}
          >
            <span>0{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function ArchitectureSlide({ slide }: { slide: Slide }) {
  return (
    <div className="architecture-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
      </section>
      <div className="architecture-visual">
        {slide.media?.[0] ? <SmartMedia item={slide.media[0]} priority /> : null}
      </div>
      <div className="dual-flow">
        <div>
          <span>Batch path</span>
          <FlowRail steps={batchFlow.slice(0, 5)} compact />
        </div>
        <div>
          <span>Streaming path</span>
          <FlowRail steps={streamingFlow} compact />
        </div>
      </div>
    </div>
  );
}

function TechSlide({ slide }: { slide: Slide }) {
  return (
    <div className="tech-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
      </section>
      <section className="tech-grid">
        {techStack.map((tech, index) => (
          <article
            className="tech-card stagger-item"
            key={tech.name}
            style={{ "--delay": `${index * 45}ms` } as CSSProperties}
          >
            {tech.media ? (
              <img src={pic(tech.media)} alt="" onError={(event) => event.currentTarget.remove()} />
            ) : (
              <span>{tech.name.slice(0, 3).toUpperCase()}</span>
            )}
            <strong>{tech.name}</strong>
            <small>{tech.type}</small>
          </article>
        ))}
      </section>
      <aside className="structure-shot">
        {slide.media?.[0] ? <SmartMedia item={slide.media[0]} /> : null}
      </aside>
    </div>
  );
}

function PipelineSlide({ slide }: { slide: Slide }) {
  const isStreaming = slide.id === "streaming";

  return (
    <div className={isStreaming ? "pipeline-layout streaming" : "pipeline-layout"}>
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
        {slide.flow ? <FlowRail steps={slide.flow} /> : null}
      </section>
      <section className="pipeline-support">
        <BulletList items={slide.bullets} />
        <div className="media-grid">
          {slide.media?.map((item, index) => (
            <SmartMedia key={item.file} item={item} priority={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TelemetrySlide({ slide }: { slide: Slide }) {
  return (
    <div className="telemetry-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
      </section>
      <section className="telemetry-grid">
        {telemetryFields.map((field, index) => (
          <article
            className="metric-card stagger-item"
            key={field}
            style={{ "--delay": `${index * 24}ms` } as CSSProperties}
          >
            <span>{field}</span>
          </article>
        ))}
      </section>
    </div>
  );
}

function LayersSlide({ slide }: { slide: Slide }) {
  return (
    <div className="layers-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
      </section>
      <section className="layer-grid">
        {layerCards.map((layer, index) => (
          <article
            className="layer-card stagger-item"
            key={layer.label}
            style={{ "--delay": `${index * 120}ms` } as CSSProperties}
          >
            <span>{layer.label}</span>
            <strong>{layer.title}</strong>
            <p>{layer.copy}</p>
          </article>
        ))}
      </section>
      <BulletList items={slide.bullets} />
    </div>
  );
}

function FixSlide({ slide }: { slide: Slide }) {
  return (
    <div className="fix-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
        {slide.flow ? <FlowRail steps={slide.flow} compact /> : null}
        <BulletList items={slide.bullets} />
      </section>
      <section className="fix-media">
        {slide.media?.[0] ? <SmartMedia item={slide.media[0]} priority /> : null}
      </section>
    </div>
  );
}

function MilestonesSlide({ slide }: { slide: Slide }) {
  return (
    <div className="milestone-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
      </section>
      <section className="milestone-list">
        {milestones.map((milestone, index) => (
          <article
            className={milestone.status === "Complete" ? "milestone done" : "milestone active"}
            key={milestone.label}
            style={{ "--delay": `${index * 90}ms` } as CSSProperties}
          >
            <span>{index + 1}</span>
            <strong>{milestone.label}</strong>
            <small>{milestone.status}</small>
          </article>
        ))}
      </section>
      <section className="planned-list">
        {planned.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>
    </div>
  );
}

function QASlide({ slide }: { slide: Slide }) {
  return (
    <div className="qa-layout">
      <section>
        <p className="deck-kicker">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p className="slide-subtitle">{slide.subtitle}</p>
      </section>
      <section className="outcome-grid">
        {slide.bullets?.map((item, index) => (
          <article
            className="outcome-card stagger-item"
            key={item}
            style={{ "--delay": `${index * 55}ms` } as CSSProperties}
          >
            {item}
          </article>
        ))}
      </section>
      <footer className="qa-footer">
        <strong>Q&amp;A</strong>
        <span>Author: Lacoste Team</span>
      </footer>
    </div>
  );
}

function SlideContent({ slide }: { slide: Slide }) {
  if (slide.layout === "hero") return <HeroSlide slide={slide} />;
  if (slide.layout === "overview") return <OverviewSlide slide={slide} />;
  if (slide.layout === "problem") return <ProblemSlide slide={slide} />;
  if (slide.layout === "architecture") return <ArchitectureSlide slide={slide} />;
  if (slide.layout === "tech") return <TechSlide slide={slide} />;
  if (slide.layout === "pipeline") return <PipelineSlide slide={slide} />;
  if (slide.layout === "telemetry") return <TelemetrySlide slide={slide} />;
  if (slide.layout === "layers") return <LayersSlide slide={slide} />;
  if (slide.layout === "fix") return <FixSlide slide={slide} />;
  if (slide.layout === "milestones") return <MilestonesSlide slide={slide} />;
  return <QASlide slide={slide} />;
}

export function TelemetryDeck() {
  const [index, setIndex] = useState(0);
  const currentSlide = slides[index];
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  const goTo = (nextIndex: number) => {
    setIndex(Math.min(Math.max(nextIndex, 0), slides.length - 1));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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
        goTo(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index]);

  return (
    <main className="deck-shell">
      <div className="deck-grid" aria-hidden="true" />
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <section
        className={`slide-stage accent-${currentSlide.accent ?? "cyan"}`}
        key={currentSlide.id}
        aria-live="polite"
      >
        <SlideContent slide={currentSlide} />
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
        <div className="slide-count" aria-label={`Slide ${index + 1} of ${slides.length}`}>
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <span>/ {String(slides.length).padStart(2, "0")}</span>
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
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
    </main>
  );
}
