"use client";

import { useEffect, useState } from "react";

const PHRASES = ["Trusted Counsel.", "Strategic Perspective.", "Enduring Partnerships."];

const TYPE_SPEED_MS = 45;
const DELETE_SPEED_MS = 25;
const HOLD_MS = 1400;
const PAUSE_MS = 300;

export function HeroEyebrow() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const current = PHRASES[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED_MS);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), HOLD_MS);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED_MS);
      } else {
        timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % PHRASES.length);
          setPhase("typing");
        }, PAUSE_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, reducedMotion]);

  return (
    <div className="animate-hero-in flex items-center gap-4">
      <span className="h-8 w-px shrink-0 bg-gradient-to-b from-gold-400 to-transparent" aria-hidden="true" />

      <div className="flex min-h-[1.75rem] items-center">
        {reducedMotion ? (
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {PHRASES.join(" ")}
          </span>
        ) : (
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            <span aria-hidden="true">
              {text}
              <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-pulse bg-gold-400" />
            </span>
            <span className="sr-only">{PHRASES.join(" ")}</span>
          </span>
        )}
      </div>

      {!reducedMotion && (
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          {PHRASES.map((phrase, i) => (
            <span
              key={phrase}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-4 bg-gold-400" : "w-1 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
