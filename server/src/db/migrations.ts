import type { Kysely } from "kysely";
import type { Migration, MigrationProvider } from "kysely/migration";

/**
 * Migrations are defined inline (not read from disk) so the exact same set
 * runs under tsx in development, compiled JS in production, and vitest in
 * tests — with no dependency on file layout or dynamic import paths.
 */

const initial: Migration = {
  async up(db: Kysely<unknown>): Promise<void> {
    await  db.schema  .createTable("rooms")
      .addColumn("id", "text", c => c.primaryKey())
      .addColumn("invite_code", "text", c => c.notNull().unique())
      .addColumn("settings", "text", c => c.notNull())
      .addColumn("status", "text", c => c.notNull())
      .addColumn("created_at", "bigint", c => c.notNull())
      .execute();
  },

  async down(db: Kysely<unknown>): Promise<void> {
    for (const table of ["words", "players", "turn_results", "turns", "games", "rooms"]) {
      await db.schema.dropTable(table).ifExists().execute();
    }
  },
};

export const migrations: Record<string, Migration> = {
  "0001_initial": initial,
};

export class InlineMigrationProvider implements MigrationProvider {
  getMigrations(): Promise<Record<string, Migration>> {
    return Promise.resolve(migrations);
  }
}
