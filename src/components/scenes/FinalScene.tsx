import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { birthday } from "@/content/birthday";
import { Art, InkButton, Polaroid, SceneHeading, Tape } from "@/components/scrapbook/Decor";

import { cn } from "@/lib/utils";

const ROT = [-8, 5, -3, 7];

export function FinalScene({ onReplay, onMemories }: { onReplay: () => void; onMemories: () => void }) {
  const f = birthday.final;
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-10 lg:grid-cols-[1fr_1.1fr]">
      <Art kind="corner" className="-left-4 -top-4 hidden w-40 -scale-y-100 lg:block" />
      <Art kind="corner" className="-bottom-4 -right-4 hidden w-40 -scale-x-100 lg:block" />

      <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-x-2 gap-y-6">
        {f.photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.2 }}
            className={i % 2 ? "mt-10" : ""}
          >
            <Polaroid photo={p} rotate={ROT[i] ?? 0} />
          </motion.div>
        ))}
      </div>

      <div className="relative text-center lg:text-left">
        <SceneHeading>{f.heading}</SceneHeading>
        {f.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.4 }}
            className="mt-5 font-serif text-xl leading-relaxed text-ink"
          >
            {l}
          </motion.p>
        ))}

        <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
          <InkButton onClick={onReplay}>Read it again</InkButton>
          <InkButton onClick={onMemories}>Back to the memories</InkButton>
        </div>

        <div className="mt-10 flex flex-col items-center lg:items-start">
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-expanded={revealed}
            className="group relative min-h-12 cursor-pointer rotate-[-1.5deg] rounded-md border border-navy/25 bg-paper-soft hover:bg-ivory px-5 py-2.5 font-hand text-2xl sm:text-3xl text-navy shadow-paper transition-all hover:scale-105 hover:shadow-lift hover:border-navy/50 active:scale-95 flex items-center gap-3 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <Tape className="-top-3 left-4 w-12 -rotate-6 z-10" />
            <span>{f.tab}</span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all",
                revealed
                  ? "bg-navy/10 text-navy"
                  : "bg-ivory text-navy shadow-xs border border-navy/20 group-hover:scale-105",
              )}
            >
              {revealed ? "close" : "tap to open"}
            </span>
          </button>
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0, rotateX: -60 }}
                animate={{ opacity: 1, height: "auto", rotateX: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6 }}
                className="origin-top overflow-visible"
              >
                <div className="relative mt-5 max-w-xs rotate-[1.5deg] stationery px-6 py-5 text-left">
                  <Tape className="-top-3 right-6 w-14 rotate-6" />
                  {f.reveal.map((r) => (
                    <p key={r} className="font-hand text-2xl leading-snug text-ink">
                      {r}
                    </p>
                  ))}
                  <p className="mt-2 text-right font-script text-3xl text-navy">{f.signature}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
