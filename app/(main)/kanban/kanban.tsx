'use client';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import {useEffect, useState} from 'react';
import { columns } from "@/lib/placeholder-data";
import {dateFormatter} from "@/lib/utils";
import {getSavedTasks} from "@/app/actions";
import {KanbanTask} from "@/lib/defintions";

const Kanban = ({ userId }: { userId: string }) => {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getSavedTasks(userId);
        console.log(response);
        setTasks(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTasks();
  }, []);


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