"use server"

import {GoogleGenAI} from '@google/genai';

import z from "zod"
import {signUpSchema} from "@/lib/schemas/auth.schema";
import {prisma} from "@/lib/prisma";
import {generateSalt, hashAndSaltPassword} from "@/utils/password";
import {cleanAndParse} from "@/lib/utils";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  try {
    const existingUser = await prisma.user.findFirst({where: {email: data.email}})

    if (existingUser) return { error: "Account already exists with this email!" }

    const salt = generateSalt();
    const hashedPassword = await hashAndSaltPassword(data.password, salt);

    const user = await prisma.user.create({
      data: {
        name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        salt
      }
    })

    if (user == null) return { error: "Account creation failed!" }

    return { user }
  } catch (error) {
    console.log(error)
    return { error: "Account creation failed!" }
  }
}

export async function fetchAIResponse(data: { result: { thought: string; summary: string; insight: string; suggestedGoal: string; themes: string[]; tasks: string[] } }, formData: FormData) {
  const thought = formData.get("thought");

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
  `

  const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: `${AIRole} User: ${thought}`,
  });
  console.log(response.text);
  return { result: cleanAndParse(response.text || "") }
}