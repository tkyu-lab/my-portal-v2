import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Learning Log Feature", () => {
  it("should create a learning log", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.learningLog.create({
      title: "React Dashboard完成",
      description: "Tailwind CSSを使ってダッシュボードを完成させました。",
      tags: "React,CSS,JavaScript"
    });

    expect(result.success).toBe(true);
  });

  it("should list learning logs", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    
    const result = await caller.learningLog.list({ limit: 10 });
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Training Feature", () => {
  it("should get training questions by difficulty", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    
    const result = await caller.training.getQuestions({
      difficulty: "beginner",
      limit: 5
    });
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("should record training progress", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.training.recordProgress({
      questionId: 1,
      completed: 1
    });

    expect(result.success).toBe(true);
  });

  it("should get training stats", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.training.getStats();

    expect(result).toHaveProperty("completed");
    expect(result).toHaveProperty("attempted");
    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("masteryScore");
  });
});

describe("Forum Feature", () => {
  it("should create a forum question", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forum.createQuestion({
      title: "FlexboxとGridの使い分けは?",
      description: "どちらを使うべき場面がわかりません",
      category: "CSS/レイアウト"
    });

    expect(result.success).toBe(true);
  });

  it("should list forum questions", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    
    const result = await caller.forum.listQuestions({ limit: 10 });
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("should create a forum answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forum.createAnswer({
      questionId: 1,
      content: "Flexboxは単一行/列のレイアウトに、Gridは複雑なグリッドに使うのが一般的です。",
      isAIHint: 0
    });

    expect(result.success).toBe(true);
  });

  it("should generate AI hint for a question", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    
    const result = await caller.forum.generateAIHint({
      question: "JavaScriptで非同期処理を実装するには?"
    });

    expect(result).toHaveProperty("hint");
    expect(typeof result.hint).toBe("string");
  }, { timeout: 15000 });
});

describe("Badge Feature", () => {
  it("should award a badge", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.badges.awardBadge({
      badgeType: "html_master"
    });

    expect(result.success).toBe(true);
  });

  it("should get user badges", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.badges.getUserBadges();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Maintenance Feature", () => {
  it("should create a maintenance task", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.maintenance.createTask({
      projectName: "My Website",
      taskType: "seo",
      frequency: "weekly"
    });

    expect(result.success).toBe(true);
  });

  it("should get user maintenance tasks", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.maintenance.getUserTasks();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should complete a maintenance task", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.maintenance.completeTask({
      taskId: 1
    });

    expect(result.success).toBe(true);
  });
});

describe("GitHub Sync Feature", () => {
  it("should create a GitHub sync record", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.github.createSyncRecord({
      repositoryName: "my-website",
      repositoryUrl: "https://github.com/user/my-website"
    });

    expect(result.success).toBe(true);
  });

  it("should get user GitHub records", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.github.getUserRecords();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should update GitHub sync record", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.github.updateSyncRecord({
      recordId: 1,
      manualEdits: 5
    });

    expect(result.success).toBe(true);
  });
});

describe("Client Project Feature", () => {
  it("should create a client project", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clientProject.create({
      clientName: "ABC Corporation",
      projectTitle: "Corporate Website Redesign",
      description: "Complete website redesign with modern UI",
      estimatedHours: 40,
      hourlyRate: 100,
      totalQuote: 4000
    });

    expect(result.success).toBe(true);
  });

  it("should get user client projects", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clientProject.getUserProjects();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should update client project status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.clientProject.updateStatus({
      projectId: 1,
      status: "proposed"
    });

    expect(result.success).toBe(true);
  });
});
