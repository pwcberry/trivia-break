import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["{server,client}/test/**/*.test.ts"],
    environment: "node",
    // DB tests all share one PostgreSQL database; run files sequentially so
    // beforeEach truncations don't race between workers.
    fileParallelism: false
  },
});
