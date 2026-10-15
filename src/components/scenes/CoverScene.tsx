import { motion } from "framer-motion";
import { useState } from "react";
import { birthday } from "@/content/birthday";
import { Art, HandArrow, Tape } from "@/components/scrapbook/Decor";

export function CoverScene({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const c = birthday.cover;

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 900);
  };

  return (
    <div className="relative flex min-h-[calc(100svh-3rem)] items-center justify-center px-4 py-16" style={{ perspective: 1600 }}>
      <motion.div
        className="relative w-full max-w-3xl origin-left"
        animate={opening ? { rotateY: -100, opacity: 0.2 } : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.6, 0, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative stationery px-6 py-16 text-center sm:px-16 sm:py-20">
          <Tape className="-top-3 left-10 -rotate-6" />
          <Tape className="-top-3 right-12 rotate-3" />
          <Art kind="corner" className="-left-10 -bottom-12 w-40 sm:w-56" />
          <Art kind="corner" className="-right-10 -top-14 w-36 rotate-180 sm:w-48" />
          <Art kind="eye" className="right-8 bottom-8 w-10 opacity-90 sm:w-14" />
          <Art kind="eye" className="left-10 top-10 w-7 opacity-80" />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-script text-5xl text-navy sm:text-7xl"
          >
            {c.line1}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 font-serif text-5xl font-semibold text-ink sm:text-7xl lg:text-8xl"
          >
            {c.line2}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 font-serif text-lg italic text-slate sm:text-xl"
          >
            {c.sub}
          </motion.p>

          <div className="relative mx-auto mt-12 inline-block">
            <HandArrow className="absolute -left-28 -top-12 hidden w-24 sm:block" />
            <button
              type="button"
              onClick={open}
              className="min-h-11 px-4 ink-link text-3xl transition-transform hover:rotate-[-2deg] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
            >
              {c.cta}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
