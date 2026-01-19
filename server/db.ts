import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  learningLogs,
  InsertLearningLog,
  trainingQuestions,
  userTrainingProgress,
  forumQuestions,
  forumAnswers,
  userBadges,
  maintenanceTasks,
  githubSyncRecords,
  clientProjects
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Learning Log queries
export async function createLearningLog(log: InsertLearningLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(learningLogs).values(log);
}

export async function getLearningLogs(limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(learningLogs).orderBy(desc(learningLogs.createdAt)).limit(limit);
}

export async function getUserLearningLogs(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(learningLogs).where(eq(learningLogs.userId, userId)).orderBy(desc(learningLogs.createdAt));
}

// Training questions queries
export async function getTrainingQuestionsByDifficulty(difficulty: "beginner" | "intermediate" | "advanced", limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(trainingQuestions).where(eq(trainingQuestions.difficulty, difficulty)).limit(limit);
}

export async function recordTrainingProgress(userId: number, questionId: number, completed: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(userTrainingProgress)
    .where(and(eq(userTrainingProgress.questionId, questionId), eq(userTrainingProgress.userId, userId)))
    .limit(1);
  
  if (existing.length > 0) {
    await db.update(userTrainingProgress)
      .set({ completed, attempts: existing[0].attempts + 1, completedAt: completed === 1 ? new Date() : null })
      .where(eq(userTrainingProgress.id, existing[0].id));
  } else {
    await db.insert(userTrainingProgress).values({
      userId,
      questionId,
      completed,
      attempts: 1,
      completedAt: completed === 1 ? new Date() : null
    });
  }
}

export async function getUserTrainingStats(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const progress = await db.select().from(userTrainingProgress).where(eq(userTrainingProgress.userId, userId));
  
  const completed = progress.filter(p => p.completed === 1).length;
  const attempted = progress.filter(p => p.completed === 2).length;
  
  return {
    completed,
    attempted,
    total: progress.length,
    masteryScore: Math.round((completed / Math.max(progress.length, 1)) * 100)
  };
}

// Forum queries
export async function createForumQuestion(question: typeof forumQuestions.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(forumQuestions).values(question);
}

export async function getForumQuestions(limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(forumQuestions).orderBy(desc(forumQuestions.createdAt)).limit(limit);
}

export async function getForumAnswers(questionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(forumAnswers).where(eq(forumAnswers.questionId, questionId)).orderBy(desc(forumAnswers.createdAt));
}

export async function createForumAnswer(answer: typeof forumAnswers.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(forumAnswers).values(answer);
}

// Badge queries
export async function awardBadge(userId: number, badgeType: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(userBadges)
    .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeType, badgeType)))
    .limit(1);
  
  if (existing.length === 0) {
    await db.insert(userBadges).values({ userId, badgeType });
  }
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(userBadges).where(eq(userBadges.userId, userId));
}

// Maintenance tasks queries
export async function createMaintenanceTask(task: typeof maintenanceTasks.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(maintenanceTasks).values(task);
}

export async function getUserMaintenanceTasks(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(maintenanceTasks).where(eq(maintenanceTasks.userId, userId)).orderBy(desc(maintenanceTasks.dueDate));
}

export async function completeMaintenanceTask(taskId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(maintenanceTasks)
    .set({ completed: 1, completedAt: new Date() })
    .where(eq(maintenanceTasks.id, taskId));
}

// GitHub sync records
export async function createGitHubSyncRecord(record: typeof githubSyncRecords.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(githubSyncRecords).values(record);
}

export async function getUserGitHubRecords(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(githubSyncRecords).where(eq(githubSyncRecords.userId, userId));
}

export async function updateGitHubSyncRecord(recordId: number, manualEdits: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(githubSyncRecords)
    .set({ lastSyncedAt: new Date(), manualEdits })
    .where(eq(githubSyncRecords.id, recordId));
}

// Client projects queries
export async function createClientProject(project: typeof clientProjects.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(clientProjects).values(project);
}

export async function getUserClientProjects(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(clientProjects).where(eq(clientProjects.userId, userId)).orderBy(desc(clientProjects.createdAt));
}

export async function updateClientProjectStatus(projectId: number, status: "draft" | "proposed" | "accepted" | "completed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(clientProjects)
    .set({ status })
    .where(eq(clientProjects.id, projectId));
}
