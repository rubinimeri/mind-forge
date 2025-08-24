import { create } from 'zustand';
import {KanbanTask} from "@/lib/defintions";

type TasksStore = {
  tasks: KanbanTask[];
  setTasks: (updater: KanbanTask[] | ((prev: KanbanTask[]) => KanbanTask[])) => void
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  setTasks: (updater) =>
    set((state) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: KanbanTask[]) => KanbanTask[])(state.tasks)
          : updater
      return { tasks: next }
  }),
}));