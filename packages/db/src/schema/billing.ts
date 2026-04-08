import { index, pgTable, uniqueIndex, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

import {
  subscriptionProviderEnum,
  subscriptionStatusEnum,
} from "./enums";
import { createPrimaryKey, createTimestamps } from "./shared";
import { workspaces } from "./tenancy";

export const workspaceSubscriptions = pgTable(
  "workspace_subscriptions",
  {
    id: createPrimaryKey(),
    workspaceId: varchar("workspace_id", { length: 36 })
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    provider: subscriptionProviderEnum("provider").notNull().default("stripe"),
    providerCustomerId: varchar("provider_customer_id", { length: 255 }),
    providerSubscriptionId: varchar("provider_subscription_id", { length: 255 }),
    planKey: varchar("plan_key", { length: 128 }).notNull(),
    status: subscriptionStatusEnum("status").notNull().default("trialing"),
    currentPeriodStart: timestamp("current_period_start", { withTimezone: true }),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end")
      .notNull()
      .default(false),
    ...createTimestamps(),
  },
  (table) => [
    uniqueIndex("workspace_subscriptions_workspace_id_key").on(table.workspaceId),
    uniqueIndex("workspace_subscriptions_provider_customer_id_key").on(
      table.providerCustomerId,
    ),
    uniqueIndex("workspace_subscriptions_provider_subscription_id_key").on(
      table.providerSubscriptionId,
    ),
    index("workspace_subscriptions_status_idx").on(table.status),
  ],
);
