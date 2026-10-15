import { motion } from "framer-motion";
import { birthday } from "@/content/birthday";
import { Art, InkButton, Polaroid } from "@/components/scrapbook/Decor";

export function IntroScene({ onNext }: { onNext: () => void }) {
  const d = birthday.intro;
  return (
    <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] max-w-5xl items-center px-4 py-12">
      <Art kind="branch" className="-left-6 top-0 hidden w-48 -rotate-12 lg:block" />
      <motion.div
        initial={{ scaleY: 0.05, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.3, 0.8, 0.3, 1] }}
        className="relative mx-auto w-full max-w-2xl origin-top rotate-[-0.6deg] stationery scallop px-7 pb-14 pt-16 sm:px-14"
      >
        <div className="absolute -right-4 -top-8 w-32 sm:-right-16 sm:w-44">
          <Polaroid photo={d.photo} rotate={6} />
        </div>
        <Art kind="flower" className="bottom-6 left-6 w-10 opacity-80" />
        <h2 className="font-script text-4xl text-navy sm:text-5xl">{d.heading}</h2>
        <div className="ruled mt-6 font-serif text-xl leading-[2.1rem] text-ink sm:text-2xl sm:leading-[2.1rem]">
          {d.lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.9, delay: 0.8 + i * 0.85, ease: "easeInOut" }}
              className={i === 2 ? "mt-[2.1rem]" : ""}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.4 }}
          className="mt-10 flex justify-end"
        >
          <InkButton onClick={onNext}>Turn the page</InkButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
