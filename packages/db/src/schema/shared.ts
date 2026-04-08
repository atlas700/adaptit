import { timestamp, uuid } from "drizzle-orm/pg-core";

export function createPrimaryKey() {
  return uuid("id").defaultRandom().primaryKey();
}

export function createTimestamps() {
  return {
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  };
}
