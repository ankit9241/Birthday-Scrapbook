import { motion } from "framer-motion";
import { useState } from "react";
import { birthday } from "@/content/birthday";
import { Art, Polaroid, SceneHeading, Tape } from "@/components/scrapbook/Decor";
import { cn } from "@/lib/utils";

const STYLES = [
  { rot: -5, paper: "bg-ivory", shape: "", pos: "lg:left-0 lg:top-4" },
  { rot: 4, paper: "bg-paper-soft", shape: "scallop", pos: "lg:right-0 lg:top-0" },
  { rot: 3, paper: "bg-film", shape: "ruled", pos: "lg:left-6 lg:bottom-0" },
  { rot: -3, paper: "bg-ivory", shape: "", pos: "lg:right-4 lg:bottom-6" },
];

function Note({ i, title, line }: { i: number; title: string; line: string }) {
  const [flipped, setFlipped] = useState(false);
  const s = STYLES[i % STYLES.length]!;
  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + i * 0.2 }}
      className={cn(
        "group relative h-48 w-full max-w-[16.5rem] cursor-pointer lg:absolute lg:w-64 outline-none transition-transform hover:scale-[1.04] hover:z-20",
        s.pos,
      )}
      style={{ perspective: 900, rotate: s.rot }}
      aria-pressed={flipped}
      aria-label={`${title} — tap to ${flipped ? "fold" : "unfold"}`}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-between p-5 pb-4 shadow-paper [backface-visibility:hidden] border border-navy/15 rounded-sm",
            s.paper,
            s.shape,
          )}
        >
          <Tape className="-top-2 left-6 w-14 -rotate-6" />
          <span className="font-script text-3xl sm:text-4xl text-navy pt-2 text-center leading-tight">
            {title}
          </span>
          <span className="inline-flex items-center rounded-full bg-paper-soft hover:bg-ivory px-3.5 py-1 font-sans text-xs font-semibold tracking-wider text-navy border border-navy/25 group-hover:border-navy/50 group-hover:scale-105 transition-all">
            tap to unfold
          </span>
        </div>
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-between p-5 pb-4 shadow-paper [backface-visibility:hidden] [transform:rotateY(180deg)] border border-navy/15 rounded-sm",
            s.paper,
          )}
        >
          <Tape className="-top-2 right-6 w-14 rotate-6" />
          <span className="my-auto font-hand text-2xl leading-snug text-ink text-center">
            {line}
          </span>
          <span className="inline-flex items-center rounded-full bg-paper-soft/80 px-3 py-0.5 font-sans text-[10px] font-medium tracking-widest text-slate border border-slate/20">
            tap to fold back
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}

const FLAP_ROT = [-3, 2.5, -1.5, 3];

function PaperFlap({ i, label, message }: { i: number; label: string; message: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 + i * 0.15 }}
      className="group relative w-full max-w-[15rem]"
      style={{ rotate: FLAP_ROT[i % FLAP_ROT.length] ?? 0, perspective: 900 }}
    >
      <Tape className="-top-2 left-1/2 z-20 w-12 -translate-x-1/2 rotate-2" />
      <div className="stationery relative min-h-36 px-5 pb-5 pt-12 text-center border border-navy/10">
        <p className="font-hand text-2xl leading-snug text-ink" aria-hidden={!open}>
          {open ? message : ""}
        </p>
      </div>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? `Fold ${label} back` : `Unfold: ${label}`}
        className="absolute inset-x-0 top-0 z-10 flex h-full origin-top cursor-pointer flex-col items-center justify-between bg-paper-soft px-4 py-5 shadow-paper outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy border border-navy/15"
        initial={false}
        animate={{ rotateX: open ? 72 : 0, opacity: open ? 0.92 : 1, height: open ? "2.5rem" : "100%" }}
        transition={{ duration: 0.55, ease: [0.3, 0.8, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
      >
        {!open && (
          <>
            <span className="font-hand text-2xl leading-tight text-navy pt-2">{label}</span>
            <span className="mt-2.5 inline-flex items-center rounded-full bg-paper-soft hover:bg-ivory px-3.5 py-1 font-sans text-xs font-semibold tracking-wider text-navy border border-navy/25 group-hover:border-navy/50 group-hover:scale-105 transition-all">
              lift the flap
            </span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

export function WishesScene() {
  const w = birthday.wishes;
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10">
      <SceneHeading className="text-center">{w.heading}</SceneHeading>
      <div className="relative mt-10 flex flex-col items-center gap-8 lg:h-[520px] lg:block">
        <Art kind="corner" className="left-1/2 top-1/2 hidden w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-20 lg:block" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-56 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-64 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <Polaroid photo={w.photo} rotate={-2} aspect="aspect-[4/5]" />
        </motion.div>
        <div className="grid w-full justify-items-center gap-8 sm:grid-cols-2 lg:contents">
          {w.items.map((it, i) => (
            <Note key={it.title} i={i} {...it} />
          ))}
        </div>
      </div>
      <div className="mt-14 grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {w.flaps.map((f, i) => (
          <PaperFlap key={f.label} i={i} {...f} />
        ))}
      </div>
    </div>
  );
}
