import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import {AIResponseFromAPI} from "@/lib/defintions";
import {saveAIResponseToDashboard} from "@/app/actions";
import {Check, Loader} from "lucide-react";
import TypingEffect from "@/components/typing-effect";

type SaveToDashboardButtonProps = {
  onDoneAction: Dispatch<SetStateAction<number>>,
  AIResponseState: AIResponseFromAPI
}

export default function SaveToDashboardButton({onDoneAction, AIResponseState } : SaveToDashboardButtonProps) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleClick() {
    setPending(true)
    try {
      await saveAIResponseToDashboard(AIResponseState)
      setSuccess(true)
    } catch (error) {
      console.error(error)
    } finally {
      setPending(false)
    }
  }
  return (
    <form action={async () => await saveAIResponseToDashboard(AIResponseState)}>
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
    </form>
  )
}