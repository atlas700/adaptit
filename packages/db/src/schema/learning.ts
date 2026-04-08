import { check, index, integer, pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import {
  learningPathDifficultyEnum,
  learningPathStatusEnum,
  lessonContentStatusEnum,
  lessonFormatEnum,
} from "./enums";
import { createPrimaryKey, createTimestamps } from "./shared";
import { users, workspaces } from "./tenancy";

export const learningPaths = pgTable(
  "learning_paths",
  {
    id: createPrimaryKey(),
    workspaceId: varchar("workspace_id", { length: 36 })
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    createdByUserId: varchar("created_by_user_id", { length: 36 }).references(
      () => users.id,
      { onDelete: "set null" },
    ),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 128 }).notNull(),
    topic: varchar("topic", { length: 255 }).notNull(),
    difficultyLevel: learningPathDifficultyEnum("difficulty_level")
      .notNull()
      .default("beginner"),
    status: learningPathStatusEnum("status").notNull().default("draft"),
    targetAudience: varchar("target_audience", { length: 255 }),
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
    ...createTimestamps(),
  },
  (table) => [
    uniqueIndex("learning_paths_workspace_slug_key").on(
      table.workspaceId,
      table.slug,
    ),
    index("learning_paths_workspace_id_idx").on(table.workspaceId),
    index("learning_paths_created_by_user_id_idx").on(table.createdByUserId),
    check(
      "learning_paths_estimated_duration_minutes_check",
      sql`${table.estimatedDurationMinutes} is null or ${table.estimatedDurationMinutes} > 0`,
    ),
  ],
);

export const learningModules = pgTable(
  "learning_modules",
  {
    id: createPrimaryKey(),
    learningPathId: varchar("learning_path_id", { length: 36 })
      .notNull()
      .references(() => learningPaths.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    position: integer("position").notNull(),
    ...createTimestamps(),
  },
  (table) => [
    uniqueIndex("learning_modules_learning_path_position_key").on(
      table.learningPathId,
      table.position,
    ),
    index("learning_modules_learning_path_id_idx").on(table.learningPathId),
    check("learning_modules_position_check", sql`${table.position} > 0`),
  ],
);

export const lessons = pgTable(
  "lessons",
  {
    id: createPrimaryKey(),
    moduleId: varchar("module_id", { length: 36 })
      .notNull()
      .references(() => learningModules.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    summary: text("summary"),
    format: lessonFormatEnum("format").notNull().default("text"),
    position: integer("position").notNull(),
    contentStatus: lessonContentStatusEnum("content_status")
      .notNull()
      .default("draft"),
    ...createTimestamps(),
  },
  (table) => [
    uniqueIndex("lessons_module_position_key").on(
      table.moduleId,
      table.position,
    ),
    index("lessons_module_id_idx").on(table.moduleId),
    check("lessons_position_check", sql`${table.position} > 0`),
  ],
);
