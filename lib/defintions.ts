import {AIResponse, Prisma} from "@/prisma/app/generated/prisma";
export type AIResponseFromAPI = {
  thought: string;
  summary: string;
  insight: string;
  suggestedGoal: string;
  themes: string[];
  tasks: string[];
}

export type ThoughtWithAIResponse = Prisma.ThoughtGetPayload<{
  include: {
    AIResponse: {
      include: {
        tasks: true;
      };
    };
  };
}>;