import { relations } from "drizzle-orm";

import { accounts, sessions } from "./auth";
import { workspaceSubscriptions } from "./billing";
import { learningModules, learningPaths, lessons } from "./learning";
import { lessonProgress, quizAttempts } from "./progress";
import { organizationMemberships, organizations, users, workspaces } from "./tenancy";

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  organizationMemberships: many(organizationMemberships),
  ownedWorkspaces: many(workspaces),
  createdLearningPaths: many(learningPaths),
  lessonProgressRecords: many(lessonProgress),
  quizAttempts: many(quizAttempts),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const organizationsRelations = relations(organizations, ({ many, one }) => ({
  memberships: many(organizationMemberships),
  workspace: one(workspaces, {
    fields: [organizations.id],
    references: [workspaces.organizationId],
  }),
}));

export const organizationMembershipsRelations = relations(
  organizationMemberships,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMemberships.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMemberships.userId],
      references: [users.id],
    }),
  }),
);

export const workspacesRelations = relations(workspaces, ({ many, one }) => ({
  ownerUser: one(users, {
    fields: [workspaces.ownerUserId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [workspaces.organizationId],
    references: [organizations.id],
  }),
  subscription: one(workspaceSubscriptions, {
    fields: [workspaces.id],
    references: [workspaceSubscriptions.workspaceId],
  }),
  learningPaths: many(learningPaths),
}));

export const workspaceSubscriptionsRelations = relations(
  workspaceSubscriptions,
  ({ one }) => ({
    workspace: one(workspaces, {
      fields: [workspaceSubscriptions.workspaceId],
      references: [workspaces.id],
    }),
  }),
);

export const learningPathsRelations = relations(learningPaths, ({ many, one }) => ({
  workspace: one(workspaces, {
    fields: [learningPaths.workspaceId],
    references: [workspaces.id],
  }),
  createdByUser: one(users, {
    fields: [learningPaths.createdByUserId],
    references: [users.id],
  }),
  modules: many(learningModules),
}));

export const learningModulesRelations = relations(
  learningModules,
  ({ many, one }) => ({
    learningPath: one(learningPaths, {
      fields: [learningModules.learningPathId],
      references: [learningPaths.id],
    }),
    lessons: many(lessons),
  }),
);

export const lessonsRelations = relations(lessons, ({ many, one }) => ({
  module: one(learningModules, {
    fields: [lessons.moduleId],
    references: [learningModules.id],
  }),
  progressRecords: many(lessonProgress),
  quizAttempts: many(quizAttempts),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  user: one(users, {
    fields: [quizAttempts.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [quizAttempts.lessonId],
    references: [lessons.id],
  }),
}));
