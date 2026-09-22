import type { ClientMessage } from "../protocol.js";

/** Parse + validate a raw frame; returns null for malformed or invalid input. */
export function parseClientMessage(raw: string): ClientMessage | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  }
  catch {
    return null;
  }
  // TODO: Implement proper validation using a schema (e.g., Zod) to ensure the message conforms to the expected structure.
  // const result = clientMessageSchema.safeParse(value);
  // return result.success ? result.data : null;
  return null;
}
