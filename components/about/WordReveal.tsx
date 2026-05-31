"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

export function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.35"],
  });

  return (
    <p ref={ref} className="text-xl leading-[1.7] text-secondary md:text-2xl">
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(start + 0.16, 1);
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="mr-[0.35em] inline-block">
      {word}
    </motion.span>
  );
}
