import { motion } from "framer-motion";
import { birthday } from "@/content/birthday";
import { Art, Polaroid, SceneHeading, Tape } from "@/components/scrapbook/Decor";

const NOTE_ROT = [-4, 3, -2];

export function TeamScene() {
  const t = birthday.team;
  return (
    <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-10 lg:grid-cols-[1.15fr_1fr]">
      <Art kind="eye" className="right-4 top-4 w-10" />
      <div className="relative mx-auto w-full max-w-xl lg:h-[540px]">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 0.7 }}
          className="relative lg:absolute lg:left-0 lg:top-6 lg:w-[78%]"
        >
          <Polaroid photo={t.main} aspect="aspect-[4/3]" tape="corners" caption="the Basera gang" />
        </motion.div>
        <div className="mt-8 flex justify-center gap-6 lg:mt-0 lg:block">
          {t.extras.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.25 }}
              className={
                i === 0
                  ? "w-36 lg:absolute lg:right-0 lg:top-0 lg:w-[34%]"
                  : "w-36 lg:absolute lg:bottom-0 lg:right-6 lg:w-[38%]"
              }
            >
              <Polaroid photo={p} rotate={i === 0 ? 7 : -5} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative">
        <SceneHeading>{t.heading}</SceneHeading>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 max-w-md font-serif text-xl leading-relaxed text-ink"
        >
          {t.body}
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-5">
          {t.notes.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.25 }}
              whileHover={{ rotate: 0 }}
              style={{ rotate: NOTE_ROT[i] ?? 0 }}
              className={`relative max-w-[13rem] px-4 py-3 font-hand text-2xl leading-tight text-ink shadow-paper ${i === 1 ? "bg-paper-soft" : "bg-ivory"}`}
            >
              <Tape className="-top-3 left-4 w-14 -rotate-6" />
              {n}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
