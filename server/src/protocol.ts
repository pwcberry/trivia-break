/**
 * Wire protocol shared by the client and server.
 */

/** WebSocket endpoint path the client connects to. */
export const WS_PATH = "/ws";

export interface RoomSettings {
  /** Name of the room, such as "Fast Friday Trivia" */
  name: string;
  /** Number of questions in a game */
  questions: number;
  /** Seconds a player has to answer before the question auto-ends. */
  answerTimeSec: number;
  /** Maximum players allowed in the room. */
  maxPlayers: number;
  /** Number of choices per answer. */
  choicesPerAnswer: number;
}

export type RoomStatus = "lobby" | "playing" | "ended";
export type QuestionPhase = "choosing" | "intermission";

export interface PlayerView {
  sessionId: string;
  nickname: string;
  score: number;
  connected: boolean;
  isHost: boolean;
  hasAnswered: boolean;
}

export interface QuestionPublic {
  /** Global question index (1-based) — one player's period. Unique per question. */
  questionOrdinal: number;

  totalQuestions: number;

  questionText: string;
  choices: string[];
  phase: QuestionPhase;
  /** Epoch ms when the answering phase ends; null outside the answering phase. */
  endsAt: number | null;
}

export interface RoomView {
  code: string;
  status: RoomStatus;
  settings: RoomSettings;
  players: PlayerView[];
  question: QuestionPublic | null;
}

export interface Score {
  sessionId: string;
  nickname: string;
  score: number;
}

export interface QuestionResult {
  sessionId: string;
  nickname: string;
  answeredCorrectly: boolean;
  /** Points earned for this question (0 if incorrect). */
  points:number;
}

export type GuessKind = "guess" | "exit" | "system";

export type ErrorCode
  = | "room_not_found"
  | "nickname_taken"
  | "room_full"
  | "invalid_message"
  | "not_allowed"
  | "bad_request";


/** Messages sent from a client to the server. */
export type ClientMessage
  = | { type: "join_room"; code: string; nickname: string }

/** Messages sent from the server to a client. */
export type ServerMessage
  = | { type: "room_view"; room: RoomView }
    | { type: "question_result"; result: QuestionResult }
    | { type: "error"; code: ErrorCode; message: string }

/** Union of everything exchanged, either direction. */
export type GameMessage = ClientMessage | ServerMessage;
