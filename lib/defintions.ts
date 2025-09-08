import {Prisma} from "@/prisma/app/generated/prisma";
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

export type KanbanColumn = {
  id: string
  name: string
  color: string
}

export type KanbanTask = {
  id: string;
  column: string;
  name: string;
  createdAt: Date;
};

export type AreaChartData = {
  date: Date;
  count: number;
}[];
