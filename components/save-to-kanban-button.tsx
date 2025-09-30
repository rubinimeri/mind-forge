"use client"

import {
  useEffect,
  useState
} from "react";
import { Pin } from "lucide-react";

import { saveTaskToKanban } from "@/app/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Task } from "@/prisma/app/generated/prisma";

function SaveToKanbanButton({ taskId, task }: { taskId: string, task?: Task }) {
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    if (task?.columnId)
      setPinned(true)
  }, [])

  const handleClick = async () => {
    try {
      await saveTaskToKanban(taskId);
      setPinned(true);
    } catch (error) {
      console.error(error);
      setPinned(false)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="submit"
          variant={"outline"}
          size={"sm"}
          disabled={pinned}
          className={""}
          onClick={async () => await handleClick()}>
          {!pinned ?
            <Pin/> :
            <Pin fill={"#8942F3"} className={"text-primary"} />
          }
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Save to Kanban
      </TooltipContent>
    </Tooltip>
  );
}

export default SaveToKanbanButton;