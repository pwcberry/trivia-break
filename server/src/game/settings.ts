import type { RoomSettings } from "../protocol.js";
import { clampInt } from "../util/math.js";

export const DEFAULT_SETTINGS: RoomSettings = {
  name: "Trivia Break",
  questions: 10,
  answerTimeSec: 15,
  maxPlayers: 4,
  choicesPerAnswer: 4,
};

const LIMITS = {
  questions: { min: 6, max: 30 },
  answerTimeSec: { min: 5, max: 20 },
  maxPlayers: { min: 2, max: 10 },
  choicesPerAnswer: { min: 2, max: 5 },
};



/**
 * Normalise partial/untrusted settings into a valid RoomSettings, clamping each
 * field to its allowed range and filling gaps with defaults.
 */
export function normalizeSettings(input: Partial<RoomSettings> | undefined): RoomSettings {
  return {
    name: input?.name ?? DEFAULT_SETTINGS.name,
    questions: clampInt(input?.questions, DEFAULT_SETTINGS.questions, LIMITS.questions.min, LIMITS.questions.max),
    answerTimeSec: clampInt(input?.answerTimeSec, DEFAULT_SETTINGS.answerTimeSec, LIMITS.answerTimeSec.min, LIMITS.answerTimeSec.max),
    maxPlayers: clampInt(input?.maxPlayers, DEFAULT_SETTINGS.maxPlayers, LIMITS.maxPlayers.min, LIMITS.maxPlayers.max),
    choicesPerAnswer: clampInt(input?.choicesPerAnswer, DEFAULT_SETTINGS.choicesPerAnswer, LIMITS.choicesPerAnswer.min, LIMITS.choicesPerAnswer.max),
  };
}
