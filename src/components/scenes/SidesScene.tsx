import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { birthday } from "@/content/birthday";
import { Art, PhotoFill, SceneHeading, Tape } from "@/components/scrapbook/Decor";
import { cn } from "@/lib/utils";

// Organic desktop positions (percent of collage box) + rotation
const LAYOUT = [
  { left: "2%", top: "10%", rot: -7, w: "lg:w-[23%]" },
  { left: "22%", top: "38%", rot: 4, w: "lg:w-[21%]" },
  { left: "40%", top: "4%", rot: -2, w: "lg:w-[24%]" },
  { left: "60%", top: "40%", rot: 6, w: "lg:w-[20%]" },
  { left: "76%", top: "8%", rot: -5, w: "lg:w-[22%]" },
];

export function SidesScene() {
  const items = birthday.sides.items;
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10">
      <SceneHeading className="text-center">{birthday.sides.heading}</SceneHeading>
      <p className="mt-2 text-center font-sans text-xs uppercase tracking-[0.3em] text-slate">tap a photo</p>
      <Art kind="corner" className="-right-6 bottom-0 hidden w-44 -scale-x-100 lg:block" />

      <div className="relative mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:block lg:h-[560px]">
        {items.map((item, i) => (
          <motion.button
            key={item.caption}
            type="button"
            layoutId={`side-${i}`}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30, rotate: LAYOUT[i]!.rot * 2 }}
            animate={{ opacity: 1, y: 0, rotate: LAYOUT[i]!.rot }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.35 }}
            whileHover={{ y: -6, rotate: LAYOUT[i]!.rot / 2 }}
            className={cn(
              "relative bg-film p-2.5 pb-10 text-left shadow-paper focus-visible:outline-2 focus-visible:outline-navy lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]",
              LAYOUT[i]!.w,
              i === 4 && "col-span-2 mx-auto w-2/3 sm:col-span-1 sm:w-auto",
            )}
            style={{ "--l": LAYOUT[i]!.left, "--t": LAYOUT[i]!.top } as Record<string, string>}
            aria-label={`Open photo: ${item.caption}`}
          >
            <Tape className={cn("-top-3 left-1/2 -translate-x-1/2", i % 2 ? "rotate-6" : "-rotate-3")} />
            <div className="aspect-[4/5] overflow-hidden">
              <PhotoFill photo={item.photo} />
            </div>
            <span className="absolute bottom-2 left-0 right-0 text-center font-hand text-xl text-ink">{item.caption}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`side-${active}`}
              className="relative w-full max-w-sm bg-film p-4 pb-6 shadow-lift"
              onClick={(e) => e.stopPropagation()}
              style={{ rotate: -1.5 }}
            >
              <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
              <div className="aspect-[4/5] overflow-hidden">
                <PhotoFill photo={items[active]!.photo} />
              </div>
              <p className="mt-3 text-center font-hand text-3xl text-ink">{items[active]!.caption}</p>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-1 text-center font-serif text-lg italic text-slate"
              >
                {items[active]!.line}
              </motion.p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mx-auto mt-4 block min-h-11 px-4 font-sans text-xs uppercase tracking-[0.3em] text-navy"
              >
                put it back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
