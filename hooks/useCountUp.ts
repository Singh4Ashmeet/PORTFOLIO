"use client";

import { useEffect, useMemo, useState } from "react";

type CountUpOptions = {
  duration?: number;
  start?: boolean;
};

type ParsedValue = {
  prefix: string;
  numeric: number | null;
  suffix: string;
  decimals: number;
};

function parseValue(value: string): ParsedValue {
  const match = value.match(/(-?\d+(?:\.\d+)?)/);

  if (!match || match.index === undefined) {
    return { prefix: value, numeric: null, suffix: "", decimals: 0 };
  }

  const numericText = match[0];
  const decimals = numericText.includes(".")
    ? (numericText.split(".")[1]?.length ?? 0)
    : 0;

  return {
    prefix: value.slice(0, match.index),
    numeric: Number(numericText),
    suffix: value.slice(match.index + numericText.length),
    decimals,
  };
}

function formatValue(parsed: ParsedValue, current: number) {
  if (parsed.numeric === null) {
    return parsed.prefix;
  }

  const rounded =
    parsed.decimals > 0
      ? current.toFixed(parsed.decimals)
      : String(Math.round(current));

  return `${parsed.prefix}${rounded}${parsed.suffix}`;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function useCountUp(
  value: string,
  { duration = 1.5, start = true }: CountUpOptions = {},
) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() =>
    parsed.numeric === null ? value : formatValue(parsed, 0),
  );

  useEffect(() => {
    if (parsed.numeric === null) {
      setDisplay(value);
      return;
    }

    if (!start) {
      setDisplay(formatValue(parsed, 0));
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    function tick(now: number) {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = easeOutCubic(progress);
      setDisplay(formatValue(parsed, parsed.numeric! * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [duration, parsed, start, value]);

  return display;
}
