import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Learning Logs (Build in Public)
export const learningLogs = mysqlTable("learning_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 512 }),
  tags: varchar("tags", { length: 255 }), // JSON array of language tags: HTML, CSS, JS, etc.
  likes: int("likes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LearningLog = typeof learningLogs.$inferSelect;
export type InsertLearningLog = typeof learningLogs.$inferInsert;

// AI Training Questions
export const trainingQuestions = mysqlTable("training_questions", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // HTML, CSS, JS, API, etc.
  questionText: text("questionText").notNull(),
  hint: text("hint"),
  solutionCode: text("solutionCode"),
  weight: int("weight").default(1).notNull(), // 1=beginner, 2=intermediate, 3=advanced
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrainingQuestion = typeof trainingQuestions.$inferSelect;
export type InsertTrainingQuestion = typeof trainingQuestions.$inferInsert;

// User Training Progress
export const userTrainingProgress = mysqlTable("user_training_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: int("questionId").notNull(),
  completed: int("completed").default(0).notNull(), // 0=not started, 1=completed, 2=attempted
  attempts: int("attempts").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type UserTrainingProgress = typeof userTrainingProgress.$inferSelect;
export type InsertUserTrainingProgress = typeof userTrainingProgress.$inferInsert;

// Forum Questions
export const forumQuestions = mysqlTable("forum_questions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }),
  resolved: int("resolved").default(0).notNull(),
  views: int("views").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumQuestion = typeof forumQuestions.$inferSelect;
export type InsertForumQuestion = typeof forumQuestions.$inferInsert;

// Forum Answers
export const forumAnswers = mysqlTable("forum_answers", {
  id: int("id").autoincrement().primaryKey(),
  questionId: int("questionId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  isAIHint: int("isAIHint").default(0).notNull(), // 1 if AI-generated hint
  helpful: int("helpful").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumAnswer = typeof forumAnswers.$inferSelect;
export type InsertForumAnswer = typeof forumAnswers.$inferInsert;

// User Badges
export const userBadges = mysqlTable("user_badges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeType: varchar("badgeType", { length: 100 }).notNull(), // e.g., "js_master", "api_integration", "css_expert"
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

// Maintenance Tasks
export const maintenanceTasks = mysqlTable("maintenance_tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectName: varchar("projectName", { length: 255 }).notNull(),
  taskType: mysqlEnum("taskType", ["backup", "security", "seo", "performance", "update"]).notNull(),
  frequency: mysqlEnum("frequency", ["daily", "weekly", "monthly"]).notNull(),
  dueDate: timestamp("dueDate"),
  completed: int("completed").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MaintenanceTask = typeof maintenanceTasks.$inferSelect;
export type InsertMaintenanceTask = typeof maintenanceTasks.$inferInsert;

// GitHub Sync Records
export const githubSyncRecords = mysqlTable("github_sync_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  repositoryName: varchar("repositoryName", { length: 255 }).notNull(),
  repositoryUrl: varchar("repositoryUrl", { length: 512 }),
  lastSyncedAt: timestamp("lastSyncedAt"),
  manualEdits: int("manualEdits").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GitHubSyncRecord = typeof githubSyncRecords.$inferSelect;
export type InsertGitHubSyncRecord = typeof githubSyncRecords.$inferInsert;

// Client Simulation Projects (Contract & Pricing)
export const clientProjects = mysqlTable("client_projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  projectTitle: varchar("projectTitle", { length: 255 }).notNull(),
  description: text("description"),
  estimatedHours: int("estimatedHours"),
  hourlyRate: int("hourlyRate"), // in cents
  totalQuote: int("totalQuote"), // in cents
  contractTemplate: text("contractTemplate"),
  status: mysqlEnum("status", ["draft", "proposed", "accepted", "completed"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ClientProject = typeof clientProjects.$inferSelect;
export type InsertClientProject = typeof clientProjects.$inferInsert;