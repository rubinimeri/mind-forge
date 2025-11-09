import { Dispatch, SetStateAction, useState } from "react";
import { Check, Loader } from "lucide-react";
import { toast } from "sonner";

import TypingEffect from "@/components/typing-effect";
import { Button } from "@/components/ui/button";
import { saveThoughtToDashboard } from "@/app/actions";

type SaveToDashboardButtonProps = {
  onDoneAction: Dispatch<SetStateAction<number>>;
  thoughtId: string;
};

export default function SaveToDashboardButton({
  onDoneAction,
  thoughtId,
}: SaveToDashboardButtonProps) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const response = await saveThoughtToDashboard(thoughtId);
      if (response && "error" in response) {
        toast("Failed to save thought to dashboard! Please try again.");
      }
      setSuccess(true);
      toast("Thought sucessfully saved to dashboard!");
    } catch (error) {
      console.error(error);
      toast("Failed to save thought to dashboard! Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <Button
      type="submit"
      variant={"outline"}
      disabled={pending || success}
      onClick={handleClick}
    >
      {pending ? (
        <Loader className={"animate-spin"} />
      ) : success ? (
        <>
          <span>
            <TypingEffect text={"Saved to Dashboard"} />
          </span>
          <Check className={"text-green-600"} strokeWidth={3} />
        </>
      ) : (
        <TypingEffect
          text="Save to Dashboard"
          onDoneAction={() => onDoneAction((prev) => prev + 1)}
        />
      )}
    </Button>
  );
}
