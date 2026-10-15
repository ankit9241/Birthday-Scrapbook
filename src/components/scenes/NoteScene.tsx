import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { birthday } from "@/content/birthday";
import { Art, Envelope, Polaroid, SceneHeading, Tape } from "@/components/scrapbook/Decor";

export function NoteScene() {
  const n = birthday.note;
  const [showIntro, setShowIntro] = useState(true);
  const [opening, setOpening] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    if (!opening) return;
    const t = setTimeout(() => setOpen(true), 750);
    return () => clearTimeout(t);
  }, [opening]);

  return (
    <div className="relative min-h-[calc(100svh-10rem)]">
      {/* Full-page interstitial cinematic intro before Ankit's note */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.65, ease: "easeInOut" } }}
            onClick={() => setShowIntro(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory/95 p-6 backdrop-blur-md cursor-pointer select-none"
          >
            <Art kind="corner" className="-left-6 -top-6 w-44 sm:w-60 -scale-y-100" />
            <Art kind="corner" className="-right-6 -bottom-6 w-44 sm:w-60 -scale-x-100" />
            <Art kind="eye" className="left-12 bottom-12 w-10 sm:w-14 opacity-80" />
            <Art kind="eye" className="right-14 top-14 w-8 sm:w-10 opacity-70" />

            <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
              {/* Soft decorative evil eye accent */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-paper-soft border border-navy/20 shadow-xs"
              >
                <Art kind="eye" className="relative w-8 h-8 opacity-85" />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-serif text-lg sm:text-xl italic text-slate"
              >
                A personal note...
              </motion.p>

              {/* Dramatic Title */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="mt-2 font-script text-5xl sm:text-7xl text-navy leading-tight"
              >
                Now, something from Ankit...
              </motion.h2>

              {/* Animated decorative ink flourish line */}
              <svg viewBox="0 0 240 20" fill="none" className="my-4 h-5 w-56 text-navy" aria-hidden>
                <motion.path
                  d="M10 10 Q 60 2, 120 10 T 230 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 0.9, ease: "easeInOut" }}
                />
              </svg>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="font-serif text-base sm:text-lg italic text-ink/80 max-w-sm"
              >
                Penned down straight from the heart.
              </motion.p>

              {/* Continue button */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowIntro(false);
                }}
                className="mt-8 inline-flex items-center rounded-full bg-paper-soft hover:bg-ivory px-6 py-2 font-sans text-xs font-semibold tracking-widest uppercase text-navy border border-navy/25 hover:border-navy/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                read note
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Note Slide Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl px-4 py-10"
      >
        <SceneHeading className="text-center">{n.heading}</SceneHeading>
        <Art kind="branch" className="-right-4 top-24 hidden w-40 rotate-12 lg:block" />

        <div className="relative mx-auto mt-10 max-w-2xl" style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div
                key="closed"
                exit={{ opacity: 0, y: 30, transition: { delay: 0.75, duration: 0.4 } }}
                className="relative mx-auto mt-28 max-w-md"
                style={{ rotate: -1.5 }}
              >
                <button
                  type="button"
                  onClick={() => setOpening(true)}
                  disabled={opening}
                  aria-label={`${n.envelope} Open the envelope`}
                  className="group block w-full cursor-pointer transition-transform hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-navy"
                >
                  <Envelope open={opening}>
                    <p className="font-script text-3xl text-navy sm:text-4xl">{n.envelope}</p>
                    <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-slate">{n.cta}</span>
                  </Envelope>
                </button>
                <Tape className="-top-3 left-1/2 z-40 -translate-x-1/2" />
                <Art kind="flower" className="-right-4 -top-5 z-40 w-10" />
              </motion.div>
            ) : (
              <motion.article
                key="open"
                initial={{ rotateX: 80, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.3, 0.8, 0.3, 1] }}
                className="relative origin-top stationery px-7 py-12 sm:px-14 border border-navy/15 shadow-paper"
                style={{ rotate: 0.6 }}
              >
                <div className="absolute -left-6 -top-10 w-28 sm:-left-14 sm:w-36">
                  <Polaroid photo={n.photo} rotate={-8} />
                </div>
                {/* Natural bottom-left corner with zero rotation */}
                <Art kind="corner" className="-bottom-10 -left-10 w-28 opacity-90" />
                <div className="font-serif text-lg leading-relaxed text-ink sm:text-xl">
                  {n.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.5, duration: 0.5 }}
                      className={i === 0 ? "pl-20 font-script text-3xl text-navy sm:pl-24" : "mt-4"}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                <motion.p
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ delay: 0.7 + n.paragraphs.length * 0.5, duration: 1 }}
                  className="mt-6 text-right font-script text-4xl text-navy"
                >
                  {n.signature}
                </motion.p>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
