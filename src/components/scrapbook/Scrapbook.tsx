import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import paper from "@/assets/paper/paper-blue.jpg";
import { CoverScene } from "@/components/scenes/CoverScene";
import { IntroScene } from "@/components/scenes/IntroScene";
import { SidesScene } from "@/components/scenes/SidesScene";
import { TeamScene } from "@/components/scenes/TeamScene";
import { NoteScene } from "@/components/scenes/NoteScene";
import { WishesScene } from "@/components/scenes/WishesScene";
import { PrankScene } from "@/components/scenes/PrankScene";
import { WishScene } from "@/components/scenes/WishScene";
import { FinalScene } from "@/components/scenes/FinalScene";
import { cn } from "@/lib/utils";

export const SCENE_COUNT = 9;
const LABELS = ["Cover", "Hello", "You", "Basera", "Note", "Wishes", "Gift", "Cake", "The end"];

export function Scrapbook() {
  const [scene, setScene] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((n: number) => {
    const next = Math.max(0, Math.min(SCENE_COUNT - 1, n));
    setScene((cur) => {
      setDir(next >= cur ? 1 : -1);
      return next;
    });
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (scene === 0) return;
      if (e.key === "ArrowRight") go(scene + 1);
      if (e.key === "ArrowLeft") go(scene - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene, go]);

  const render = () => {
    switch (scene) {
      case 0: return <CoverScene onOpen={() => go(1)} />;
      case 1: return <IntroScene onNext={() => go(2)} />;
      case 2: return <SidesScene />;
      case 3: return <TeamScene />;
      case 4: return <NoteScene />;
      case 5: return <WishesScene />;
      case 6: return <PrankScene onNext={() => go(7)} />;
      case 7: return <WishScene />;
      default: return <FinalScene onReplay={() => go(0)} onMemories={() => go(2)} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-svh bg-ivory p-3 sm:p-5">
        <main
          className="relative flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden bg-paper bg-cover bg-center shadow-paper sm:min-h-[calc(100svh-2.5rem)]"
          style={{ backgroundImage: `url(${paper})` }}
        >
          <div className="relative flex-1">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.section
                key={scene}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                aria-label={`Scene ${scene + 1}: ${LABELS[scene]}`}
              >
                {render()}
              </motion.section>
            </AnimatePresence>
          </div>

          {scene > 0 && (
            <nav aria-label="Scrapbook pages" className="relative z-30 flex items-center justify-between gap-2 px-3 pb-4 pt-2 sm:px-8">
              <button
                type="button"
                onClick={() => go(scene - 1)}
                className="flex min-h-11 items-center gap-1 px-2 font-sans text-xs uppercase tracking-[0.25em] text-navy hover:opacity-70"
              >
                <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back</span>
              </button>
              <ol className="flex items-center gap-1">
                {LABELS.map((l, i) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Go to ${l}`}
                      aria-current={i === scene ? "page" : undefined}
                      className="flex h-9 w-6 items-center justify-center"
                    >
                      <span className={cn("block h-2 w-2 rounded-full border border-navy transition-all", i === scene ? "w-5 bg-navy" : "bg-transparent")} />
                    </button>
                  </li>
                ))}
              </ol>
              {scene < SCENE_COUNT - 1 ? (
                <button
                  type="button"
                  onClick={() => go(scene + 1)}
                  className="flex min-h-11 items-center gap-1 px-2 font-sans text-xs uppercase tracking-[0.25em] text-navy hover:opacity-70"
                >
                  <span className="hidden sm:inline">Next</span> <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <span className="w-16" />
              )}
            </nav>
          )}
        </main>
      </div>
    </MotionConfig>
  );
}
