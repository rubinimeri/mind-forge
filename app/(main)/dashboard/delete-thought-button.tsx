"use server"

import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import { deleteThought } from "@/app/actions";

function DeleteThoughtButton({ thoughtId }: { thoughtId: string }) {
  const deleteAction = deleteThought.bind(null, thoughtId);

  return (
    <form action={deleteAction}>
      <Button
        type="submit"
        size={"sm"}
        variant="outline"
        className={"hover:bg-primary dark:hover:bg-primary hover:text-white rounded-full"}>
        <Trash />
      </Button>
    </form>
  );
}

export default DeleteThoughtButton;