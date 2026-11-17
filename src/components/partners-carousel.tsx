"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PartnerCard, type PartnerCardAttorney } from "@/components/partner-card";
import { Reveal } from "@/components/ui/reveal";

type Partner = PartnerCardAttorney & { id: string };

const AUTOPLAY_MS = 5000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function PlayIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M7 5.5v13a1 1 0 0 0 1.52.85l10.5-6.5a1 1 0 0 0 0-1.7L8.52 4.65A1 1 0 0 0 7 5.5Z" />
    </svg>
  );
}

export function PartnersCarousel({ partners }: { partners: Partner[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPlaying, setUserPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const canAutoplay = partners.length > 1 && !reducedMotion;
  const isPlaying = canAutoplay && userPlaying && !hovering && inView;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const goTo = (index: number) => {
    const next = (index + partners.length) % partners.length;
    setActiveIndex(next);
    scrollToIndex(next);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % partners.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPlaying, partners.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let closest = 0;
        let closestDistance = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const distance = Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (partners.length === 0) return null;

  return (
    <div ref={sectionRef} className="relative">
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {partners.map((p, i) => (
            <div
              key={p.id}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
            >
              <Reveal delay={i * 60}>
                <PartnerCard attorney={p} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {partners.length > 1 && (
        <div className="mt-6 flex items-center gap-3" role="group" aria-label="Carousel controls">
          <div className="flex flex-1 gap-1.5">
            {partners.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.name}`}
                aria-current={i === activeIndex}
                onClick={() => goTo(i)}
                className="flex-1 py-3"
              >
                <span className="block h-1 overflow-hidden rounded-full bg-border">
                  {i === activeIndex && (
                    <span
                      key={`${activeIndex}-${isPlaying}`}
                      className="block h-full rounded-full bg-purple-600"
                      style={
                        isPlaying
                          ? {
                              animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards`,
                            }
                          : { width: "100%" }
                      }
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={userPlaying ? "Pause automatic scrolling" : "Resume automatic scrolling"}
            aria-pressed={userPlaying}
            onClick={() => setUserPlaying((p) => !p)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-charcoal transition-colors hover:border-purple-600 hover:text-purple-600"
          >
            <PlayIcon playing={userPlaying} />
          </button>
        </div>
      )}
    </div>
  );
}
