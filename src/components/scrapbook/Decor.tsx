import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { Photo } from "@/content/birthday";
import flowerCorner from "@/assets/botanicals/navy-flower-corner.png";
import branch from "@/assets/botanicals/navy-branch.png";
import flower from "@/assets/botanicals/navy-flower-single.png";
import evilEye from "@/assets/decor/evil-eye.png";

export function Tape({ className, style }: { className?: string; style?: CSSProperties }) {
  return <span aria-hidden className={cn("washi absolute block h-6 w-20", className)} style={style} />;
}

const ART = { corner: flowerCorner, branch, flower, eye: evilEye } as const;

export function Art({ kind, className, style }: { kind: keyof typeof ART; className?: string; style?: CSSProperties }) {
  return (
    <img
      src={ART[kind]}
      alt=""
      aria-hidden
      draggable={false}
      className={cn("pointer-events-none absolute select-none", className)}
      style={style}
    />
  );
}

/** Image or a clearly-marked replaceable placeholder. */
export function PhotoFill({ photo, className }: { photo: Photo; className?: string }) {
  if (photo.src) {
    return <img src={photo.src} alt={photo.alt} className={cn("h-full w-full object-cover", className)} />;
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${photo.alt}`}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-1 bg-paper-soft text-center",
        className,
      )}
    >
      <span className="font-hand text-xl leading-none text-slate">photo goes here</span>
      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate/70">{photo.label ?? photo.alt}</span>
    </div>
  );
}

type PolaroidProps = {
  photo: Photo;
  caption?: ReactNode;
  rotate?: number;
  className?: string;
  tape?: "top" | "corners" | "none";
  aspect?: string;
};

function PolaroidFrame({ photo, caption, rotate = 0, className, tape = "top", aspect = "aspect-square" }: PolaroidProps) {
  return (
    <div className={cn("relative bg-film p-2.5 pb-3 shadow-paper sm:p-3", className)} style={{ rotate: `${rotate}deg` }}>
      {tape === "top" && <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />}
      {tape === "corners" && (
        <>
          <Tape className="-left-5 -top-1 w-14 -rotate-[38deg]" />
          <Tape className="-right-5 -top-1 w-14 rotate-[38deg]" />
        </>
      )}
      <div className={cn("overflow-hidden", aspect)}>
        <PhotoFill photo={photo} />
      </div>
      {caption && <div className="pt-2 text-center font-hand text-xl leading-tight text-ink sm:text-2xl">{caption}</div>}
    </div>
  );
}

/** Taped Polaroid. Click / tap / Enter opens an enlarged view with its memory caption. */
export function Polaroid(props: PolaroidProps) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLDivElement>(null);
  const { photo, caption, rotate = 0 } = props;
  const memory = photo.memory ?? (typeof caption === "string" ? caption : undefined) ?? photo.label ?? photo.alt;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey, true);
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <div
        ref={trigger}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Open photo: ${photo.alt}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="cursor-zoom-in rounded-sm outline-none transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
      >
        <PolaroidFrame {...props} />
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={photo.alt}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/55 p-6 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="relative w-full max-w-[min(26rem,calc(100vw-3rem))]"
                  initial={{ scale: 0.6, rotate, y: 30 }}
                  animate={{ scale: 1, rotate: rotate * 0.35, y: 0 }}
                  exit={{ scale: 0.6, rotate, y: 30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.3, 0.8, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PolaroidFrame {...props} rotate={0} caption={undefined} className="p-3 pb-4 sm:p-4" />
                  <motion.p
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                    transition={{ delay: 0.35, duration: 0.7 }}
                    className="-mt-1 bg-film px-4 pb-5 text-center font-hand text-2xl leading-snug text-ink shadow-paper sm:text-3xl"
                  >
                    {memory}
                  </motion.p>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setOpen(false)}
                    className="absolute -top-10 right-0 min-h-9 px-2 font-sans text-[11px] uppercase tracking-[0.3em] text-film hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-film"
                  >
                    close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

/** Cream paper envelope with a flap that opens. Optional insert rises out of it. */
export function Envelope({
  open,
  children,
  insert,
  className,
}: {
  open: boolean;
  children?: ReactNode;
  insert?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[8/5] w-full", className)} style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-paper-soft shadow-paper" />
      {insert && <div className="absolute inset-x-[6%] bottom-[22%] transition-[z-index] delay-500" style={{ zIndex: open ? 30 : 10 }}>{insert}</div>}
      <div className="absolute inset-0 z-20 [filter:drop-shadow(0_-1px_1px_oklch(0.4_0.03_240/0.18))]">
        <div className="stationery absolute inset-0 [clip-path:polygon(0_0,50%_56%,100%_0,100%_100%,0_100%)]" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-slate/40" aria-hidden>
          <path d="M0 100 L42 50 M100 100 L58 50" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" fill="none" />
        </svg>
      </div>
      <motion.div
        className={cn("absolute inset-x-0 top-0 h-[58%] origin-top", open ? "z-0" : "z-30")}
        initial={false}
        animate={{ rotateX: open ? 178 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="h-full w-full [filter:drop-shadow(0_2px_2px_oklch(0.4_0.03_240/0.25))]">
          <div className="stationery h-full w-full [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        </div>
      </motion.div>
      {children && <div className="absolute inset-x-0 bottom-0 z-40 flex h-[48%] flex-col items-center justify-center px-4">{children}</div>}
    </div>
  );
}

export function HandArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={cn("text-navy", className)} aria-hidden>
      <motion.path
        d="M8 10 C 40 6, 70 20, 82 46 S 96 68, 104 70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.8 }}
      />
      <motion.path
        d="M92 70 L105 71 L100 58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      />
    </svg>
  );
}

export function SceneHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("font-script text-4xl leading-tight text-navy sm:text-5xl lg:text-6xl", className)}
    >
      {children}
    </motion.h2>
  );
}

export function InkButton({ children, onClick, className }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative inline-flex min-h-11 cursor-pointer items-center justify-center px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.25em] text-navy transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy",
        className,
      )}
    >
      <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">{children}</span>
      <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-navy transition-all duration-200 group-hover:drop-shadow-xs" aria-hidden>
        <path d="M6 26 C 8 8, 60 4, 104 6 S 196 10, 194 26 S 140 46, 96 45 S 4 42, 6 26" fill="oklch(0.38 0.11 266 / 0.06)" className="transition-colors group-hover:fill-navy/15" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
