"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader, Plus} from "lucide-react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {TagsInput} from "@/components/ui/tags-input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {editTaskSchema} from "@/lib/schemas/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTasksStore} from "@/lib/store";
import {createTask} from "@/app/actions";

function NewTaskForm({ userId }: { userId: string }) {
  const setTasks = useTasksStore(state => state.setTasks)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm < z.infer < typeof editTaskSchema >> ({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      "themes": []
    },
  })

  async function onSubmit(values: z.infer < typeof editTaskSchema >) {
    setLoading(true);
    try {
      const newTask = await createTask(userId, values.title)
      if (!newTask) return;
      setTasks(prevTasks => [...prevTasks, newTask])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant={"secondary"}
        size={"sm"}
        className={"flex gap-1 cursor-pointer text-[12px]"}
        onClick={() => setOpen(true)}
      >
        <Plus /> New Task
      </Button>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                Create New Task
              </DialogTitle>
              <DialogDescription>
                Create a new task here, input task title and optionally add
                a theme/s!
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""

                      type=""
                      {...field} />
                  </FormControl>

                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="themes"
              render={({field}) => (
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

                  <FormMessage/>
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
                  <Loader className={"animate-spin"}/> :
                  "Save changes"
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}

export default NewTaskForm;