import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const JosnForms = pgTable("JosnForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  enableSignIn: boolean("enableSignIn").default(false),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").default("Anonymous"),
  createdAt: varchar("createdAt").notNull(),
  formId: integer("formId").references(() => JosnForms.id),
});
