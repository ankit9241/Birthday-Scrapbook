import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { birthday } from "@/content/birthday";
import { Art, InkButton, SceneHeading } from "@/components/scrapbook/Decor";

const CANDLES = [150, 200, 250, 300, 350];

function puff() {
  try {
    const ctx = new AudioContext();
    const len = ctx.sampleRate * 0.5;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) * 0.4;
    const src = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 900;
    src.buffer = buf;
    src.connect(f).connect(ctx.destination);
    src.start();
  } catch {
    /* audio optional */
  }
}

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        x: Math.random() * 100,
        d: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 0.8,
        r: Math.random() * 360,
        c: ["bg-navy", "bg-paper", "bg-ivory", "bg-tape", "bg-slate"][i % 5],
        w: 6 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className={`absolute top-0 block h-2 shadow-paper ${b.c}`}
          style={{ left: `${b.x}%`, width: b.w }}
          initial={{ y: -20, rotate: b.r, opacity: 1 }}
          animate={{ y: "105vh", rotate: b.r + 360, x: [0, 20, -15, 10], opacity: [1, 1, 0.8] }}
          transition={{ duration: b.d, delay: b.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export function WishScene() {
  const w = birthday.wish;
  const [blown, setBlown] = useState(false);
  const [sound, setSound] = useState(false);

  const blow = () => {
    if (blown) return;
    if (sound) puff();
    setBlown(true);
  };

  return (
    <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-10 text-center">
      <button
        type="button"
        onClick={() => setSound((s) => !s)}
        className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center text-slate hover:text-navy"
        aria-label={sound ? "Turn sound off" : "Turn sound on"}
      >
        {sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
      <Art kind="branch" className="left-0 top-10 hidden w-36 -rotate-12 md:block" />
      <Art kind="branch" className="right-0 top-10 hidden w-36 -scale-x-100 rotate-12 md:block" />

      <SceneHeading>{w.heading}</SceneHeading>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-3 font-serif text-xl italic text-ink">
        {w.body}
      </motion.p>

      <motion.svg
        viewBox="0 0 500 340"
        className="mt-6 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        role="img"
        aria-label={blown ? "Birthday cake with candles blown out" : "Birthday cake with five lit candles"}
      >
        {/* plate */}
        <ellipse cx="250" cy="312" rx="190" ry="18" className="fill-film stroke-navy" strokeWidth="2" />
        {/* bottom tier */}
        <path d="M90 230 h320 v70 q-160 22 -320 0z" className="fill-paper stroke-navy" strokeWidth="2" />
        <path d="M90 230 q20 20 40 0 q20 20 40 0 q20 20 40 0 q20 20 40 0 q20 20 40 0 q20 20 40 0 q20 20 40 0 q20 20 40 0" className="fill-ivory stroke-navy" strokeWidth="2" />
        {[130, 210, 290, 370].map((x) => (
          <circle key={x} cx={x} cy="272" r="6" className="fill-navy" />
        ))}
        {/* top tier */}
        <path d="M130 160 h240 v70 h-240z" className="fill-ivory stroke-navy" strokeWidth="2" />
        <path d="M130 196 h240" className="stroke-navy" strokeWidth="1.5" strokeDasharray="4 6" />
        {[160, 220, 280, 340].map((x) => (
          <path key={x} d={`M${x} 178 l6 -6 l6 6 l-6 6z`} className="fill-navy" />
        ))}
        {/* candles */}
        {CANDLES.map((x, i) => (
          <g key={x}>
            <rect x={x - 6} y={98 + (i % 2) * 6} width="12" height={62 - (i % 2) * 6} rx="2" className="fill-paper-soft stroke-navy" strokeWidth="1.5" />
            <path d={`M${x - 6} ${118} l12 -8 M${x - 6} ${136} l12 -8`} className="stroke-navy" strokeWidth="1.2" />
            <line x1={x} y1={98 + (i % 2) * 6} x2={x} y2={90 + (i % 2) * 6} className="stroke-ink" strokeWidth="1.5" />
            <AnimatePresence>
              {!blown ? (
                <motion.path
                  key="flame"
                  d={`M${x} ${62 + (i % 2) * 6} q10 14 0 26 q-10 -12 0 -26z`}
                  className="fill-tape stroke-navy"
                  strokeWidth="1"
                  animate={{ scaleY: [1, 1.08, 0.95, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                  exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.35, delay: i * 0.08 } }}
                  style={{ transformOrigin: `${x}px ${88 + (i % 2) * 6}px` }}
                />
              ) : (
                <motion.path
                  key="smoke"
                  d={`M${x} ${86 + (i % 2) * 6} q-8 -14 0 -26 q8 -12 0 -26`}
                  fill="none"
                  className="stroke-slate"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.8 }}
                  animate={{ pathLength: 1, opacity: 0, y: -14 }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.08 }}
                />
              )}
            </AnimatePresence>
          </g>
        ))}
      </motion.svg>

      <div className="mt-6 min-h-20">
        <AnimatePresence mode="wait">
          {!blown ? (
            <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.4 } }} exit={{ opacity: 0 }}>
              <InkButton onClick={blow}>{w.cta}</InkButton>
            </motion.div>
          ) : (
            <motion.p
              key="after"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-script text-3xl text-navy sm:text-4xl"
            >
              {w.after}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      {blown && <Confetti />}
    </div>
  );
}
