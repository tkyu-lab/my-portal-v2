import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  createLearningLog,
  getLearningLogs,
  getUserLearningLogs,
  getTrainingQuestionsByDifficulty,
  recordTrainingProgress,
  getUserTrainingStats,
  createForumQuestion,
  getForumQuestions,
  getForumAnswers,
  createForumAnswer,
  getUserBadges,
  awardBadge,
  createMaintenanceTask,
  getUserMaintenanceTasks,
  completeMaintenanceTask,
  createGitHubSyncRecord,
  getUserGitHubRecords,
  updateGitHubSyncRecord,
  createClientProject,
  getUserClientProjects,
  updateClientProjectStatus
} from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Learning Log routes
  learningLog: router({
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        tags: z.string().optional()
      }))
      .mutation(async ({ input, ctx }) => {
        await createLearningLog({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          tags: input.tags
        });
        return { success: true };
      }),

    list: publicProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input }) => {
        return getLearningLogs(input.limit);
      }),

    userLogs: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserLearningLogs(ctx.user.id);
      })
  }),

  // Training routes
  training: router({
    getQuestions: publicProcedure
      .input(z.object({
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        limit: z.number().default(10)
      }))
      .query(async ({ input }) => {
        return getTrainingQuestionsByDifficulty(input.difficulty, input.limit);
      }),

    recordProgress: protectedProcedure
      .input(z.object({
        questionId: z.number(),
        completed: z.number().min(0).max(2)
      }))
      .mutation(async ({ input, ctx }) => {
        await recordTrainingProgress(ctx.user.id, input.questionId, input.completed);
        
        // Award badge if all beginner questions completed
        const stats = await getUserTrainingStats(ctx.user.id);
        if (stats.completed >= 20) {
          await awardBadge(ctx.user.id, "html_master");
        }
        
        return { success: true };
      }),

    getStats: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserTrainingStats(ctx.user.id);
      })
  }),

  // Forum routes
  forum: router({
    createQuestion: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        category: z.string()
      }))
      .mutation(async ({ input, ctx }) => {
        await createForumQuestion({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          category: input.category
        });
        return { success: true };
      }),

    listQuestions: publicProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input }) => {
        return getForumQuestions(input.limit);
      }),

    getAnswers: publicProcedure
      .input(z.object({ questionId: z.number() }))
      .query(async ({ input }) => {
        return getForumAnswers(input.questionId);
      }),

    createAnswer: protectedProcedure
      .input(z.object({
        questionId: z.number(),
        content: z.string(),
        isAIHint: z.number().default(0)
      }))
      .mutation(async ({ input, ctx }) => {
        await createForumAnswer({
          questionId: input.questionId,
          userId: ctx.user.id,
          content: input.content,
          isAIHint: input.isAIHint
        });
        return { success: true };
      }),

    generateAIHint: publicProcedure
      .input(z.object({
        question: z.string()
      }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a helpful coding mentor. Provide Socratic hints to guide learners to the solution without giving the direct answer. Ask guiding questions instead."
              },
              {
                role: "user",
                content: `Question: ${input.question}\n\nProvide a Socratic hint to help the learner think through this problem.`
              }
            ]
          });

          const hint = response.choices[0]?.message?.content || "Consider breaking down the problem into smaller parts.";
          return { hint };
        } catch (error) {
          console.error("Error generating AI hint:", error);
          return { hint: "Try researching the core concepts related to this problem." };
        }
      })
  }),

  // Badges routes
  badges: router({
    getUserBadges: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserBadges(ctx.user.id);
      }),

    awardBadge: protectedProcedure
      .input(z.object({ badgeType: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await awardBadge(ctx.user.id, input.badgeType);
        return { success: true };
      })
  }),

  // Maintenance routes
  maintenance: router({
    createTask: protectedProcedure
      .input(z.object({
        projectName: z.string(),
        taskType: z.enum(["backup", "security", "seo", "performance", "update"]),
        frequency: z.enum(["daily", "weekly", "monthly"]),
        dueDate: z.date().optional()
      }))
      .mutation(async ({ input, ctx }) => {
        await createMaintenanceTask({
          userId: ctx.user.id,
          projectName: input.projectName,
          taskType: input.taskType,
          frequency: input.frequency,
          dueDate: input.dueDate
        });
        return { success: true };
      }),

    getUserTasks: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserMaintenanceTasks(ctx.user.id);
      }),

    completeTask: protectedProcedure
      .input(z.object({ taskId: z.number() }))
      .mutation(async ({ input }) => {
        await completeMaintenanceTask(input.taskId);
        return { success: true };
      })
  }),

  // GitHub Sync routes
  github: router({
    createSyncRecord: protectedProcedure
      .input(z.object({
        repositoryName: z.string(),
        repositoryUrl: z.string().optional()
      }))
      .mutation(async ({ input, ctx }) => {
        await createGitHubSyncRecord({
          userId: ctx.user.id,
          repositoryName: input.repositoryName,
          repositoryUrl: input.repositoryUrl
        });
        return { success: true };
      }),

    getUserRecords: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserGitHubRecords(ctx.user.id);
      }),

    updateSyncRecord: protectedProcedure
      .input(z.object({
        recordId: z.number(),
        manualEdits: z.number()
      }))
      .mutation(async ({ input }) => {
        await updateGitHubSyncRecord(input.recordId, input.manualEdits);
        return { success: true };
      })
  }),

  // Client Projects routes
  clientProject: router({
    create: protectedProcedure
      .input(z.object({
        clientName: z.string(),
        projectTitle: z.string(),
        description: z.string().optional(),
        estimatedHours: z.number().optional(),
        hourlyRate: z.number().optional(),
        totalQuote: z.number().optional()
      }))
      .mutation(async ({ input, ctx }) => {
        await createClientProject({
          userId: ctx.user.id,
          clientName: input.clientName,
          projectTitle: input.projectTitle,
          description: input.description,
          estimatedHours: input.estimatedHours,
          hourlyRate: input.hourlyRate,
          totalQuote: input.totalQuote
        });
        return { success: true };
      }),

    getUserProjects: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserClientProjects(ctx.user.id);
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        status: z.enum(["draft", "proposed", "accepted", "completed"])
      }))
      .mutation(async ({ input }) => {
        await updateClientProjectStatus(input.projectId, input.status);
        return { success: true };
      })
  })
});

export type AppRouter = typeof appRouter;
