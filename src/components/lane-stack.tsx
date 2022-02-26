import { FC, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Status } from "../domain/status";
import LaneCard from "./lane-card";
import { Task } from "../domain/task";
import dayjs from "dayjs";
import TaskCard from "./task-card";
import { useTasks } from "../hooks/use-tasks";
import TaskSnackbarCreate from "./task-snackbar-create";
import TaskSnackbarUpdate from "./task-snackbar-update";
import TaskSnackbarDelete from "./task-snackbar-delete";

const LaneStack: FC = () => {
  const {
    tasks,
    isTasksLoading,
    isTasksError,
    isCreatingTask,
    updateTask,
    isUpdatingTask,
    deleteTask,
    isDeletingTask,
  } = useTasks();
  const [isSnackbarCreateOpen, setIsSnackbarCreateOpen] = useState(false);
  const [isSnackbarUpdateOpen, setIsSnackbarUpdateOpen] = useState(false);
  const [isSnackbarDeleteOpen, setIsSnackbarDeleteOpen] = useState(false);

  useEffect(() => {
    if (isCreatingTask) {
      setIsSnackbarCreateOpen(true);
    }
  }, [isCreatingTask]);

  useEffect(() => {
    if (isUpdatingTask) {
      setIsSnackbarUpdateOpen(true);
    }
  }, [isUpdatingTask]);

  useEffect(() => {
    if (isDeletingTask) {
      setIsSnackbarDeleteOpen(true);
    }
  }, [isDeletingTask]);

  if (isTasksLoading) {
    return <h1>loading...</h1>;
  }
  if (isTasksError) {
    return <h1>error</h1>;
  }
  return (
    <>
      <Stack direction="row" spacing={3}>
        {Status.values.map((status: Status) => (
          <LaneCard key={status.toString()} status={status}>
            <Stack spacing={3}>
              {tasks
                .filter((task: Task) => task.status.equals(status))
                .sort(
                  (a: Task, b: Task) =>
                    dayjs(a.due).unix() - dayjs(b.due).unix()
                )
                .map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    due={task.getDueString()}
                    status={task.status.toString()}
                    updateTask={updateTask}
                    isUpdatingTask={isUpdatingTask}
                    deleteTask={deleteTask}
                    isDeletingTask={isDeletingTask}
                  />
                ))}
            </Stack>
          </LaneCard>
        ))}
      </Stack>
      <TaskSnackbarCreate
        isOpen={isSnackbarCreateOpen}
        setIsOpen={setIsSnackbarCreateOpen}
      />
      <TaskSnackbarUpdate
        isOpen={isSnackbarUpdateOpen}
        setIsOpen={setIsSnackbarUpdateOpen}
      />
      <TaskSnackbarDelete
        isOpen={isSnackbarDeleteOpen}
        setIsOpen={setIsSnackbarDeleteOpen}
      />
    </>
  );
};

export default LaneStack;
