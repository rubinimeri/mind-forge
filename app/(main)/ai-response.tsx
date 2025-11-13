"use client";

import {
  Bot,
  Dot,
  FileText,
  Lightbulb,
  List,
  Tags,
  Target,
} from "lucide-react";
import { useActionState, useState } from "react";

import { createThought } from "@/app/actions";
import SaveToDashboardButton from "@/components/save-to-dashboard-button";
import SaveToKanbanButton from "@/components/save-to-kanban-button";
import TypingEffect from "@/components/typing-effect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import { CreateThoughtState } from "@/lib/defintions";

export default function AIResponseCard() {
  const [currentRenderIndex, setCurrentRenderIndex] = useState(0);
  const [state, formAction, statePending] = useActionState<
    Promise<CreateThoughtState>,
    FormData
  >(createThought, null);

  return (
    <>
      <Card className={"mx-auto max-w-lg mt-8"}>
        <CardHeader>
          <h1
            className={
              "mx-auto text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter text-center"
            }
          >
            What&apos;s on your mind?
          </h1>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <Textarea
              name={"thought"}
              cols={20}
              placeholder={"Type your thought here."}
              className={"placeholder:text-gray-400 border-2 border-inherit"}
            ></Textarea>
            {state !== null && "error" in state && (
              <p className="text-[13px] text-destructive mt-2 ml-3">
                {state.error}
              </p>
            )}
            <Button
              type="submit"
              className={"mt-4 w-full"}
              onClick={() => setCurrentRenderIndex(0)}
              disabled={statePending}
            >
              Organize thought
            </Button>
          </form>
        </CardContent>
      </Card>
      {statePending && (
        <Card
          className={
            "mx-auto max-w-lg mt-8 h-[50svh] py-0 animate-[slideUp_0.5s_ease-out_forwards]"
          }
        >
          <Skeleton
            className={
              "h-full bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%] animate-[shimmer_3s_infinite]"
            }
          />
        </Card>
      )}
      {state !== null && "thought" in state && (
        <Card
          className={
            "mx-auto max-w-lg mt-8 animate-[slideUp_0.5s_ease-out_forwards] mb-8"
          }
        >
          <CardHeader className={"flex justify-between items-center"}>
            {currentRenderIndex >= 0 && (
              <h2
                className={
                  "text-secondary leading-tighter text-2xl font-light tracking-tight text-balance lg:leading-[1.1] xl:text-3xl xl:tracking-tighter flex items-center gap-1"
                }
              >
                <Bot strokeWidth={1} size={30} className={"text-primary"} />
                <TypingEffect
                  text="AI Reflection"
                  onDoneAction={() => setCurrentRenderIndex(1)}
                />
              </h2>
            )}
            {currentRenderIndex >= 1 && (
              <SaveToDashboardButton
                onDoneAction={setCurrentRenderIndex}
                thoughtId={state.thought.id}
              />
            )}
          </CardHeader>
          <CardContent className={"space-y-4"}>
            {currentRenderIndex >= 2 && (
              <h3>
                <FileText
                  strokeWidth={1}
                  size={20}
                  className={"text-primary"}
                />
                <TypingEffect
                  text={"Summary"}
                  onDoneAction={() => setCurrentRenderIndex(3)}
                />
              </h3>
            )}
            {currentRenderIndex >= 3 && (
              <p className={"tracking-wider text-sm font-light"}>
                <TypingEffect
                  text={state.AIResponse.summary}
                  onDoneAction={() => setCurrentRenderIndex(4)}
                />
              </p>
            )}
            {currentRenderIndex >= 4 && (
              <h3>
                <Lightbulb
                  strokeWidth={1}
                  size={20}
                  className={"text-primary"}
                />
                <TypingEffect
                  text={"Insight"}
                  onDoneAction={() => setCurrentRenderIndex(5)}
                />
              </h3>
            )}
            {currentRenderIndex >= 5 && (
              <p className={"tracking-wider text-sm font-light"}>
                <TypingEffect
                  text={state.AIResponse.insight}
                  onDoneAction={() => setCurrentRenderIndex(6)}
                />
              </p>
            )}
            {currentRenderIndex >= 6 && (
              <h3>
                <Target strokeWidth={1} size={20} className={"text-primary"} />
                <TypingEffect
                  text={"Suggested goal"}
                  onDoneAction={() => setCurrentRenderIndex(7)}
                />
              </h3>
            )}
            {currentRenderIndex >= 7 && (
              <p className={"tracking-wider text-sm font-light"}>
                <TypingEffect
                  text={state.AIResponse.suggestedGoal}
                  onDoneAction={() => setCurrentRenderIndex(8)}
                />
              </p>
            )}
            {currentRenderIndex >= 8 && (
              <h3>
                <Tags strokeWidth={1} size={20} className={"text-primary"} />
                <TypingEffect
                  text={"Themes"}
                  onDoneAction={() => setCurrentRenderIndex(9)}
                />
              </h3>
            )}
            {currentRenderIndex >= 9 && (
              <ul className={"flex flex-wrap gap-3"}>
                {state.AIResponse.themes.map((theme: string, index) => (
                  <Badge key={index}>
                    <TypingEffect
                      text={theme[0].toUpperCase() + theme.slice(1)}
                      onDoneAction={() => setCurrentRenderIndex(10)}
                    />
                  </Badge>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter
            className={
              "flex flex-col items-start space-y-4 font-light tracking-wide"
            }
          >
            {currentRenderIndex >= 10 && (
              <h3>
                <List strokeWidth={1} size={20} className={"text-primary"} />
                <TypingEffect
                  text={"Suggested Tasks"}
                  onDoneAction={() => setCurrentRenderIndex(11)}
                />
              </h3>
            )}
            {currentRenderIndex >= 11 && (
              <ul className={"w-full flex flex-col gap-3 justify-start"}>
                {state.tasks.map((task, index) => (
                  <li className={"flex justify-between"} key={index}>
                    <p className={"flex gap-2 items-center"}>
                      <Dot />
                      <TypingEffect
                        text={task.content}
                        onDoneAction={() => setCurrentRenderIndex(11)}
                      />
                    </p>
                    <SaveToKanbanButton taskId={task.id} />
                  </li>
                ))}
              </ul>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
