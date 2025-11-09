"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { GoogleGenAI } from "@google/genai";

import { signUpSchema } from "@/lib/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { cleanAndParse } from "@/lib/utils";
import { generateSalt, hashAndSaltPassword } from "@/utils/password";
import { Task } from "@/prisma/app/generated/prisma";
import {
  AIResponseFromAPI,
  AreaChartData,
  BarChartData,
  CreateThoughtState,
  ThoughtWithAIResponse,
} from "@/lib/defintions";
import { thoughtInputSchema } from "@/lib/schemas/thought-input-schema";
import { log } from "console";
import { columns } from "@/lib/placeholder-data";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function signUp(data: z.infer<typeof signUpSchema>) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser)
      return { error: "Account already exists with this email!" };

    const salt = generateSalt();
    const hashedPassword = await hashAndSaltPassword(data.password, salt);

    const user = await prisma.user.create({
      data: {
        name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        salt,
      },
    });

    if (user == null) return { error: "Account creation failed!" };

    return { user };
  } catch (error) {
    console.log(error);
    return { error: "Account creation failed!" };
  }
}

export async function fetchAIResponse(
  thought: string,
): Promise<AIResponseFromAPI> {
  const AIRole = `
      You are a productivity assistant.

      Your task is to extract structured data from a user's raw thought.
      
      You MUST return a valid JSON object with **only the following keys**:
      
      - "summary": Clarity on what the user is actually feeling based on the thought, respond as if you are telling them how they feel "You are...".
      - "thought": The exact input from the user, letter by letter.
      - "suggestedGoal": A short summary of what the user could aim for.
      - "tasks": A list of actionable steps based on the user input.
      - "themes": Relevant categories, they should be one word (e.g. "health", "productivity").
      - "insight": A short helpful observation or reflection, respond like you are giving advice to a friend don't use fancy words.
      
      Do not include any commentary or explanation outside the JSON.
      Do not include markdown code block markers.
      Return only the JSON object. Keys must always be present — if a value is unclear, return an empty string or empty array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `${AIRole} User: ${thought}`,
    });

    return cleanAndParse(response.text || "");
  } catch (err) {
    console.error("Error fetching AI response: ", err);
    return { error: "Error fetching AI response!" };
  }
}

export async function createThought(
  state: CreateThoughtState,
  formData: FormData,
): Promise<CreateThoughtState> {
  try {
    const parsed = thoughtInputSchema.safeParse({
      thought: formData.get("thought"),
    });
    if (!parsed.success) return { error: parsed.error?.issues[0].message };

    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });
    if (!user) return { error: "User not found!" };

    const response = await fetchAIResponse(parsed.data.thought);
    if ("error" in response) return { error: response.error };

    const result = await prisma.$transaction(async (tx) => {
      // First create a thought
      const thought = await tx.thought.create({
        data: {
          content: response.thought,
          userId: session.user.id,
        },
      });

      // Create AIResponse linked to the thought
      const AIResponse = await tx.aIResponse.create({
        data: {
          thoughtId: thought.id,
          summary: response.summary,
          insight: response.insight,
          suggestedGoal: response.suggestedGoal,
          themes: response.themes,
        },
      });

      // Create tasks linked to the AIResponse
      const tasks: Task[] = await Promise.all(
        response.tasks.map((task) =>
          tx.task.create({
            data: {
              content: task,
              AIResponseId: AIResponse.id,
            },
          }),
        ),
      );

      return { thought, AIResponse, tasks };
    });

    return result;
  } catch (err) {
    console.error("Error creating thought: ", err);
    return { error: "Internal server error." };
  }
}

export async function saveThoughtToDashboard(thoughtId: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized!" };

    await prisma.thought.update({
      where: {
        id: thoughtId,
      },
      data: {
        saved: true,
      },
    });
  } catch (err) {
    console.error("Error saving thought to dashboard: ", err);
    return { error: "Internal server error." };
  }
}

export async function saveTaskToKanban(taskId: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const board = await prisma.board.findFirst({
      where: { userId: session.user.id },
      include: {
        columns: {
          where: {
            position: 0,
          },
        },
      },
    });

    const toDoColumn = await prisma.column.findFirst({
      where: { boardId: board?.id, position: 0 },
    });

    await prisma.task.update({
      where: { id: taskId },
      data: { columnId: toDoColumn?.id },
    });
  } catch (err) {
    console.error("Error saving task to kanban board: ", err);
    return { error: "Internal server error." };
  }
}

export async function getThoughts(
  userId: string,
): Promise<ThoughtWithAIResponse[] | { error: string }> {
  try {
    return await prisma.thought.findMany({
      where: { userId },
      include: {
        AIResponse: {
          include: {
            tasks: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("Failed to get thoughts: ", error);
    return { error: "Failed to get thoughts!" };
  }
}

export async function deleteThought(thoughtId: string) {
  try {
    // Delete tasks related to the thought if they don't
    // have a column ID
    const thought = await prisma.thought.findFirst({
      where: { id: thoughtId },
      include: {
        AIResponse: {
          include: {
            tasks: true,
          },
        },
      },
    });

    await prisma.$transaction(async (tx) => {
      if (thought?.AIResponse?.tasks) {
        for (const task of thought.AIResponse.tasks) {
          if (task.columnId) await tx.task.delete({ where: { id: task.id } });
          else
            await tx.task.update({
              where: { id: task.id },
              data: { AIResponseId: null },
            });
        }
      }

      await tx.aIResponse.delete({ where: { thoughtId } });
      await tx.thought.delete({ where: { id: thoughtId } });
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
}

export async function getColumns(userId: string) {
  try {
    const board = await prisma.board.findFirst({
      where: { userId },
      select: {
        columns: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return (
      board?.columns.map((column) => ({
        id: column.id,
        name: column.title,
        color:
          column.position === 0
            ? "red"
            : column.position === 1
              ? "yellow"
              : "green",
      })) ?? []
    );
  } catch (err) {
    console.error("Failed to get columns: ", err);
    return [];
  }
}

export async function getSavedTasks(userId: string) {
  try {
    const board = await prisma.board.findFirst({
      where: { userId },
      include: { columns: true },
    });
    const tasks = await prisma.task.findMany({
      where: {
        columnId: {
          in: board?.columns.map((c) => c.id),
        },
      },
    });
    return tasks.map((task) => ({
      id: task.id,
      column: task.columnId as string,
      name: task.content,
      createdAt: task.createdAt,
    }));
  } catch (error) {
    console.error("Failed to get saved tasks: ", error);
    return [];
  }
}

// TODO - make it work with theme/s
// TODO - add zod validtion
export async function editTask(
  taskId: string,
  content: string,
  theme: [string] | null = null,
) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        content,
      },
    });
  } catch (err) {
    console.error("Failed to edit task: ", err);
    return { error: "Failed to edit task!" };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({ where: { id: taskId } });
  } catch (err) {
    console.error("Failed to delete task: ", err);
    return { error: "Failed to delete task!" };
  }
}

export async function createTask(
  userId: string,
  content: string,
  theme: [string] | null = null,
) {
  try {
    const board = await prisma.board.findFirst({
      where: { userId },
      select: {
        id: true,
      },
    });
    const todoColumn = await prisma.column.findFirst({
      where: { boardId: board?.id, position: 0 },
      select: { id: true },
    });
    const task = await prisma.task.create({
      data: {
        content,
        columnId: todoColumn?.id,
      },
    });
    return {
      id: task.id,
      column: task.columnId as string,
      name: task.content,
      createdAt: task.createdAt,
    };
  } catch (error) {
    console.error("Failed to create task: ", error);
    return { error: "Failed to create task!" };
  }
}

export async function changeTaskColumn(columnId: string, taskId: string) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { columnId: columnId },
    });
  } catch (err) {
    console.error("Failed to change task column: ", err);
    return { error: "Failed to change task column!" };
  }
}

export async function thoughtsCreatedPerDay(
  userId: string,
): Promise<AreaChartData | { error: string }> {
  try {
    // Get a list of unique dates
    // for each date see how many thoughts were created on that date
    // return a date and a count

    return await prisma.$queryRaw`
      SELECT DATE("createdAt") as date, COUNT(*)::int as count
      FROM "Thought"
      WHERE "userId" = ${userId}
      GROUP BY DATE("createdAt")
      ORDER BY date;
    `;
  } catch (err) {
    console.error("Failed to get thoughts created per day: ", err);
    return { error: "Failed to get thoughts created per day!" };
  }
}

export async function topFiveThemes(
  userId: string,
): Promise<BarChartData | { error: string }> {
  try {
    const thoughts = await prisma.thought.findMany({
      where: { userId },
      select: {
        AIResponse: {
          select: {
            themes: true,
          },
        },
      },
    });

    const arrayThemes = thoughts.flatMap((t) => t.AIResponse?.themes);

    const themes: BarChartData = [];

    arrayThemes.forEach((theme) => {
      const isThemeInThemesArray = themes.find(
        (t) => t.theme.toLowerCase() === theme?.toLowerCase(),
      );

      if (isThemeInThemesArray) {
        const themeIndex = themes.findIndex(
          (t) => t.theme.toLowerCase() === theme?.toLowerCase(),
        );
        return themes[themeIndex].count++;
      }

      themes.push({
        theme: theme?.toLowerCase() as string,
        count: 1,
      });
    });

    return themes.sort((a, b) => b.count - a.count).slice(0, 5);
  } catch (err) {
    console.error("Error getting top 5 themes: ", err);
    return { error: "Something went wrong!" };
  }
}

export async function getTaskStats(
  userId: string,
): Promise<
  { createdTasks: number; completedTasks: number } | { error: string }
> {
  try {
    const board = await prisma.board.findFirst({
      where: { userId },
      select: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!board) {
      return { error: "Board not found!" };
    }
    const createdTasks = board.columns.flatMap((c) => c.tasks).length;
    const completedTasks = board.columns.find((c) => c.title === "Done")?.tasks
      .length;

    return {
      createdTasks,
      completedTasks: completedTasks ? completedTasks : 0,
    };
  } catch (err) {
    console.error("Failed to get task stats: ", err);
    return { error: "Failed to get task stats!" };
  }
}
