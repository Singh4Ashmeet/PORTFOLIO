import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function extractMetricNumber(metric: string) {
  const match = metric.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjIwJyBoZWlnaHQ9JzMyMCcgdmlld0JveD0nMCAwIDIyMCAzMjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzIyMCcgaGVpZ2h0PSczMjAnIGZpbGw9JyMxMTExMTEnLz48Y2lyY2xlIGN4PScxMTAnIGN5PScxMDgnIHI9JzU2JyBmaWxsPScjMTYxNjE2Jy8+PHJlY3QgeD0nNDUnIHk9JzE4MCcgd2lkdGg9JzEzMCcgaGVpZ2h0PScxMDAnIHJ4PScyJyBmaWxsPScjMTYxNjE2Jy8+PC9zdmc+";
