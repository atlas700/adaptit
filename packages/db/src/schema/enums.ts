import { pgEnum } from "drizzle-orm/pg-core";

export const organizationRoleEnum = pgEnum("organization_role", [
  "owner",
  "admin",
  "member",
]);

export const workspaceTypeEnum = pgEnum("workspace_type", [
  "personal",
  "organization",
]);

export const subscriptionProviderEnum = pgEnum("subscription_provider", [
  "stripe",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "unpaid",
]);

export const learningPathDifficultyEnum = pgEnum("learning_path_difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const learningPathStatusEnum = pgEnum("learning_path_status", [
  "draft",
  "active",
  "archived",
]);

export const lessonFormatEnum = pgEnum("lesson_format", [
  "text",
  "visual",
  "video",
]);

export const lessonContentStatusEnum = pgEnum("lesson_content_status", [
  "draft",
  "ready",
  "archived",
]);

export const lessonProgressStatusEnum = pgEnum("lesson_progress_status", [
  "not_started",
  "in_progress",
  "completed",
]);
