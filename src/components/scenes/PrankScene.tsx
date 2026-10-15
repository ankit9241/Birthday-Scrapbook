import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { birthday } from "@/content/birthday";
import { Art, Envelope, InkButton, SceneHeading, Tape } from "@/components/scrapbook/Decor";

/** Spots the gift label hops to, as fractions of the free space around the envelope. */
const SPOTS = [
  { x: 0.7, y: -0.3 },
  { x: -0.75, y: 0.25 },
  { x: 0.45, y: 0.5 },
  { x: -0.65, y: -0.35 },
  { x: 0.75, y: 0.2 },
  { x: 0, y: 0 },
];

export function PrankScene({ onNext }: { onNext: () => void }) {
  const p = birthday.prank;
  const arena = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const canDodge = dodges < p.dodges;

  const dodge = () => {
    if (!canDodge || !arena.current || !btn.current) return false;
    const a = arena.current.getBoundingClientRect();
    const b = btn.current.getBoundingClientRect();
    const maxX = Math.max(0, a.width / 2 - b.width / 2 - 12);
    const maxY = Math.max(0, a.height / 2 - b.height / 2 - 12);
    const s = SPOTS[dodges % SPOTS.length]!;
    setPos({ x: s.x * maxX, y: s.y * maxY });
    setDodges((d) => d + 1);
    return true;
  };

  const onClick = (e: MouseEvent) => {
    // Keyboard activation (detail === 0) opens directly for accessibility.
    if (e.detail === 0) {
      setOpen(true);
      return;
    }
    // If fewer than 6 dodges have occurred (such as mobile taps), dodge!
    if (dodges < p.dodges) {
      dodge();
      return;
    }
    // Exactly 6 dodges completed, open the envelope!
    setOpen(true);
  };

  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-center overflow-x-clip px-4 py-10 text-center">
      <Art kind="corner" className="-left-6 -top-4 hidden w-36 rotate-90 md:block" />
      <Art kind="branch" className="-right-2 bottom-10 hidden w-32 -scale-x-100 md:block" />
      <SceneHeading>{p.heading}</SceneHeading>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-3 font-serif text-xl italic text-ink">
        {p.body}
      </motion.p>

      <motion.div
        layout
        className={open ? "mt-80 w-full max-w-md sm:mt-64" : "mt-10 w-full max-w-md"}
        transition={{ duration: 0.6 }}
      >
        <div ref={arena} className="relative" style={{ rotate: "-1deg" }}>
          {!open && <Tape className="-top-3 left-8 z-40 -rotate-6" />}
          <Envelope
            open={open}
            insert={
              open && (
                <motion.div
                  initial={{ y: 140, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.8, ease: [0.3, 0.8, 0.3, 1] }}
                  className="stationery px-5 pb-6 pt-6 sm:px-8"
                  role="status"
                >
                  <p className="font-script text-3xl text-navy">{p.message[0]}</p>
                  {p.message.slice(1).map((m, i) => (
                    <p key={m} className={i === 2 ? "mt-2 font-hand text-2xl text-navy" : "mt-2 font-serif text-base leading-snug text-ink sm:text-lg"}>
                      {m}
                    </p>
                  ))}
                  <p className="mt-2 font-hand text-xl text-slate">{p.signature}</p>
                </motion.div>
              )
            }
          />
          {!open && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex h-[48%] items-center justify-center">
              <motion.button
                ref={btn}
                type="button"
                onClick={onClick}
                onPointerEnter={(e) => e.pointerType === "mouse" && dodge()}
                animate={{ x: pos.x, y: pos.y, rotate: dodges % 2 ? 4 : -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="pointer-events-auto min-h-11 cursor-pointer bg-film px-5 py-2 font-hand text-2xl text-navy shadow-paper outline-none [clip-path:polygon(4%_0,100%_6%,97%_100%,0_92%)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                aria-describedby="prank-hint"
              >
                {p.cta}
              </motion.button>
            </div>
          )}
        </div>
        <span id="prank-hint" className="sr-only">
          Press Enter to accept your gift.
        </span>
      </motion.div>

      <div className="mt-10 min-h-12">
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
              <InkButton onClick={onNext} className="text-[10px]">
                {p.next}
              </InkButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
