"use client";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { useEffect, useState } from "react";
import { dateFormatter } from "@/lib/utils";
import { deleteTask, getColumns, getSavedTasks } from "@/app/actions";
import { KanbanColumn } from "@/lib/defintions";
import EditTaskForm from "@/app/(main)/kanban/edit-task-form";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { useTasksStore } from "@/lib/store";

const Kanban = ({ userId }: { userId: string }) => {
  const { tasks, setTasks } = useTasksStore();
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const columns = await getColumns(userId);
        setColumns(columns);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await getSavedTasks(userId);
        setTasks(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchColumns();
    fetchTasks();
  }, [setTasks, userId]);

  const onEdit = (taskId: string, taskTitle: string) => {
    // Find task
    const task = tasks.find((task) => task.id === taskId);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (!task) return console.log("Error: failed to edit task");

    task.name = taskTitle;
    const newTasks = [...tasks];
    newTasks[taskIndex] = task;
    setTasks(newTasks);
  };

  const handleDelete = async (taskId: string) => {
    setLoading(true);
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KanbanProvider columns={columns} data={tasks} onDataChange={setTasks}>
      {(column) => (
        <KanbanBoard id={column.id} key={column.id} className={"bg-card"}>
          <KanbanHeader>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span>{column.name}</span>
            </div>
          </KanbanHeader>
          <KanbanCards id={column.id}>
            {(task: (typeof tasks)[number]) => (
              <KanbanCard
                column={column.id}
                id={task.id}
                key={task.id}
                name={task.name}
                editButton={
                  <EditTaskForm
                    taskId={task.id}
                    taskTitle={task.name}
                    onEdit={onEdit}
                  />
                }
                deleteButton={
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    disabled={loading}
                    onClick={() => handleDelete(task.id)}
                    className={
                      "absolute bottom-[5px] right-9 !p-0 border-none hover:bg-card"
                    }
                  >
                    {loading ? (
                      <Loader className={"animate-spin"} />
                    ) : (
                      <Trash />
                    )}
                  </Button>
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="m-0 flex-1 font-medium text-sm">
                      {task.name}
                    </p>
                  </div>
                </div>
                <div className={"flex justify-between items-end"}>
                  <p className="m-0 text-muted-foreground text-xs">
                    {dateFormatter.format(task.createdAt)}
                  </p>
                </div>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
export default Kanban;
