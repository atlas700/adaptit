import {
  check,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { organizationRoleEnum, workspaceTypeEnum } from "./enums";
import { createPrimaryKey, createTimestamps } from "./shared";

export const users = pgTable(
  "users",
  {
    id: createPrimaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    name: varchar("name", { length: 255 }),
    imageUrl: text("image_url"),
    ...createTimestamps(),
  },
  (table) => [uniqueIndex("users_email_key").on(table.email)],
);

export const organizations = pgTable(
  "organizations",
  {
    id: createPrimaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 128 }).notNull(),
    ...createTimestamps(),
  },
  (table) => [uniqueIndex("organizations_slug_key").on(table.slug)],
);

export const organizationMemberships = pgTable(
  "organization_memberships",
  {
    id: createPrimaryKey(),
    organizationId: varchar("organization_id", { length: 36 })
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: organizationRoleEnum("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("organization_memberships_org_user_key").on(
      table.organizationId,
      table.userId,
    ),
    index("organization_memberships_user_id_idx").on(table.userId),
  ],
);

export const workspaces = pgTable(
  "workspaces",
  {
    id: createPrimaryKey(),
    type: workspaceTypeEnum("type").notNull(),
    ownerUserId: varchar("owner_user_id", { length: 36 }).references(
      () => users.id,
      { onDelete: "cascade" },
    ),
    organizationId: varchar("organization_id", { length: 36 }).references(
      () => organizations.id,
      { onDelete: "cascade" },
    ),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 128 }).notNull(),
    ...createTimestamps(),
  },
  (table) => [
    uniqueIndex("workspaces_slug_key").on(table.slug),
    index("workspaces_owner_user_id_idx").on(table.ownerUserId),
    index("workspaces_organization_id_idx").on(table.organizationId),
    check(
      "workspaces_owner_shape_check",
      sql`(
        (${table.type} = 'personal' and ${table.ownerUserId} is not null and ${table.organizationId} is null)
        or
        (${table.type} = 'organization' and ${table.organizationId} is not null and ${table.ownerUserId} is null)
      )`,
    ),
  ],
);
