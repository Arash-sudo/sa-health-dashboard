export function getBarNumber(value, range, maxBars) {
  if (value <= 0) return 0;
  return Math.min(Math.floor((value / range) * maxBars) + 1, maxBars);
}
