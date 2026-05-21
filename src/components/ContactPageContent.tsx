"use client";

import Link from "next/link";
import { ContactForm } from "@/src/components/ContactForm";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useContactPageMotion } from "@/src/hooks/useContactPageMotion";

const CHANNELS = [
  {
    id: "whatsapp",
    label: "INSTANT_RELAY",
    gamifyLabel: "Quick chat",
    title: "WhatsApp",
    detail: "Fastest response",
    href: "https://wa.link/ztm32r",
    external: true,
    code: "WA::OPEN",
  },
  {
    id: "email",
    label: "MAIL_UPLINK",
    gamifyLabel: "Inbox",
    title: "Email",
    detail: "israelvictor126@gmail.com",
    href: "mailto:israelvictor126@gmail.com",
    external: false,
    code: "SMTP::READY",
  },
  {
    id: "voice",
    label: "VOICE_LINE",
    gamifyLabel: "Call",
    title: "Phone",
    detail: "+234 913 743 7424",
    href: "tel:+2349137437424",
    external: false,
    code: "PSTN::ONLINE",
  },
] as const;

const TELEMETRY = [
  { k: "SECTOR", v: "COMMS_RELAY", gk: "Region", gv: "Contact" },
  { k: "LATENCY", v: "< 24h", gk: "Reply", gv: "< 24h" },
  { k: "CHANNEL", v: "OPEN", gk: "Status", gv: "Online" },
  { k: "ENCRYPT", v: "TLS 1.3", gk: "Secure", gv: "TLS" },
] as const;

export function ContactPageContent() {
  const { mode } = useTheme();
  const isTech = mode === "tech";
  const motionRef = useContactPageMotion();

  return (
    <div ref={motionRef} className="comms-layout">
      <div
        data-comms-strip
        className={`comms-strip panel-surface opacity-0${isTech ? " verse-scan-border" : ""}`}
        aria-label="Communications status"
      >
        <span className="comms-strip__status">
          {isTech && <span className="comms-strip__pulse" aria-hidden />}
          {isTech ? "OPEN_CHANNEL" : "Inbox open"}
        </span>
        <span className={`comms-strip__meta${isTech ? " font-mono" : ""}`}>
          {isTech ? "COMMS_RELAY · PING OK" : "Contact · Ready"}
        </span>
        <span className={`comms-strip__meta hidden sm:inline${isTech ? " font-mono" : ""}`}>
          {isTech ? "JARVIS_UPLINK v2.4" : "Reply XP +50"}
        </span>
      </div>

      <div className="comms-grid">
        <aside className="comms-sidebar" aria-label="Direct contact channels">
          <p className={`comms-sidebar__label${isTech ? " font-mono" : " font-display"}`}>
            {isTech ? "DIRECT_UPLINK" : "Quick links"}
          </p>

          <ul className="comms-channels" role="list">
            {CHANNELS.map((ch, i) => (
              <li key={ch.id}>
                <Link
                  href={ch.href}
                  data-comms-channel
                  className="comms-channel game-card verse-hover-hud opacity-0"
                  {...(ch.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {isTech && (
                    <span className="comms-channel__index font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <span className="comms-channel__body">
                    <span className={`comms-channel__tag${isTech ? " font-mono" : " gamify-badge"}`}>
                      {isTech ? ch.label : ch.gamifyLabel}
                    </span>
                    <span className="comms-channel__title font-display">{ch.title}</span>
                    <span className="comms-channel__detail">{ch.detail}</span>
                  </span>
                  {isTech && (
                    <span className="comms-channel__code font-mono">{ch.code}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="comms-telemetry panel-surface" aria-hidden>
            <p className={`comms-telemetry__head${isTech ? " font-mono" : " font-display"}`}>
              {isTech ? "TELEMETRY" : "Stats"}
            </p>
            <dl className="comms-telemetry__grid">
              {TELEMETRY.map((row) => (
                <div key={row.k} data-comms-telemetry className="comms-telemetry__row opacity-0">
                  <dt className={isTech ? "font-mono" : ""}>{isTech ? row.k : row.gk}</dt>
                  <dd className={isTech ? "font-mono" : ""}>{isTech ? row.v : row.gv}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <ContactForm />
      </div>
    </div>
  );
}
