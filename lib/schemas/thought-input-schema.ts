import { z } from "zod";

export const thoughtInputSchema = z.object({
  thought: z.string().min(1, "Thought cannot be empty."),
});
