import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { lessonProgressStatusEnum } from "./enums";
import { lessons } from "./learning";
import { createPrimaryKey, createTimestamps } from "./shared";
import { users } from "./tenancy";

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: createPrimaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: varchar("lesson_id", { length: 36 })
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    status: lessonProgressStatusEnum("status")
      .notNull()
      .default("not_started"),
    progressPercent: integer("progress_percent").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    lastViewedAt: timestamp("last_viewed_at", { withTimezone: true }),
    ...createTimestamps(),
  },
  (table) => [
    uniqueIndex("lesson_progress_user_lesson_key").on(
      table.userId,
      table.lessonId,
    ),
    index("lesson_progress_lesson_id_idx").on(table.lessonId),
    check(
      "lesson_progress_progress_percent_check",
      sql`${table.progressPercent} >= 0 and ${table.progressPercent} <= 100`,
    ),
  ],
);

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    id: createPrimaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: varchar("lesson_id", { length: 36 })
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    maxScore: integer("max_score").notNull(),
    passed: boolean("passed").notNull().default(false),
    attemptedAt: timestamp("attempted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("quiz_attempts_user_id_idx").on(table.userId),
    index("quiz_attempts_lesson_id_idx").on(table.lessonId),
    check("quiz_attempts_score_check", sql`${table.score} >= 0`),
    check("quiz_attempts_max_score_check", sql`${table.maxScore} > 0`),
    check("quiz_attempts_score_within_max_check", sql`${table.score} <= ${table.maxScore}`),
  ],
);
