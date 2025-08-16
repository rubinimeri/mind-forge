import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import { saveThoughtToDashboard} from "@/app/actions";
import {Check, Loader} from "lucide-react";
import TypingEffect from "@/components/typing-effect";

type SaveToDashboardButtonProps = {
  onDoneAction: Dispatch<SetStateAction<number>>,
  thoughtId: string
}

export default function SaveToDashboardButton({onDoneAction, thoughtId } : SaveToDashboardButtonProps) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleClick() {
    setPending(true)
    try {
      await saveThoughtToDashboard(thoughtId)
      setSuccess(true)
    } catch (error) {
      console.error(error)
    } finally {
      setPending(false)
    }
  }
  return (
    <Button
      type="submit"
      variant={"outline"}
      disabled={pending || success}
      onClick={handleClick}
    >
      {pending ?
        <Loader className={"animate-spin"} /> :
        success ?
        <>
          <span >
            <TypingEffect text={"Saved to Dashboard"} />
          </span>
          <Check className={"text-green-600"} strokeWidth={3} />
        </> :
        <TypingEffect
        text="Save to Dashboard"
        onDoneAction={() => onDoneAction(prev => prev + 1)}
      />}
    </Button>
  )
}