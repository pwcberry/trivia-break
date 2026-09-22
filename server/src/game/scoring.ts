import { clampFraction } from "../util/math.js";

export const GUESS_BASE = 1;
export const GUESS_TIME_BONUS = 10;

export function guesserPoints(remainingMs: number, totalMs: number): number {
  if (totalMs <= 0) {
    return GUESS_BASE;
  }
  return Math.round(GUESS_BASE + GUESS_TIME_BONUS * clampFraction(remainingMs / totalMs));
}
