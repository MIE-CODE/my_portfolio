"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { VERSE_EASE } from "@/src/config/verseMotion";
import { useTheme } from "@/src/contexts/ThemeContext";
import { submitContact } from "@/src/services/contact.service";

type FieldName = "name" | "email" | "subject" | "message";

const FIELDS: { name: FieldName; label: string; tag: "input" | "textarea"; type?: string; placeholder: string; rows?: number }[] = [
  { name: "name", label: "PILOT_IDENTITY", tag: "input", type: "text", placeholder: "Tony Stark_" },
  { name: "email", label: "COMMS_CHANNEL", tag: "input", type: "email", placeholder: "stark@avengers.io" },
  { name: "subject", label: "MISSION_BRIEF", tag: "input", type: "text", placeholder: "Arc reactor calibration" },
  { name: "message", label: "LOG_ENTRY", tag: "textarea", placeholder: "Transmit mission parameters…", rows: 5 },
];

export const ContactForm = () => {
  const { mode } = useTheme();
  const isTech = mode === "tech";
  const panelRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeField, setActiveField] = useState<FieldName | null>(null);

  useEffect(() => {
    const root = panelRef.current;
    if (!root || !isTech) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const fields = root.querySelectorAll<HTMLElement>("[data-comms-field-inner]");
    const onFocusIn = (e: FocusEvent) => {
      const wrap = (e.target as HTMLElement).closest("[data-comms-field-inner]");
      if (!wrap) return;
      gsap.to(wrap, {
        boxShadow: "0 0 0 1px rgba(78, 232, 255, 0.45), 0 0 20px rgba(78, 232, 255, 0.12)",
        duration: 0.35,
        ease: VERSE_EASE.smooth,
      });
    };
    const onFocusOut = (e: FocusEvent) => {
      const wrap = (e.target as HTMLElement).closest("[data-comms-field-inner]");
      if (!wrap) return;
      gsap.to(wrap, {
        boxShadow: "0 0 0 1px rgba(78, 232, 255, 0.12), 0 0 0 transparent",
        duration: 0.45,
        ease: VERSE_EASE.smooth,
      });
    };

    fields.forEach((el) => {
      el.addEventListener("focusin", onFocusIn);
      el.addEventListener("focusout", onFocusOut);
    });
    return () => {
      fields.forEach((el) => {
        el.removeEventListener("focusin", onFocusIn);
        el.removeEventListener("focusout", onFocusOut);
      });
    };
  }, [isTech]);

  useEffect(() => {
    if (submitStatus !== "success" || !successRef.current) return;
    gsap.fromTo(
      successRef.current,
      { opacity: 0, y: 12, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: VERSE_EASE.snap },
    );
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitContact(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      if (
        mode === "gamify" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#9333ea", "#f59e0b", "#c084fc", "#fde68a"],
        });
      }

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const transmitLabel = isSubmitting
    ? isTech
      ? "TRANSMITTING…"
      : "Sending…"
    : submitStatus === "success"
      ? isTech
        ? "ACK_RECEIVED"
        : "Sent!"
      : isTech
        ? "TRANSMIT"
        : "Join quest";

  return (
    <form
      ref={panelRef}
      onSubmit={handleSubmit}
      data-comms-panel
      className={`comms-panel panel-surface opacity-0${isTech ? " verse-scan-border" : " gamify-form-panel"}`}
      aria-label="Contact transmission form"
    >
      {isTech && (
        <>
          <span className="comms-panel__corner comms-panel__corner--tl" aria-hidden />
          <span className="comms-panel__corner comms-panel__corner--tr" aria-hidden />
          <span className="comms-panel__corner comms-panel__corner--bl" aria-hidden />
          <span className="comms-panel__corner comms-panel__corner--br" aria-hidden />
          <span className="comms-panel__scan" aria-hidden />
        </>
      )}

      <header className="comms-panel__head">
        <div>
          <p className={`comms-panel__tag${isTech ? " font-mono" : " gamify-badge"}`}>
            {isTech ? "ARC_REACTOR: ONLINE" : "Quest log"}
          </p>
          <h2 className="comms-panel__title font-display">
            {isTech ? "Secure transmission" : "Send a message"}
          </h2>
        </div>
        {isTech && (
          <span className="comms-panel__badge font-mono" aria-live="polite">
            {activeField ? `FOCUS::${activeField.toUpperCase()}` : "STANDBY"}
          </span>
        )}
      </header>

      <div className="comms-fields">
        <div className="comms-fields__row">
          {FIELDS.slice(0, 2).map((field) => (
            <ContactField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleChange}
              onFocus={() => setActiveField(field.name)}
              onBlur={() => setActiveField((c) => (c === field.name ? null : c))}
              isTech={isTech}
            />
          ))}
        </div>

        {FIELDS.slice(2).map((field) => (
          <ContactField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
            onFocus={() => setActiveField(field.name)}
            onBlur={() => setActiveField((c) => (c === field.name ? null : c))}
            fullWidth
            isTech={isTech}
          />
        ))}
      </div>

      <div data-comms-action className="comms-actions opacity-0">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`comms-transmit touch-target${isTech ? "" : " btn-primary w-full"}`}
        >
          {isTech && <span className="comms-transmit__glow" aria-hidden />}
          <span className={`comms-transmit__label${isTech ? " font-mono" : " font-display"}`}>
            {transmitLabel}
          </span>
        </button>

        {submitStatus === "success" && (
          <div
            ref={successRef}
            className="comms-ack border-success/40 bg-success/10"
            role="status"
            aria-live="polite"
          >
            <span className="comms-ack__icon text-success" aria-hidden>
              ✓
            </span>
            <div>
              <p className="comms-ack__title text-success font-display">
                {isTech ? "TRANSMISSION_ACK" : "Quest submitted!"}
              </p>
              <p className="comms-ack__body">
                {isTech
                  ? "Packet received. Expect a response within one Earth rotation."
                  : "+50 XP — I'll reply within 24 hours."}
              </p>
            </div>
          </div>
        )}
        {submitStatus === "error" && (
          <div
            className="comms-ack border-red-400/40 bg-red-500/10"
            role="alert"
            aria-live="polite"
          >
            <p className="comms-ack__title text-red-600 dark:text-red-400 font-display">
              {isTech ? "TRANSMISSION_FAILED" : "Could not send"}
            </p>
            <p className="comms-ack__body">
              {isTech
                ? "Retry transmission or use direct uplink email."
                : "Please try again in a moment."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

function ContactField({
  field,
  value,
  onChange,
  onFocus,
  onBlur,
  fullWidth,
  isTech,
}: {
  field: (typeof FIELDS)[number];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  fullWidth?: boolean;
  isTech: boolean;
}) {
  const id = `comms-${field.name}`;
  const gamifyLabels: Record<FieldName, string> = {
    name: "Player name",
    email: "Guild mail",
    subject: "Quest title",
    message: "Quest brief",
  };
  const sharedClass =
    "comms-input w-full text-sm sm:text-base text-muted-900 dark:text-muted-100 placeholder:text-muted-400 dark:placeholder:text-muted-500";

  return (
    <div
      data-comms-field
      className={`comms-field opacity-0${fullWidth ? " comms-field--full" : ""}`}
    >
      <label
        htmlFor={id}
        className={`comms-label type-label${isTech ? " hud-label font-mono" : " font-semibold normal-case tracking-normal"}`}
      >
        {isTech ? field.label : gamifyLabels[field.name]}
      </label>
      <div data-comms-field-inner className="comms-field__inner">
        {field.tag === "textarea" ? (
          <textarea
            id={id}
            name={field.name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            rows={field.rows ?? 4}
            className={`${sharedClass} comms-input--area resize-none`}
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            id={id}
            name={field.name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            className={sharedClass}
            placeholder={field.placeholder}
          />
        )}
      </div>
    </div>
  );
}
