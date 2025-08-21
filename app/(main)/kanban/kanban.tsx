'use client';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { useState } from 'react';
import { columns, exampleTasks } from "@/lib/placeholder-data";
import {dateFormatter, shortDateFormatter} from "@/lib/utils";

const Kanban = () => {
  const [tasks, setTasks] = useState(exampleTasks);
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
                <p className="m-0 text-muted-foreground text-xs">
                  {shortDateFormatter.format(task.startAt)} -{' '}
                  {dateFormatter.format(task.endAt)}
                </p>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
export default Kanban;