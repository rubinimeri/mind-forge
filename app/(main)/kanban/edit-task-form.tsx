import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Input
} from "@/components/ui/input"
import {
  TagsInput
} from "@/components/ui/tags-input"
import {Button} from "@/components/ui/button";
import { editTaskSchema } from "@/lib/schemas/auth.schema";
import {editTask} from "@/app/actions";

import {Edit, Loader} from "lucide-react";
import {useState} from "react";

type EditTaskFormProps = {
  taskId: string,
  taskTitle: string,
  onEdit: (taskId: string, taskTitle: string) => void
}

export default function EditTaskForm({ taskId, taskTitle, onEdit }: EditTaskFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm < z.infer < typeof editTaskSchema >> ({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      "title": taskTitle,
      "themes": ["test"]
    },
  })

  async function onSubmit(values: z.infer < typeof editTaskSchema > ) {
    setLoading(true)
    try {
      await editTask(taskId, values.title);
      onEdit(taskId, values.title);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen} >

          <DialogClose className={"absolute right-3 bottom-[12px]"} onClick={() => setOpen(true)}>
              <Button
              variant={"outline"}
              className={"border-none items-end p-0 size-4 hover:bg-card"}
              asChild
              >
                <Edit/>
              </Button>
          </DialogClose>

          <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle>
                  Edit Task
                </DialogTitle>
                <DialogDescription className={"text-gray-600"}>
                  Edit your task title & attach themes to your task here!
                </DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""

                        type=""
                        {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="themes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your themes</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value ?? [""]}
                        onValueChange={field.onChange}
                        placeholder="i.e: Productivity, Finance, Health etc."
                        className={"placeholder:text-gray-400"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                <Button type="submit" disabled={loading}>
                  {loading ?
                    <Loader className={"animate-spin"} /> :
                    "Save changes"
                  }
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
      </Dialog>
    </Form>
  )
}