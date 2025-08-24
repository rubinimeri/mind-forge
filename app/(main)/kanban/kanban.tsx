'use client';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import {useEffect, useState} from 'react';
import {dateFormatter} from "@/lib/utils";
import {getColumns, getSavedTasks} from "@/app/actions";
import {KanbanColumn, KanbanTask} from "@/lib/defintions";
import EditTaskForm from "@/app/(main)/kanban/edit-task-form";

const Kanban = ({ userId }: { userId: string }) => {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [columns, setColumns] = useState<KanbanColumn[]>([])

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const columns = await getColumns(userId)
        console.log(columns)
        setColumns(columns);
      } catch (err) {
        console.error(err);
      }
    }

    const fetchTasks = async () => {
      try {
        const response = await getSavedTasks(userId);
        console.log(response);
        setTasks(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchColumns();
    fetchTasks();
  }, []);

  const onEdit = (taskId: string, taskTitle: string) => {
    // Find task
    const task = tasks.find((task) => task.id === taskId);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    console.log(task, taskIndex);
    if (!task)
      return console.log("Error: failed to edit task");

    task.name = taskTitle;
    const newTasks = [...tasks];
    newTasks[taskIndex] = task;
    console.log(newTasks[taskIndex])
    setTasks(newTasks);
  }

  return (
    <KanbanProvider
      columns={columns}
      data={tasks}
      onDataChange={setTasks}
    >
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



