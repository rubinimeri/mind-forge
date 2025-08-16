import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Pin} from "lucide-react";
import {saveTaskToKanban} from "@/app/actions";
import {useState} from "react";

function SaveToKanbanButton({ taskId }: { taskId: string }) {
  const [pinned, setPinned] = useState(false)

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