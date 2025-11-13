"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Dot,
  FileText,
  Lightbulb,
  List,
  Tags,
  Target,
} from "lucide-react";

import SaveToKanbanButton from "@/components/save-to-kanban-button";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThoughtWithAIResponse } from "@/lib/defintions";

function ThoughtDetails({ thought }: { thought: ThoughtWithAIResponse }) {
  const [showMore, setShowMore] = useState(false);

  if (!thought || !thought.AIResponse) return null;

  if (!showMore)
    return (
      <CardContent>
        <Button
          variant={"outline"}
          className={"border-none p-0"}
          onClick={() => setShowMore(true)}
        >
          Show More <ChevronDown />
        </Button>
      </CardContent>
    );

  return (
    <CardContent className={"space-y-6"}>
      <Button
        variant={"outline"}
        className={"border-none p-0"}
        onClick={() => setShowMore(false)}
      >
        Show Less <ChevronUp />
      </Button>
      <div className={"space-y-2"}>
        <h3>
          <FileText strokeWidth={1} size={20} className={"text-primary"} />
          Summary
        </h3>
        <p className={"tracking-wider text-sm font-light"}>
          {thought.AIResponse.summary}
        </p>
      </div>

      <div className={"space-y-2"}>
        <h3>
          <Lightbulb strokeWidth={1} size={20} className={"text-primary"} />
          Insight
        </h3>
        <p className={"tracking-wider text-sm font-light"}>
          {thought.AIResponse.insight}
        </p>
      </div>

      <div className={"space-y-2"}>
        <h3>
          <Target strokeWidth={1} size={20} className={"text-primary"} />
          Suggested Goal
        </h3>
        <p
          className={
            "tracking-wider text-sm font-light flex gap-3 items-center"
          }
        >
          {thought.AIResponse.suggestedGoal}{" "}
          <span className={"bg-gray-50 rounded-full p-1"}>
            <Check size={20} className={"text-green-500"} />
          </span>
        </p>
      </div>

      <div className={"space-y-2"}>
        <h3>
          <Tags strokeWidth={1} size={20} className={"text-primary"} />
          Themes
        </h3>
        <ul className={"flex flex-wrap gap-3"}>
          {thought.AIResponse.themes.map((theme: string, index) => (
            <Badge key={index}>{theme[0].toUpperCase() + theme.slice(1)}</Badge>
          ))}
        </ul>
      </div>

      <div className={"space-y-2"}>
        <h3>
          <List strokeWidth={1} size={20} className={"text-primary"} />
          Suggested Tasks
        </h3>
        <ul className={"w-full flex flex-col gap-3 justify-start"}>
          {thought.AIResponse.tasks.map((task, index) => (
            <li className={"flex justify-between"} key={index}>
              <p className={"flex gap-2 items-center"}>
                <Dot />
                {task.content}
              </p>
              <SaveToKanbanButton taskId={task.id} />
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  );
}

export default ThoughtDetails;

